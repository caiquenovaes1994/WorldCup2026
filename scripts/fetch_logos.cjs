const https = require('https');
const fs = require('fs');
const path = require('path');

function getWiki(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'WorldCup2026/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'WorldCup2026/1.0' } }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

function normalizeClubName(name) {
  return name.replace(/[<>:"/\\|?*]/g, '_');
}

async function fetchAndSaveLogo(clubName) {
  const safeName = normalizeClubName(clubName);
  const destPath = path.join(__dirname, '..', 'src', 'assets', 'clubs', `${safeName}.svg`);
  
  if (fs.existsSync(destPath)) {
    return true; // Already exists
  }

  try {
    // 1. Search for Wikipedia article
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(clubName + ' football club')}&utf8=&format=json`;
    const searchResult = await getWiki(searchUrl);
    
    if (!searchResult.query || !searchResult.query.search || searchResult.query.search.length === 0) {
      console.log(`[Logo] No Wikipedia article found for ${clubName}`);
      return false;
    }
    
    const title = searchResult.query.search[0].title;
    
    // 2. Fetch wikitext to find infobox image
    const wikitextUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=${encodeURIComponent(title)}&format=json`;
    const wikitextResult = await getWiki(wikitextUrl);
    
    const pages = wikitextResult.query.pages;
    const page = pages[Object.keys(pages)[0]];
    if (!page.revisions) {
       console.log(`[Logo] No wikitext found for ${title}`);
       return false;
    }
    const wikitext = page.revisions[0].slots.main['*'];
    
    // Regex to match "image = Something.svg" or "logo = Something.svg"
    const match = wikitext.match(/(?:image|logo)\s*=\s*(.+?\.svg)/i);
    if (!match) {
      console.log(`[Logo] No SVG image found in infobox for ${title} (${clubName})`);
      return false;
    }
    
    let imageName = match[1].trim();
    if (!imageName.toLowerCase().startsWith('file:')) {
      imageName = 'File:' + imageName;
    }
    
    // 3. Get imageinfo URL
    const imageInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(imageName)}&prop=imageinfo&iiprop=url&format=json`;
    const imageInfoResult = await getWiki(imageInfoUrl);
    
    const imgPages = imageInfoResult.query.pages;
    const imgPage = imgPages[Object.keys(imgPages)[0]];
    
    if (!imgPage.imageinfo || imgPage.imageinfo.length === 0) {
      console.log(`[Logo] Could not resolve URL for ${imageName}`);
      return false;
    }
    
    const imageUrl = imgPage.imageinfo[0].url;
    
    // 4. Download and save
    await downloadFile(imageUrl, destPath);
    console.log(`[Logo] Successfully downloaded ${clubName}.svg`);
    return true;
    
  } catch (error) {
    console.error(`[Logo] Error fetching logo for ${clubName}:`, error.message);
    return false;
  }
}

module.exports = {
  fetchAndSaveLogo,
  normalizeClubName
};
