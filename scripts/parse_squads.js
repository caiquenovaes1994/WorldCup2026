import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../convocados.txt');
const outputPath = path.join(__dirname, '../src/data/squads.json');
const missingPath = path.join(__dirname, '../missing_clubs.json');

const text = fs.readFileSync(inputPath, 'utf8');
const lines = text.split('\n').map(l => l.trim());

let knownClubs = {};
try {
  knownClubs = JSON.parse(fs.readFileSync(path.join(__dirname, 'known_clubs.json'), 'utf8'));
} catch (e) {
  console.log('No known_clubs.json found, skipping.');
}

const squads = {};
let currentTeam = null;
let currentPosition = null;

const missingClubs = [];

async function fetchClubFromWikidata(playerName) {
  try {
    const searchRes = await fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(playerName)}&language=en&format=json`, {
      headers: { 'User-Agent': 'WorldCup2026Bot/1.0 (test@example.com)' }
    });
    const searchData = await searchRes.json();
    if (!searchData.search || searchData.search.length === 0) return null;
    
    const entityId = searchData.search[0].id;

    const claimsRes = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${entityId}&property=P54&format=json`, {
      headers: { 'User-Agent': 'WorldCup2026Bot/1.0 (test@example.com)' }
    });
    const claimsData = await claimsRes.json();
    const p54 = claimsData.claims?.P54;
    
    if (p54 && p54.length > 0) {
      for (let i = p54.length - 1; i >= 0; i--) {
        const claim = p54[i];
        if (!claim.mainsnak || !claim.mainsnak.datavalue) continue;
        const teamId = claim.mainsnak.datavalue.value.id;
        
        const teamRes = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${teamId}&props=labels&languages=en&format=json`);
        const teamData = await teamRes.json();
        const clubName = teamData.entities[teamId].labels.en?.value;
        
        if (!clubName || clubName.toLowerCase().includes('national')) {
          continue; 
        }
        return clubName;
      }
    }
  } catch (e) {
    console.error(`Error fetching Wikidata for ${playerName}: ${e.message}`);
  }
  return null;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function parse() {
  let isTeamNameNext = true;
  let parsedPlayers = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    if (line.startsWith('---')) {
      isTeamNameNext = true;
      continue;
    }

    const positions = ['Goleiros', 'Guarda-redes', 'Defensores', 'Meio-campistas', 'Atacantes'];
    if (positions.includes(line)) {
      currentPosition = line === 'Guarda-redes' ? 'Goleiros' : line;
      continue;
    }

    if (isTeamNameNext) {
      currentTeam = line;
      if (!squads[currentTeam]) squads[currentTeam] = [];
      isTeamNameNext = false;
      continue;
    }

    let playerName = line;
    let club = "";

    const match = line.match(/(.+?)\s*\((.+?)\)/);
    if (match) {
      playerName = match[1].trim();
      let clubInfo = match[2].trim();
      let parts = clubInfo.split(/[-–]/);
      if (parts.length > 1) {
        club = `${parts[0].trim()} - ${parts[1].trim()}`;
      } else {
        club = clubInfo;
      }
    }

    parsedPlayers.push({ team: currentTeam, position: currentPosition, name: playerName, club });
  }

  console.log(`Parsed ${parsedPlayers.length} players. Looking up missing clubs via Wikidata...`);

  const batchSize = 10;
  for (let i = 0; i < parsedPlayers.length; i += batchSize) {
    const batch = parsedPlayers.slice(i, i + batchSize);
    await Promise.all(batch.map(async (p) => {
      if (!p.club) {
        if (knownClubs[p.name]) {
          p.club = knownClubs[p.name];
        } else {
          const fetchedClub = await fetchClubFromWikidata(p.name);
          if (fetchedClub) {
            p.club = fetchedClub;
          } else {
            p.club = "Desconhecido";
            missingClubs.push({ name: p.name, team: p.team });
          }
        }
      }
      
      const encodedName = encodeURIComponent(p.name);
      p.transfermarktUrl = `https://www.transfermarkt.com.br/schnellsuche/ergebnis/schnellsuche?query=${encodedName}`;
      
      squads[p.team].push({
        name: p.name,
        position: p.position,
        club: p.club,
        transfermarktUrl: p.transfermarktUrl
      });
    }));
    await sleep(200); 
  }

  fs.writeFileSync(outputPath, JSON.stringify(squads, null, 2));
  fs.writeFileSync(missingPath, JSON.stringify(missingClubs, null, 2));
  console.log('Done! JSON generated. Missing clubs written to missing_clubs.json.');
}

parse();
