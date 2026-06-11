export interface MatchEvent {
  time: string;
  type: 'goal' | 'yellow' | 'red' | 'sub' | 'var' | 'info';
  team: 'home' | 'away' | 'none';
  player: string;
  secondaryPlayer?: string;
  description?: string;
}

export const matchEvents: Record<number | string, MatchEvent[]> = {
  1: [
    { time: "90'+2", type: "red", team: "home", player: "C. Montes" },
    { time: "84'", type: "red", team: "away", player: "T. Zwane" },
    { time: "82'", type: "var", team: "away", player: "T. Zwane", description: "Cartão modificado" },
    { time: "74'", type: "yellow", team: "away", player: "N. Sibisi" },
    { time: "67'", type: "goal", team: "home", player: "R. Jiménez", secondaryPlayer: "R. Alvarado", description: "2 - 0" },
    { time: "49'", type: "red", team: "away", player: "S. Sithole" },
    { time: "23'", type: "yellow", team: "home", player: "B. Gutiérrez" },
    { time: "17'", type: "yellow", team: "away", player: "T. Mokoena" },
    { time: "9'", type: "goal", team: "home", player: "J. Quiñones", secondaryPlayer: "E. Lira", description: "1 - 0" }
  ]
}
