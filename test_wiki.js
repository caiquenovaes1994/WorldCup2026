async function getClub(playerName) {
  try {
    const searchRes = await fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(playerName)}&language=en&format=json`, {
      headers: { 'User-Agent': 'WorldCup2026Bot/1.0 (test@example.com)' }
    });
    const searchData = await searchRes.json();
    if (!searchData.search || searchData.search.length === 0) {
      console.log(playerName, 'Not found on Wikidata');
      return null;
    }
    const entityId = searchData.search[0].id;

    const claimsRes = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${entityId}&property=P54&format=json`, {
      headers: { 'User-Agent': 'WorldCup2026Bot/1.0 (test@example.com)' }
    });
    const claimsData = await claimsRes.json();
    const p54 = claimsData.claims.P54;
    
    if (p54 && p54.length > 0) {
      // Get the last one, usually the most recent team (Wikidata orders claims, or we look at the last rank/qualifier)
      // Actually Wikidata P54 (member of sports team) can have many. Let's just pick the last one or one without an end date.
      let currentTeamId = null;
      for (const claim of p54) {
        // If it has 'end time' qualifier (P582), it's not current
        if (!claim.qualifiers || !claim.qualifiers.P582) {
          currentTeamId = claim.mainsnak.datavalue.value.id;
        }
      }
      if (!currentTeamId) {
        currentTeamId = p54[p54.length - 1].mainsnak.datavalue.value.id;
      }
      
      const teamRes = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${currentTeamId}&props=labels&languages=en&format=json`);
      const teamData = await teamRes.json();
      const clubName = teamData.entities[currentTeamId].labels.en.value;
      console.log(playerName, '->', clubName);
      return clubName;
    }
  } catch(e) {
    console.error(e);
  }
}

getClub('Manuel Neuer');
getClub('Emiliano Martínez');
