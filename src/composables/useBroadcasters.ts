import { computed } from 'vue'

/**
 * Composable que determina quais emissoras transmitem uma partida.
 * Regras:
 * - CazéTV transmite todos os jogos
 * - Jogos do Brasil ou fases avançadas (SF, FINAL, 3RD) recebem TV Globo, SporTV e Globoplay
 * - Mesmos critérios acima também incluem SBT e Nsports
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
    const idx = matchIndex()

    if (isBrazil || isLateStage || idx % 2 === 0) {
      list.push('tvglobo', 'sportv', 'globoplay')
    }

    if (isBrazil || isLateStage || idx % 3 === 0) {
      list.push('sbt', 'nsports')
    }

    return list
  })
}
