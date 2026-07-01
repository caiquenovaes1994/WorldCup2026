// Knockout bracket rules for 2026 FIFA World Cup
// R32 = Round of 32, R16 = Round of 16, QF = Quarterfinals, SF = Semifinals

import type { KnockoutMatch } from '../types'

// Fixed matchups for group winners (1X) and runners-up (2X)
// Third-place teams (3X) are assigned based on which groups produce qualifying thirds
export const knockoutTemplate: KnockoutMatch[] = [
  // ========== ROUND OF 32 (16 matches) ==========
  // Left side of bracket
  { id: 'R32-1', round: 'R32', position: 1, homeTeam: 'GER', awayTeam: 'PAR', homeScore: 1, awayScore: 1, homePenalties: 3, awayPenalties: 4, referee: 'Jalal Jayed', date: '2026-06-29', time: '17:30', venueId: 'gillette', homeSource: '1E', awaySource: '3A/B/C/D/F', highlightsUrl: 'https://www.youtube.com/watch?v=3zDpnkUog2M&pp=0gcJCU4LAYcqIYzv' },
  { id: 'R32-2', round: 'R32', position: 2, homeTeam: 'FRA', awayTeam: 'SWE', homeScore: 3, awayScore: 0, homePenalties: null, awayPenalties: null, referee: 'Danny Makkelie', date: '2026-06-30', time: '18:00', venueId: 'gillette', homeSource: '2E', awaySource: '2I', highlightsUrl: 'https://www.youtube.com/watch?v=OHG8Kt9RLJA&pp=0gcJCU4LAYcqIYzv' },
  { id: 'R32-3', round: 'R32', position: 3, homeTeam: 'RSA', awayTeam: 'CAN', homeScore: 0, awayScore: 1, homePenalties: null, awayPenalties: null, referee: 'Joao Pinheiro', date: '2026-06-28', time: '16:00', venueId: 'sofi', homeSource: '1A', awaySource: '3C/E/F/H/I', highlightsUrl: 'https://www.youtube.com/watch?v=vdWMGeeVgVU' },
  { id: 'R32-4', round: 'R32', position: 4, homeTeam: 'NED', awayTeam: 'MAR', homeScore: 1, awayScore: 1, homePenalties: 2, awayPenalties: 3, referee: 'Wilton Sampaio', date: '2026-06-29', time: '22:00', venueId: 'bbva', homeSource: '2A', awaySource: '2B', highlightsUrl: 'https://www.youtube.com/watch?v=yQiVnNXfCuc&pp=ygUSaG9sYW5kYSBlIG1hcnJvY29z' },
  { id: 'R32-5', round: 'R32', position: 5, homeTeam: 'POR', awayTeam: 'CRO', homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: 'Espen Eskas', date: '2026-06-30', time: '14:00', venueId: 'mercedesbenz', homeSource: '1G', awaySource: '3A/E/H/I/J' },
  { id: 'R32-6', round: 'R32', position: 6, homeTeam: 'ESP', awayTeam: 'AUT', homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: 'Glenn Nyberg', date: '2026-07-02', time: '16:00', venueId: 'geha', homeSource: '1I', awaySource: '3C/D/F/G/H' },
  { id: 'R32-7', round: 'R32', position: 7, homeTeam: 'USA', awayTeam: 'BIH', homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: 'Raphael Claus', date: '2026-07-01', time: '21:00', venueId: 'hardrock', homeSource: '1K', awaySource: '3D/E/I/J/L' },
  { id: 'R32-8', round: 'R32', position: 8, homeTeam: 'BEL', awayTeam: 'SEN', homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: 'Hector Said Martinez', date: '2026-07-01', time: '17:00', venueId: 'levis', homeSource: '2D', awaySource: '2G' },
  
  // Right side of bracket
  { id: 'R32-9', round: 'R32', position: 9, homeTeam: 'BRA', awayTeam: 'JPN', homeScore: 2, awayScore: 1, homePenalties: null, awayPenalties: null, referee: 'Maurizio Mariani', date: '2026-06-29', time: '14:00', venueId: 'att', homeSource: '1H', awaySource: '2J', highlightsUrl: 'https://www.youtube.com/watch?v=G7Sb_3BtW5A' },
  { id: 'R32-10', round: 'R32', position: 10, homeTeam: 'CIV', awayTeam: 'NOR', homeScore: 1, awayScore: 2, homePenalties: null, awayPenalties: null, referee: 'Jesus Valenzuela', date: '2026-06-30', time: '14:00', venueId: 'att', homeSource: '1G', awaySource: '3A/E/H/I/J', highlightsUrl: 'https://www.youtube.com/watch?v=TARrfpYqhTQ' },
  { id: 'R32-11', round: 'R32', position: 11, homeTeam: 'MEX', awayTeam: 'ECU', homeScore: 2, awayScore: 0, homePenalties: null, awayPenalties: null, referee: 'Slavko Vincic', date: '2026-06-30', time: '22:00', venueId: 'azteca', homeSource: '1K', awaySource: '3D/E/I/J/L', highlightsUrl: 'https://www.youtube.com/watch?v=MRcjGT85OXY' },
  { id: 'R32-12', round: 'R32', position: 12, homeTeam: 'ENG', awayTeam: 'COD', homeScore: 2, awayScore: 1, homePenalties: null, awayPenalties: null, referee: 'Adham Makhadmeh', date: '2026-07-01', time: '13:00', venueId: 'mercedesbenz', homeSource: '2K', awaySource: '2L', highlightsUrl: 'https://www.youtube.com/watch?v=A3jqrkkmt6I' },
  { id: 'R32-13', round: 'R32', position: 13, homeTeam: 'ARG', awayTeam: 'CPV', homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-03', time: '19:00', venueId: 'hardrock', homeSource: '1D', awaySource: '3B/E/F/I/J' },
  { id: 'R32-14', round: 'R32', position: 14, homeTeam: 'AUS', awayTeam: 'EGY', homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-03', time: '15:00', venueId: 'att', homeSource: '1F', awaySource: '2C' },
  { id: 'R32-15', round: 'R32', position: 15, homeTeam: 'SUI', awayTeam: 'ALG', homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: 'Yael Falcon Perez', date: '2026-07-03', time: '00:00', venueId: 'bcplace', homeSource: '1L', awaySource: '3E/H/I/J/K' },
  { id: 'R32-16', round: 'R32', position: 16, homeTeam: 'COL', awayTeam: 'GHA', homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-03', time: '22:30', venueId: 'geha', homeSource: '1J', awaySource: '2H' },

  // ========== ROUND OF 16 (8 matches) ==========
  { id: 'R16-1', round: 'R16', position: 1, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-04', time: '16:00', venueId: 'metlife', homeSource: 'W-R32-1', awaySource: 'W-R32-2' },
  { id: 'R16-2', round: 'R16', position: 2, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-04', time: '22:00', venueId: 'sofi', homeSource: 'W-R32-3', awaySource: 'W-R32-4' },
  { id: 'R16-3', round: 'R16', position: 3, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-05', time: '16:00', venueId: 'mercedesbenz', homeSource: 'W-R32-5', awaySource: 'W-R32-6' },
  { id: 'R16-4', round: 'R16', position: 4, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-05', time: '22:00', venueId: 'hardrock', homeSource: 'W-R32-7', awaySource: 'W-R32-8' },
  { id: 'R16-5', round: 'R16', position: 5, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-06', time: '16:00', venueId: 'lincoln', homeSource: 'W-R32-9', awaySource: 'W-R32-10' },
  { id: 'R16-6', round: 'R16', position: 6, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-06', time: '22:00', venueId: 'att', homeSource: 'W-R32-11', awaySource: 'W-R32-12' },
  { id: 'R16-7', round: 'R16', position: 7, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-07', time: '16:00', venueId: 'nrg', homeSource: 'W-R32-13', awaySource: 'W-R32-14' },
  { id: 'R16-8', round: 'R16', position: 8, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-07', time: '22:00', venueId: 'geha', homeSource: 'W-R32-15', awaySource: 'W-R32-16' },

  // ========== QUARTERFINALS (4 matches) ==========
  { id: 'QF-1', round: 'QF', position: 1, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-09', time: '19:00', venueId: 'sofi', homeSource: 'W-R16-1', awaySource: 'W-R16-2' },
  { id: 'QF-2', round: 'QF', position: 2, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-10', time: '19:00', venueId: 'mercedesbenz', homeSource: 'W-R16-3', awaySource: 'W-R16-4' },
  { id: 'QF-3', round: 'QF', position: 3, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-10', time: '22:00', venueId: 'att', homeSource: 'W-R16-5', awaySource: 'W-R16-6' },
  { id: 'QF-4', round: 'QF', position: 4, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-11', time: '19:00', venueId: 'nrg', homeSource: 'W-R16-7', awaySource: 'W-R16-8' },

  // ========== SEMIFINALS (2 matches) ==========
  { id: 'SF-1', round: 'SF', position: 1, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-14', time: '21:00', venueId: 'att', homeSource: 'W-QF-1', awaySource: 'W-QF-2' },
  { id: 'SF-2', round: 'SF', position: 2, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-15', time: '21:00', venueId: 'mercedesbenz', homeSource: 'W-QF-3', awaySource: 'W-QF-4' },

  // ========== 3RD PLACE ==========
  { id: '3RD', round: '3RD', position: 1, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-18', time: '17:00', venueId: 'hardrock', homeSource: 'L-SF-1', awaySource: 'L-SF-2' },

  // ========== FINAL ==========
  { id: 'FINAL', round: 'FINAL', position: 1, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, referee: null, date: '2026-07-19', time: '17:00', venueId: 'metlife', homeSource: 'W-SF-1', awaySource: 'W-SF-2' },
]

export const roundNames: Record<string, string> = {
  'R32': 'Oitavas de Final (Round of 32)',
  'R16': 'Oitavas de Final (Round of 16)',
  'QF': 'Quartas de Final',
  'SF': 'Semifinais',
  '3RD': 'Disputa de 3º Lugar',
  'FINAL': 'Final',
}
