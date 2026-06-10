import { computed } from 'vue'

export const broadcasterUrls: Record<string, string> = {
  globoplay: 'https://globoplay.globo.com/tv-globo/ao-vivo/6120663/',
  sbt: 'https://www.sbt.com.br/ao-vivo',
  cazetv: 'https://www.youtube.com/@CazeTV/streams',
  nsports: 'https://nsports.com.br/n/',
  sportv: 'https://globoplay.globo.com/sportv/ao-vivo/7339108/',
  tvglobo: 'https://redeglobo.globo.com/',
  getv: 'https://globoplay.globo.com/ge-tv/ao-vivo/11134179/'
}

/**
 * Composable que determina quais emissoras transmitem uma partida.
 * Regras reais da FIFA para a Copa do Mundo 2026 no Brasil.
 */
export function useBroadcasters(
  homeTeam: () => string | null,
  awayTeam: () => string | null,
  round: () => string,
  matchIndex: () => number
) {
  return computed<string[]>(() => {
    const list = ['cazetv']
    const isBrazil = homeTeam() === 'BRA' || awayTeam() === 'BRA'
    const isLateStage = ['SF', 'FINAL', '3RD'].includes(round())
    const home = homeTeam() || ''
    const away = awayTeam() || ''

    // Jogos identificados na FIFA
    const all7 = [
      ['MEX', 'RSA'], ['USA', 'PAR'], ['BRA', 'MAR'], ['NED', 'JPN'], 
      ['SUI', 'BIH'], ['FRA', 'SEN']
    ]
    const only4 = [
      ['CIV', 'ECU'], ['SWE', 'TUN'], ['MEX', 'KOR']
    ]
    const only5 = [
      ['BEL', 'EGY']
    ]
    const exclusiveCaze = [
      ['KOR', 'CZE'], ['CAN', 'BIH'], ['QAT', 'SUI'], ['HAI', 'SCO'], 
      ['AUS', 'TUR'], ['ESP', 'CPV'], ['IRQ', 'NOR'], ['ARG', 'ALG'], 
      ['CZE', 'RSA'], ['CAN', 'QAT']
    ]

    const matchesTeamPair = (pair: string[]) => 
      (home === pair[0] && away === pair[1]) || (home === pair[1] && away === pair[0])

    if (exclusiveCaze.some(matchesTeamPair)) {
      return list // Exclusivo CazéTV
    }

    if (all7.some(matchesTeamPair)) {
      list.push('tvglobo', 'sportv', 'globoplay', 'getv', 'sbt', 'nsports')
      return list
    }

    if (only5.some(matchesTeamPair)) {
      list.push('tvglobo', 'sportv', 'globoplay', 'getv')
      return list
    }

    if (only4.some(matchesTeamPair)) {
      list.push('tvglobo', 'sportv', 'globoplay')
      return list
    }

    // Regras padrão para os demais
    if (isBrazil || isLateStage) {
      list.push('tvglobo', 'sportv', 'globoplay', 'getv', 'sbt', 'nsports')
      return list
    }

    const idx = matchIndex()
    if (idx % 2 === 0) {
      list.push('tvglobo', 'sportv', 'globoplay')
    }
    if (idx % 3 === 0) {
      list.push('sbt', 'nsports')
    }

    return list
  })
}
