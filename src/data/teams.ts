import type { Team } from '../types'

export const teams: Team[] = [
  // Group A
  { code: 'MEX', name: 'México', nameEn: 'Mexico', group: 'A', flagCode: 'mx', fifaRanking: 15 },
  { code: 'RSA', name: 'África do Sul', nameEn: 'South Africa', group: 'A', flagCode: 'za', fifaRanking: 57 },
  { code: 'KOR', name: 'Coreia do Sul', nameEn: 'South Korea', group: 'A', flagCode: 'kr', fifaRanking: 22 },
  { code: 'CZE', name: 'Tchéquia', nameEn: 'Czechia', group: 'A', flagCode: 'cz', fifaRanking: 36 },

  // Group B
  { code: 'CAN', name: 'Canadá', nameEn: 'Canada', group: 'B', flagCode: 'ca', fifaRanking: 41 },
  { code: 'BIH', name: 'Bósnia e Herz.', nameEn: 'Bosnia & Herzegovina', group: 'B', flagCode: 'ba', fifaRanking: 56 },
  { code: 'QAT', name: 'Catar', nameEn: 'Qatar', group: 'B', flagCode: 'qa', fifaRanking: 45 },
  { code: 'SUI', name: 'Suíça', nameEn: 'Switzerland', group: 'B', flagCode: 'ch', fifaRanking: 18 },

  // Group C
  { code: 'BRA', name: 'Brasil', nameEn: 'Brazil', group: 'C', flagCode: 'br', fifaRanking: 5 },
  { code: 'MAR', name: 'Marrocos', nameEn: 'Morocco', group: 'C', flagCode: 'ma', fifaRanking: 13 },
  { code: 'HAI', name: 'Haiti', nameEn: 'Haiti', group: 'C', flagCode: 'ht', fifaRanking: 87 },
  { code: 'SCO', name: 'Escócia', nameEn: 'Scotland', group: 'C', flagCode: 'gb-sct', fifaRanking: 42 },

  // Group D
  { code: 'USA', name: 'Estados Unidos', nameEn: 'United States', group: 'D', flagCode: 'us', fifaRanking: 14 },
  { code: 'PAR', name: 'Paraguai', nameEn: 'Paraguay', group: 'D', flagCode: 'py', fifaRanking: 52 },
  { code: 'AUS', name: 'Austrália', nameEn: 'Australia', group: 'D', flagCode: 'au', fifaRanking: 24 },
  { code: 'TUR', name: 'Turquia', nameEn: 'Türkiye', group: 'D', flagCode: 'tr', fifaRanking: 26 },

  // Group E
  { code: 'GER', name: 'Alemanha', nameEn: 'Germany', group: 'E', flagCode: 'de', fifaRanking: 11 },
  { code: 'CUW', name: 'Curaçau', nameEn: 'Curaçao', group: 'E', flagCode: 'cw', fifaRanking: 123 },
  { code: 'CIV', name: 'Costa do Marfim', nameEn: 'Ivory Coast', group: 'E', flagCode: 'ci', fifaRanking: 38 },
  { code: 'ECU', name: 'Equador', nameEn: 'Ecuador', group: 'E', flagCode: 'ec', fifaRanking: 32 },

  // Group F
  { code: 'NED', name: 'Holanda', nameEn: 'Netherlands', group: 'F', flagCode: 'nl', fifaRanking: 6 },
  { code: 'JPN', name: 'Japão', nameEn: 'Japan', group: 'F', flagCode: 'jp', fifaRanking: 17 },
  { code: 'SWE', name: 'Suécia', nameEn: 'Sweden', group: 'F', flagCode: 'se', fifaRanking: 47 },
  { code: 'TUN', name: 'Tunísia', nameEn: 'Tunisia', group: 'F', flagCode: 'tn', fifaRanking: 40 },

  // Group G
  { code: 'BEL', name: 'Bélgica', nameEn: 'Belgium', group: 'G', flagCode: 'be', fifaRanking: 7 },
  { code: 'EGY', name: 'Egito', nameEn: 'Egypt', group: 'G', flagCode: 'eg', fifaRanking: 33 },
  { code: 'IRN', name: 'Irã', nameEn: 'Iran', group: 'G', flagCode: 'ir', fifaRanking: 20 },
  { code: 'NZL', name: 'Nova Zelândia', nameEn: 'New Zealand', group: 'G', flagCode: 'nz', fifaRanking: 95 },

  // Group H
  { code: 'ESP', name: 'Espanha', nameEn: 'Spain', group: 'H', flagCode: 'es', fifaRanking: 3 },
  { code: 'CPV', name: 'Cabo Verde', nameEn: 'Cape Verde', group: 'H', flagCode: 'cv', fifaRanking: 68 },
  { code: 'KSA', name: 'Arábia Saudita', nameEn: 'Saudi Arabia', group: 'H', flagCode: 'sa', fifaRanking: 55 },
  { code: 'URU', name: 'Uruguai', nameEn: 'Uruguay', group: 'H', flagCode: 'uy', fifaRanking: 10 },

  // Group I
  { code: 'FRA', name: 'França', nameEn: 'France', group: 'I', flagCode: 'fr', fifaRanking: 2 },
  { code: 'SEN', name: 'Senegal', nameEn: 'Senegal', group: 'I', flagCode: 'sn', fifaRanking: 21 },
  { code: 'IRQ', name: 'Iraque', nameEn: 'Iraq', group: 'I', flagCode: 'iq', fifaRanking: 62 },
  { code: 'NOR', name: 'Noruega', nameEn: 'Norway', group: 'I', flagCode: 'no', fifaRanking: 44 },

  // Group J
  { code: 'ARG', name: 'Argentina', nameEn: 'Argentina', group: 'J', flagCode: 'ar', fifaRanking: 1 },
  { code: 'ALG', name: 'Argélia', nameEn: 'Algeria', group: 'J', flagCode: 'dz', fifaRanking: 34 },
  { code: 'AUT', name: 'Áustria', nameEn: 'Austria', group: 'J', flagCode: 'at', fifaRanking: 27 },
  { code: 'JOR', name: 'Jordânia', nameEn: 'Jordan', group: 'J', flagCode: 'jo', fifaRanking: 70 },

  // Group K
  { code: 'POR', name: 'Portugal', nameEn: 'Portugal', group: 'K', flagCode: 'pt', fifaRanking: 4 },
  { code: 'COD', name: 'RD Congo', nameEn: 'DR Congo', group: 'K', flagCode: 'cd', fifaRanking: 58 },
  { code: 'UZB', name: 'Uzbequistão', nameEn: 'Uzbekistan', group: 'K', flagCode: 'uz', fifaRanking: 63 },
  { code: 'COL', name: 'Colômbia', nameEn: 'Colombia', group: 'K', flagCode: 'co', fifaRanking: 12 },

  // Group L
  { code: 'ENG', name: 'Inglaterra', nameEn: 'England', group: 'L', flagCode: 'gb-eng', fifaRanking: 8 },
  { code: 'CRO', name: 'Croácia', nameEn: 'Croatia', group: 'L', flagCode: 'hr', fifaRanking: 9 },
  { code: 'GHA', name: 'Gana', nameEn: 'Ghana', group: 'L', flagCode: 'gh', fifaRanking: 61 },
  { code: 'PAN', name: 'Panamá', nameEn: 'Panama', group: 'L', flagCode: 'pa', fifaRanking: 50 },
]

export const historicalTeams: Team[] = [
  { code: 'ANG', name: 'Angola', nameEn: 'Angola', group: '', flagCode: 'ao', fifaRanking: 0 },
  { code: 'BOL', name: 'Bolívia', nameEn: 'Bolivia', group: '', flagCode: 'bo', fifaRanking: 0 },
  { code: 'BUL', name: 'Bulgária', nameEn: 'Bulgaria', group: '', flagCode: 'bg', fifaRanking: 0 },
  { code: 'CHI', name: 'Chile', nameEn: 'Chile', group: '', flagCode: 'cl', fifaRanking: 0 },
  { code: 'CHN', name: 'China', nameEn: 'China', group: '', flagCode: 'cn', fifaRanking: 0 },
  { code: 'CMR', name: 'Camarões', nameEn: 'Cameroon', group: '', flagCode: 'cm', fifaRanking: 0 },
  { code: 'CRC', name: 'Costa Rica', nameEn: 'Costa Rica', group: '', flagCode: 'cr', fifaRanking: 0 },
  { code: 'CUB', name: 'Cuba', nameEn: 'Cuba', group: '', flagCode: 'cu', fifaRanking: 0 },
  { code: 'DEN', name: 'Dinamarca', nameEn: 'Denmark', group: '', flagCode: 'dk', fifaRanking: 0 },
  { code: 'GRE', name: 'Grécia', nameEn: 'Greece', group: '', flagCode: 'gr', fifaRanking: 0 },
  { code: 'HON', name: 'Honduras', nameEn: 'Honduras', group: '', flagCode: 'hn', fifaRanking: 0 },
  { code: 'HUN', name: 'Hungria', nameEn: 'Hungary', group: '', flagCode: 'hu', fifaRanking: 0 },
  { code: 'IDN', name: 'Indonésia', nameEn: 'Indonesia', group: '', flagCode: 'id', fifaRanking: 0 },
  { code: 'IRL', name: 'Irlanda', nameEn: 'Republic of Ireland', group: '', flagCode: 'ie', fifaRanking: 0 },
  { code: 'ISL', name: 'Islândia', nameEn: 'Iceland', group: '', flagCode: 'is', fifaRanking: 0 },
  { code: 'ISR', name: 'Israel', nameEn: 'Israel', group: '', flagCode: 'il', fifaRanking: 0 },
  { code: 'ITA', name: 'Itália', nameEn: 'Italy', group: '', flagCode: 'it', fifaRanking: 0 },
  { code: 'JAM', name: 'Jamaica', nameEn: 'Jamaica', group: '', flagCode: 'jm', fifaRanking: 0 },
  { code: 'KUW', name: 'Kuwait', nameEn: 'Kuwait', group: '', flagCode: 'kw', fifaRanking: 0 },
  { code: 'NGA', name: 'Nigéria', nameEn: 'Nigeria', group: '', flagCode: 'ng', fifaRanking: 0 },
  { code: 'NIR', name: 'Irlanda do Norte', nameEn: 'Northern Ireland', group: '', flagCode: 'gb-nir', fifaRanking: 0 },
  { code: 'PER', name: 'Peru', nameEn: 'Peru', group: '', flagCode: 'pe', fifaRanking: 0 },
  { code: 'POL', name: 'Polônia', nameEn: 'Poland', group: '', flagCode: 'pl', fifaRanking: 0 },
  { code: 'PRK', name: 'Coreia do Norte', nameEn: 'North Korea', group: '', flagCode: 'kp', fifaRanking: 0 },
  { code: 'ROU', name: 'Romênia', nameEn: 'Romania', group: '', flagCode: 'ro', fifaRanking: 0 },
  { code: 'RUS', name: 'Rússia', nameEn: 'Russia', group: '', flagCode: 'ru', fifaRanking: 0 },
  { code: 'SLV', name: 'El Salvador', nameEn: 'El Salvador', group: '', flagCode: 'sv', fifaRanking: 0 },
  { code: 'SRB', name: 'Sérvia', nameEn: 'Serbia', group: '', flagCode: 'rs', fifaRanking: 0 },
  { code: 'SVK', name: 'Eslováquia', nameEn: 'Slovakia', group: '', flagCode: 'sk', fifaRanking: 0 },
  { code: 'SVN', name: 'Eslovênia', nameEn: 'Slovenia', group: '', flagCode: 'si', fifaRanking: 0 },
  { code: 'TOG', name: 'Togo', nameEn: 'Togo', group: '', flagCode: 'tg', fifaRanking: 0 },
  { code: 'TRI', name: 'Trinidad e Tobago', nameEn: 'Trinidad and Tobago', group: '', flagCode: 'tt', fifaRanking: 0 },
  { code: 'UAE', name: 'Emirados Árabes Unidos', nameEn: 'United Arab Emirates', group: '', flagCode: 'ae', fifaRanking: 0 },
  { code: 'UKR', name: 'Ucrânia', nameEn: 'Ukraine', group: '', flagCode: 'ua', fifaRanking: 0 },
  { code: 'WAL', name: 'País de Gales', nameEn: 'Wales', group: '', flagCode: 'gb-wls', fifaRanking: 0 },
]

export const allTeams: Team[] = [...teams, ...historicalTeams]

export const teamsByCode: Record<string, Team> = Object.fromEntries(
  allTeams.map(t => [t.code, t])
)

export const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter(t => t.group === group)
}
