export interface PlayerStat {
  name: string
  teamCode: string
  count: number
}

export const topScorers: PlayerStat[] = [
  { name: 'Julián Quiñones', teamCode: 'MEX', count: 1 },
  { name: 'Raúl Jiménez', teamCode: 'MEX', count: 1 },
  { name: 'Ladislav Krejčí', teamCode: 'CZE', count: 1 },
  { name: 'Hwang Inbeom', teamCode: 'KOR', count: 1 },
  { name: 'Oh Hyeongyu', teamCode: 'KOR', count: 1 }
]

export const topAssists: PlayerStat[] = [
  { name: 'Erik Lira', teamCode: 'MEX', count: 1 },
  { name: 'Roberto Alvarado', teamCode: 'MEX', count: 1 },
  { name: 'Vladimír Coufal', teamCode: 'CZE', count: 1 },
  { name: 'Lee Kang-in', teamCode: 'KOR', count: 1 },
  { name: 'Hwang Inbeom', teamCode: 'KOR', count: 1 }
]

export const cards: { name: string, teamCode: string, yellow: number, red: number }[] = [
  { name: 'Teboho Mokoena', teamCode: 'RSA', yellow: 1, red: 0 },
  { name: 'Brian Gutiérrez', teamCode: 'MEX', yellow: 1, red: 0 },
  { name: 'Nkosinathi Sibisi', teamCode: 'RSA', yellow: 1, red: 0 },
  { name: 'Sphephelo Sithole', teamCode: 'RSA', yellow: 0, red: 1 },
  { name: 'Themba Zwane', teamCode: 'RSA', yellow: 0, red: 1 },
  { name: 'César Montes', teamCode: 'MEX', yellow: 0, red: 1 },
  { name: 'Lee Kihyuk', teamCode: 'KOR', yellow: 1, red: 0 }
]
