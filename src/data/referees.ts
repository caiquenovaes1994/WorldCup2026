import type { Referee } from '../types'

export const referees: Referee[] = [
  // AFC
  { name: 'Abdulrahman Al Jassim', country: 'Catar', confederation: 'AFC' },
  { name: 'Khalid Al Turais', country: 'Arábia Saudita', confederation: 'AFC' },
  { name: 'Yusuke Araki', country: 'Japão', confederation: 'AFC' },
  { name: 'Alireza Faghani', country: 'Irã', confederation: 'AFC' },
  { name: 'Ma Ning', country: 'China', confederation: 'AFC' },
  { name: 'Adham Makhadmeh', country: 'Jordânia', confederation: 'AFC' },
  { name: 'Ilgiz Tantashev', country: 'Uzbequistão', confederation: 'AFC' },
  { name: 'Omar Al Ali', country: 'Emirados Árabes', confederation: 'AFC' },

  // CAF
  { name: 'Omar Abdulkadir Artan', country: 'Somália', confederation: 'CAF' },
  { name: 'Pierre Atcho', country: 'Camarões', confederation: 'CAF' },
  { name: 'Dahane Beida', country: 'Mauritânia', confederation: 'CAF' },
  { name: 'Mustapha Ghorbal', country: 'Argélia', confederation: 'CAF' },
  { name: 'Jalal Jayed', country: 'Marrocos', confederation: 'CAF' },
  { name: 'Amin Mohamed Omar', country: 'Quênia', confederation: 'CAF' },
  { name: 'Abongile Tom', country: 'África do Sul', confederation: 'CAF' },

  // CONCACAF
  { name: 'Ivan Barton', country: 'El Salvador', confederation: 'CONCACAF' },
  { name: 'Juan Calderon', country: 'Costa Rica', confederation: 'CONCACAF' },
  { name: 'Ismail Elfath', country: 'Estados Unidos', confederation: 'CONCACAF' },
  { name: 'Drew Fischer', country: 'Canadá', confederation: 'CONCACAF' },
  { name: 'Katia Garcia', country: 'México', confederation: 'CONCACAF' },
  { name: 'Hector Said Martinez', country: 'Honduras', confederation: 'CONCACAF' },
  { name: 'Oshane Nation', country: 'Jamaica', confederation: 'CONCACAF' },
  { name: 'Tori Penso', country: 'Estados Unidos', confederation: 'CONCACAF' },
  { name: 'Cesar Ramos', country: 'México', confederation: 'CONCACAF' },

  // CONMEBOL
  { name: 'Ramon Abatti', country: 'Brasil', confederation: 'CONMEBOL' },
  { name: 'Juan Gabriel Benitez', country: 'Paraguai', confederation: 'CONMEBOL' },
  { name: 'Raphael Claus', country: 'Brasil', confederation: 'CONMEBOL' },
  { name: 'Yael Falcon Perez', country: 'Uruguai', confederation: 'CONMEBOL' },
  { name: 'Cristian Garay', country: 'Chile', confederation: 'CONMEBOL' },
  { name: 'Dario Herrera', country: 'Argentina', confederation: 'CONMEBOL' },
  { name: 'Kevin Ortega', country: 'Peru', confederation: 'CONMEBOL' },
  { name: 'Andres Rojas', country: 'Colômbia', confederation: 'CONMEBOL' },
  { name: 'Wilton Sampaio', country: 'Brasil', confederation: 'CONMEBOL' },
  { name: 'Gustavo Tejera', country: 'Uruguai', confederation: 'CONMEBOL' },
  { name: 'Facundo Tello', country: 'Argentina', confederation: 'CONMEBOL' },
  { name: 'Jesus Valenzuela', country: 'Venezuela', confederation: 'CONMEBOL' },

  // OFC
  { name: 'Campbell-Kirk Kawana-Waugh', country: 'Austrália', confederation: 'OFC' },

  // UEFA
  { name: 'Espen Eskas', country: 'Noruega', confederation: 'UEFA' },
  { name: 'Alejandro Hernandez', country: 'Espanha', confederation: 'UEFA' },
  { name: 'Istvan Kovacs', country: 'Romênia', confederation: 'UEFA' },
  { name: 'Francois Letexier', country: 'França', confederation: 'UEFA' },
  { name: 'Danny Makkelie', country: 'Holanda', confederation: 'UEFA' },
  { name: 'Szymon Marciniak', country: 'Polônia', confederation: 'UEFA' },
  { name: 'Maurizio Mariani', country: 'Itália', confederation: 'UEFA' },
  { name: 'Glenn Nyberg', country: 'Suécia', confederation: 'UEFA' },
  { name: 'Michael Oliver', country: 'Inglaterra', confederation: 'UEFA' },
  { name: 'Joao Pinheiro', country: 'Portugal', confederation: 'UEFA' },
  { name: 'Sandro Schaerer', country: 'Suíça', confederation: 'UEFA' },
  { name: 'Anthony Taylor', country: 'Inglaterra', confederation: 'UEFA' },
  { name: 'Clement Turpin', country: 'França', confederation: 'UEFA' },
  { name: 'Slavko Vincic', country: 'Eslovênia', confederation: 'UEFA' },
  { name: 'Felix Zwayer', country: 'Alemanha', confederation: 'UEFA' },
]

export const countryToCode: Record<string, string> = {
  'Catar': 'qa', 'Arábia Saudita': 'sa', 'Japão': 'jp', 'Irã': 'ir', 'China': 'cn', 'Jordânia': 'jo', 'Uzbequistão': 'uz', 'Emirados Árabes': 'ae',
  'Somália': 'so', 'Camarões': 'cm', 'Mauritânia': 'mr', 'Argélia': 'dz', 'Marrocos': 'ma', 'Quênia': 'ke', 'África do Sul': 'za',
  'El Salvador': 'sv', 'Costa Rica': 'cr', 'Estados Unidos': 'us', 'Canadá': 'ca', 'México': 'mx', 'Honduras': 'hn', 'Jamaica': 'jm',
  'Brasil': 'br', 'Paraguai': 'py', 'Uruguai': 'uy', 'Chile': 'cl', 'Argentina': 'ar', 'Peru': 'pe', 'Colômbia': 'co', 'Venezuela': 've',
  'Austrália': 'au',
  'Noruega': 'no', 'Espanha': 'es', 'Romênia': 'ro', 'França': 'fr', 'Holanda': 'nl', 'Polônia': 'pl', 'Itália': 'it', 'Suécia': 'se', 'Inglaterra': 'gb-eng', 'Portugal': 'pt', 'Suíça': 'ch', 'Alemanha': 'de', 'Eslovênia': 'si'
}
