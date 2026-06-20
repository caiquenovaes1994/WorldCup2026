import type { GroupMatch } from '../types'

// All times are in Brasília time (UTC-3)
// ET to BRT: same offset (ET = UTC-4 during summer / EDT = UTC-4, BRT = UTC-3), so ET + 1h = BRT
// PT to BRT: PT + 4h = BRT (PDT = UTC-7, BRT = UTC-3)
// Local Mexico (CDT = UTC-5): CDT + 2h = BRT

export const groupMatches: GroupMatch[] = [
  // ========== GROUP A ==========
  // Matchday 1
  { id: 1, group: 'A', homeTeam: 'MEX', awayTeam: 'RSA', date: '2026-06-11', time: '16:00', venueId: 'azteca', homeScore: 2, awayScore: 0, referee: 'Wilton Sampaio', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=LPp92M0dRAA' },
  { id: 2, group: 'A', homeTeam: 'KOR', awayTeam: 'CZE', date: '2026-06-11', time: '23:00', venueId: 'akron', homeScore: 2, awayScore: 1, referee: 'Amin Mohamed Omar', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=KjQtpF_X5Uw' },
  // Matchday 2
  { id: 3, group: 'A', homeTeam: 'MEX', awayTeam: 'KOR', date: '2026-06-18', time: '22:00', venueId: 'akron', homeScore: 1, awayScore: 0, referee: 'Gustavo Tejera', matchday: 2, highlightsUrl: 'https://www.youtube.com/watch?v=ntouCePny7Q&pp=0gcJCT8LAYcqIYzv' },
  { id: 4, group: 'A', homeTeam: 'CZE', awayTeam: 'RSA', date: '2026-06-18', time: '13:00', venueId: 'mercedesbenz', homeScore: 1, awayScore: 1, referee: 'Tori Penso', matchday: 2, highlightsUrl: 'https://www.youtube.com/watch?v=r53ImtCSNog' },
  // Matchday 3
  { id: 5, group: 'A', homeTeam: 'CZE', awayTeam: 'MEX', date: '2026-06-24', time: '22:00', venueId: 'azteca', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 6, group: 'A', homeTeam: 'RSA', awayTeam: 'KOR', date: '2026-06-24', time: '22:00', venueId: 'bbva', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP B ==========
  // Matchday 1
  { id: 7, group: 'B', homeTeam: 'CAN', awayTeam: 'BIH', date: '2026-06-12', time: '16:00', venueId: 'bmo', homeScore: 1, awayScore: 1, referee: 'Facundo Tello', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=on3OBpbOWHg' },
  { id: 8, group: 'B', homeTeam: 'QAT', awayTeam: 'SUI', date: '2026-06-13', time: '16:00', venueId: 'levis', homeScore: 1, awayScore: 1, referee: 'Hector Said Martinez', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=kjsD442TPCw' },
  // Matchday 2
  { id: 9, group: 'B', homeTeam: 'SUI', awayTeam: 'BIH', date: '2026-06-18', time: '16:00', venueId: 'sofi', homeScore: 4, awayScore: 1, referee: 'Joao Pinheiro', matchday: 2, highlightsUrl: 'https://www.youtube.com/watch?v=P9ogWhz09D8&pp=0gcJCT8LAYcqIYzv' },
  { id: 10, group: 'B', homeTeam: 'CAN', awayTeam: 'QAT', date: '2026-06-18', time: '19:00', venueId: 'bcplace', homeScore: 6, awayScore: 0, referee: 'Cristian Garay', matchday: 2, highlightsUrl: 'https://www.youtube.com/watch?v=IBiGl8eMiRg' },
  // Matchday 3
  { id: 11, group: 'B', homeTeam: 'SUI', awayTeam: 'CAN', date: '2026-06-24', time: '16:00', venueId: 'bcplace', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 12, group: 'B', homeTeam: 'BIH', awayTeam: 'QAT', date: '2026-06-24', time: '16:00', venueId: 'lumen', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP C ==========
  // Matchday 1
  { id: 13, group: 'C', homeTeam: 'BRA', awayTeam: 'MAR', date: '2026-06-13', time: '19:00', venueId: 'metlife', homeScore: 1, awayScore: 1, referee: 'Slavko Vincic', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=t39QZJ0SmKg' },
  { id: 14, group: 'C', homeTeam: 'HAI', awayTeam: 'SCO', date: '2026-06-13', time: '22:00', venueId: 'gillette', homeScore: 0, awayScore: 1, referee: 'Mustapha Ghorbal', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=zgpYvZsnQ9o' },
  // Matchday 2
  { id: 15, group: 'C', homeTeam: 'BRA', awayTeam: 'HAI', date: '2026-06-19', time: '21:30', venueId: 'lincoln', homeScore: 3, awayScore: 0, referee: 'Alejandro Hernandez', matchday: 2, highlightsUrl: "https://www.youtube.com/watch?v=klEtq83CchQ" },
  { id: 16, group: 'C', homeTeam: 'SCO', awayTeam: 'MAR', date: '2026-06-19', time: '19:00', venueId: 'gillette', homeScore: 0, awayScore: 1, referee: 'Ilgiz Tantashev', matchday: 2, highlightsUrl: 'https://www.youtube.com/watch?v=lleabQ1DIm8' },
  // Matchday 3
  { id: 17, group: 'C', homeTeam: 'SCO', awayTeam: 'BRA', date: '2026-06-24', time: '19:00', venueId: 'hardrock', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 18, group: 'C', homeTeam: 'MAR', awayTeam: 'HAI', date: '2026-06-24', time: '19:00', venueId: 'mercedesbenz', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP D ==========
  // Matchday 1
  { id: 19, group: 'D', homeTeam: 'USA', awayTeam: 'PAR', date: '2026-06-12', time: '22:00', venueId: 'sofi', homeScore: 4, awayScore: 1, referee: 'Danny Makkelie', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=wL9aNQoF-C4' },
  { id: 20, group: 'D', homeTeam: 'AUS', awayTeam: 'TUR', date: '2026-06-14', time: '01:00', venueId: 'bcplace', homeScore: 2, awayScore: 0, referee: 'Jesus Valenzuela', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=W72qFYh1cdY' },
  // Matchday 2
  { id: 21, group: 'D', homeTeam: 'USA', awayTeam: 'AUS', date: '2026-06-19', time: '16:00', venueId: 'lumen', homeScore: 2, awayScore: 0, referee: 'Felix Zwayer', matchday: 2, highlightsUrl: "https://www.youtube.com/watch?v=Zm3GCCP04Es" },
  { id: 22, group: 'D', homeTeam: 'TUR', awayTeam: 'PAR', date: '2026-06-20', time: '00:00', venueId: 'levis', homeScore: 0, awayScore: 1, referee: 'Ivan Barton', matchday: 2, highlightsUrl: "https://www.youtube.com/watch?v=dAkr_yuPUMQ" },
  // Matchday 3
  { id: 23, group: 'D', homeTeam: 'TUR', awayTeam: 'USA', date: '2026-06-25', time: '23:00', venueId: 'sofi', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 24, group: 'D', homeTeam: 'PAR', awayTeam: 'AUS', date: '2026-06-25', time: '23:00', venueId: 'levis', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP E ==========
  // Matchday 1
  { id: 25, group: 'E', homeTeam: 'GER', awayTeam: 'CUW', date: '2026-06-14', time: '14:00', venueId: 'nrg', homeScore: 7, awayScore: 1, referee: 'Jalal Jayed', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=SjCj8eZM7Po' },
  { id: 26, group: 'E', homeTeam: 'CIV', awayTeam: 'ECU', date: '2026-06-14', time: '20:00', venueId: 'lincoln', homeScore: 1, awayScore: 0, referee: 'Michael Oliver', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=jZfgaWK0FiQ' },
  // Matchday 2
  { id: 27, group: 'E', homeTeam: 'GER', awayTeam: 'CIV', date: '2026-06-20', time: '17:00', venueId: 'bmo', homeScore: null, awayScore: null, referee: 'Juan Gabriel Benitez', matchday: 2 },
  { id: 28, group: 'E', homeTeam: 'ECU', awayTeam: 'CUW', date: '2026-06-20', time: '21:00', venueId: 'gillette', homeScore: null, awayScore: null, referee: 'Ma Ning', matchday: 2 },
  // Matchday 3
  { id: 29, group: 'E', homeTeam: 'CUW', awayTeam: 'CIV', date: '2026-06-25', time: '17:00', venueId: 'lincoln', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 30, group: 'E', homeTeam: 'ECU', awayTeam: 'GER', date: '2026-06-25', time: '17:00', venueId: 'metlife', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP F ==========
  // Matchday 1
  { id: 31, group: 'F', homeTeam: 'NED', awayTeam: 'JPN', date: '2026-06-14', time: '17:00', venueId: 'att', homeScore: 2, awayScore: 2, referee: 'Ismail Elfath', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=4GalIYEMjZQ' },
  { id: 32, group: 'F', homeTeam: 'SWE', awayTeam: 'TUN', date: '2026-06-14', time: '23:00', venueId: 'bbva', homeScore: 5, awayScore: 1, referee: 'Yael Falcon Perez', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=XiQ2ZoR-BgY&list=PLsFWLnYCEXEVNzCnkQE-xOuMc8oLxSleC&index=1&pp=iAQB' },
  // Matchday 2
  { id: 33, group: 'F', homeTeam: 'NED', awayTeam: 'SWE', date: '2026-06-20', time: '14:00', venueId: 'nrg', homeScore: 5, awayScore: 1, referee: 'Michael Oliver', matchday: 2 },
  { id: 34, group: 'F', homeTeam: 'TUN', awayTeam: 'JPN', date: '2026-06-21', time: '01:00', venueId: 'att', homeScore: null, awayScore: null, referee: 'Istvan Kovacs', matchday: 2 },
  // Matchday 3
  { id: 35, group: 'F', homeTeam: 'TUN', awayTeam: 'NED', date: '2026-06-25', time: '20:00', venueId: 'geha', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 36, group: 'F', homeTeam: 'JPN', awayTeam: 'SWE', date: '2026-06-25', time: '20:00', venueId: 'att', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP G ==========
  // Matchday 1
  { id: 37, group: 'G', homeTeam: 'BEL', awayTeam: 'EGY', date: '2026-06-15', time: '16:00', venueId: 'lumen', homeScore: 1, awayScore: 1, referee: 'Ramon Abatti', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=1H3txZ-BtiA' },
  { id: 38, group: 'G', homeTeam: 'IRN', awayTeam: 'NZL', date: '2026-06-15', time: '22:00', venueId: 'sofi', homeScore: 2, awayScore: 2, referee: 'Cesar Ramos', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=X1BWWzJ1_ZI' },
  // Matchday 2
  { id: 39, group: 'G', homeTeam: 'BEL', awayTeam: 'IRN', date: '2026-06-21', time: '16:00', venueId: 'sofi', homeScore: null, awayScore: null, referee: 'Dario Herrera', matchday: 2 },
  { id: 40, group: 'G', homeTeam: 'NZL', awayTeam: 'EGY', date: '2026-06-21', time: '22:00', venueId: 'bcplace', homeScore: null, awayScore: null, referee: 'Omar Mohamed Al Ali', matchday: 2 },
  // Matchday 3
  { id: 41, group: 'G', homeTeam: 'NZL', awayTeam: 'BEL', date: '2026-06-27', time: '00:00', venueId: 'bcplace', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 42, group: 'G', homeTeam: 'EGY', awayTeam: 'IRN', date: '2026-06-27', time: '00:00', venueId: 'lumen', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP H ==========
  // Matchday 1
  { id: 43, group: 'H', homeTeam: 'ESP', awayTeam: 'CPV', date: '2026-06-15', time: '13:00', venueId: 'mercedesbenz', homeScore: 0, awayScore: 0, referee: 'Adham Makhadmeh', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=z7e6Sfoyt0o' },
  { id: 44, group: 'H', homeTeam: 'KSA', awayTeam: 'URU', date: '2026-06-15', time: '19:00', venueId: 'hardrock', homeScore: 1, awayScore: 1, referee: 'Maurizio Mariani', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=B4LH6iZHr4Y&pp=0gcJCT4LAYcqIYzv' },
  // Matchday 2
  { id: 45, group: 'H', homeTeam: 'ESP', awayTeam: 'KSA', date: '2026-06-21', time: '13:00', venueId: 'mercedesbenz', homeScore: null, awayScore: null, referee: 'Raphael Claus', matchday: 2 },
  { id: 46, group: 'H', homeTeam: 'URU', awayTeam: 'CPV', date: '2026-06-21', time: '19:00', venueId: 'hardrock', homeScore: null, awayScore: null, referee: 'Espen Eskas', matchday: 2 },
  // Matchday 3
  { id: 47, group: 'H', homeTeam: 'URU', awayTeam: 'ESP', date: '2026-06-26', time: '21:00', venueId: 'akron', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 48, group: 'H', homeTeam: 'CPV', awayTeam: 'KSA', date: '2026-06-26', time: '21:00', venueId: 'nrg', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP I ==========
  // Matchday 1
  { id: 49, group: 'I', homeTeam: 'FRA', awayTeam: 'SEN', date: '2026-06-16', time: '16:00', venueId: 'metlife', homeScore: 3, awayScore: 1, referee: 'Alireza Faghani', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=63h686GP-M0' },
  { id: 50, group: 'I', homeTeam: 'IRQ', awayTeam: 'NOR', date: '2026-06-16', time: '19:00', venueId: 'gillette', homeScore: 1, awayScore: 4, referee: 'Pierre Atcho', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=HIReh6NKvJs' },
  // Matchday 2
  { id: 51, group: 'I', homeTeam: 'FRA', awayTeam: 'IRQ', date: '2026-06-22', time: '18:00', venueId: 'lincoln', homeScore: null, awayScore: null, referee: 'Drew Fischer', matchday: 2 },
  { id: 52, group: 'I', homeTeam: 'NOR', awayTeam: 'SEN', date: '2026-06-22', time: '21:00', venueId: 'metlife', homeScore: null, awayScore: null, referee: null, matchday: 2 },
  // Matchday 3
  { id: 53, group: 'I', homeTeam: 'NOR', awayTeam: 'FRA', date: '2026-06-26', time: '16:00', venueId: 'gillette', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 54, group: 'I', homeTeam: 'SEN', awayTeam: 'IRQ', date: '2026-06-26', time: '16:00', venueId: 'bmo', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP J ==========
  // Matchday 1
  { id: 55, group: 'J', homeTeam: 'ARG', awayTeam: 'ALG', date: '2026-06-16', time: '22:00', venueId: 'geha', homeScore: 3, awayScore: 0, referee: 'Szymon Marciniak', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=7OTeFyBFDqk&pp=0gcJCT4LAYcqIYzv' },
  { id: 56, group: 'J', homeTeam: 'AUT', awayTeam: 'JOR', date: '2026-06-17', time: '01:00', venueId: 'levis', homeScore: 3, awayScore: 1, referee: 'Dahane Beida', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=DJbXSHFjFLA' },
  // Matchday 2
  { id: 57, group: 'J', homeTeam: 'ARG', awayTeam: 'AUT', date: '2026-06-22', time: '14:00', venueId: 'att', homeScore: null, awayScore: null, referee: 'Amin Mohamed Omar', matchday: 2 },
  { id: 58, group: 'J', homeTeam: 'JOR', awayTeam: 'ALG', date: '2026-06-23', time: '00:00', venueId: 'levis', homeScore: null, awayScore: null, referee: null, matchday: 2 },
  // Matchday 3
  { id: 59, group: 'J', homeTeam: 'ALG', awayTeam: 'AUT', date: '2026-06-27', time: '23:00', venueId: 'geha', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 60, group: 'J', homeTeam: 'JOR', awayTeam: 'ARG', date: '2026-06-27', time: '23:00', venueId: 'att', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP K ==========
  // Matchday 1
  { id: 61, group: 'K', homeTeam: 'POR', awayTeam: 'COD', date: '2026-06-17', time: '14:00', venueId: 'nrg', homeScore: 1, awayScore: 1, referee: 'Abdulrahman Al Jassim', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=XGXliymXzG0&pp=0gcJCT4LAYcqIYzv' },
  { id: 62, group: 'K', homeTeam: 'UZB', awayTeam: 'COL', date: '2026-06-17', time: '23:00', venueId: 'azteca', homeScore: 1, awayScore: 3, referee: 'Anthony Taylor', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=YL5EZzCQee4' },
  // Matchday 2
  { id: 63, group: 'K', homeTeam: 'POR', awayTeam: 'UZB', date: '2026-06-23', time: '14:00', venueId: 'nrg', homeScore: null, awayScore: null, referee: null, matchday: 2 },
  { id: 64, group: 'K', homeTeam: 'COL', awayTeam: 'COD', date: '2026-06-23', time: '23:00', venueId: 'bbva', homeScore: null, awayScore: null, referee: null, matchday: 2 },
  // Matchday 3
  { id: 65, group: 'K', homeTeam: 'COL', awayTeam: 'POR', date: '2026-06-27', time: '20:30', venueId: 'hardrock', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 66, group: 'K', homeTeam: 'COD', awayTeam: 'UZB', date: '2026-06-27', time: '20:30', venueId: 'mercedesbenz', homeScore: null, awayScore: null, referee: null, matchday: 3 },

  // ========== GROUP L ==========
  // Matchday 1
  { id: 67, group: 'L', homeTeam: 'ENG', awayTeam: 'CRO', date: '2026-06-17', time: '17:00', venueId: 'att', homeScore: 4, awayScore: 2, referee: 'Clement Turpin', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=4oSd8kBXO6A' },
  { id: 68, group: 'L', homeTeam: 'GHA', awayTeam: 'PAN', date: '2026-06-17', time: '20:00', venueId: 'bmo', homeScore: 1, awayScore: 0, referee: 'Glenn Nyberg', matchday: 1, highlightsUrl: 'https://www.youtube.com/watch?v=eplGK1Sge4I' },
  // Matchday 2
  { id: 69, group: 'L', homeTeam: 'ENG', awayTeam: 'GHA', date: '2026-06-23', time: '17:00', venueId: 'gillette', homeScore: null, awayScore: null, referee: null, matchday: 2 },
  { id: 70, group: 'L', homeTeam: 'PAN', awayTeam: 'CRO', date: '2026-06-23', time: '20:00', venueId: 'lincoln', homeScore: null, awayScore: null, referee: null, matchday: 2 },
  // Matchday 3
  { id: 71, group: 'L', homeTeam: 'PAN', awayTeam: 'ENG', date: '2026-06-27', time: '18:00', venueId: 'metlife', homeScore: null, awayScore: null, referee: null, matchday: 3 },
  { id: 72, group: 'L', homeTeam: 'CRO', awayTeam: 'GHA', date: '2026-06-27', time: '18:00', venueId: 'lincoln', homeScore: null, awayScore: null, referee: null, matchday: 3 },
]

export function getMatchesByGroup(group: string): GroupMatch[] {
  return groupMatches.filter(m => m.group === group)
}
