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

export const teamsByCode: Record<string, Team> = Object.fromEntries(
  teams.map(t => [t.code, t])
)

export const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter(t => t.group === group)
}
