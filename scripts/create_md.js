import fs from 'fs';

const missing = JSON.parse(fs.readFileSync('missing_clubs.json'));
let md = '# Jogadores com Clubes Desconhecidos\n\nEstes jogadores não tiveram seus clubes identificados durante o processamento automático:\n\n| Seleção | Jogador |\n| --- | --- |\n';

missing.forEach(p => {
  md += `| ${p.team} | ${p.name} |\n`;
});

md += `\n**Total de jogadores listados:** ${missing.length}\n`;

fs.writeFileSync('C:\\Users\\caiqu\\.gemini\\antigravity-ide\\brain\\f2736bf9-715a-4b45-ace6-58d43671222f\\missing_clubs.md', md);
fs.writeFileSync('missing_clubs.md', md);
