export interface Team {
  code: string
  name: string
  nameEn: string
  group: string
  flagCode: string
  fifaRanking: number
appearances?: number
}

export interface Venue {
  id: string
  name: string
  city: string
  state: string
  country: string
  capacity: number
  imageUrl?: string
}

export interface Referee {
  name: string
  country: string
  confederation: string
  link?: string
}

export interface GroupMatch {
  id: number
  group: string
  homeTeam: string // team code
  awayTeam: string // team code
  date: string // ISO date
  time: string // HH:MM (Brasília time, UTC-3)
  venueId: string
  homeScore: number | null
  awayScore: number | null
  referee: string | null // referee name
  matchday: number // 1, 2 or 3
  highlightsUrl?: string
}

export interface GroupStanding {
  teamCode: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  position: number
  qualified: 'first' | 'second' | 'third-qualified' | 'third-eliminated' | null
}

export interface KnockoutMatch {
  id: string
  round: 'R32' | 'R16' | 'QF' | 'SF' | '3RD' | 'FINAL'
  position: number
  homeTeam: string | null
  awayTeam: string | null
  homeScore: number | null
  awayScore: number | null
  homePenalties: number | null
  awayPenalties: number | null
  referee: string | null
  date: string
  time: string
  venueId: string
  homeSource: string // e.g. "1A", "2B", "3C/E/F", "W-R32-1"
  awaySource: string
  highlightsUrl?: string
}

export interface ThirdPlaceRanking {
  teamCode: string
  group: string
  points: number
  goalDifference: number
  goalsFor: number
  qualified: boolean
}
