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
  { name: 'Oh Hyeongyu', teamCode: 'KOR', count: 1 },
  { name: 'Jovo Lukic', teamCode: 'BIH', count: 1 },
  { name: 'Cyle Larin', teamCode: 'CAN', count: 1 },
  { name: 'Folarin Balogun', teamCode: 'USA', count: 2 },
  { name: 'Mauricio', teamCode: 'PAR', count: 1 },
  { name: 'Giovanni Reyna', teamCode: 'USA', count: 1 }
]

export const topAssists: PlayerStat[] = [
  { name: 'Erik Lira', teamCode: 'MEX', count: 1 },
  { name: 'Roberto Alvarado', teamCode: 'MEX', count: 1 },
  { name: 'Vladimír Coufal', teamCode: 'CZE', count: 1 },
  { name: 'Lee Kang-in', teamCode: 'KOR', count: 1 },
  { name: 'Hwang Inbeom', teamCode: 'KOR', count: 1 },
  { name: 'Saed Kolasinac', teamCode: 'BIH', count: 1 },
  { name: 'Promise David', teamCode: 'CAN', count: 1 },
  { name: 'Christian Pulisic', teamCode: 'USA', count: 1 },
  { name: 'Malik Tillman', teamCode: 'USA', count: 1 },
  { name: 'Julio Enciso', teamCode: 'PAR', count: 1 },
  { name: 'Alexander Freeman', teamCode: 'USA', count: 1 }
]

export const cards: { name: string, teamCode: string, yellow: number, red: number }[] = [
  { name: 'Teboho Mokoena', teamCode: 'RSA', yellow: 1, red: 0 },
  { name: 'Brian Gutiérrez', teamCode: 'MEX', yellow: 1, red: 0 },
  { name: 'Nkosinathi Sibisi', teamCode: 'RSA', yellow: 1, red: 0 },
  { name: 'Sphephelo Sithole', teamCode: 'RSA', yellow: 0, red: 1 },
  { name: 'Themba Zwane', teamCode: 'RSA', yellow: 0, red: 1 },
  { name: 'César Montes', teamCode: 'MEX', yellow: 0, red: 1 },
  { name: 'Lee Kihyuk', teamCode: 'KOR', yellow: 1, red: 0 },
  { name: 'Alistair Johnston', teamCode: 'CAN', yellow: 1, red: 0 },
  { name: 'Ermedin Demirovic', teamCode: 'BIH', yellow: 1, red: 0 },
  { name: 'Jovo Lukic', teamCode: 'BIH', yellow: 1, red: 0 },
  { name: 'Luc De Fougerolles', teamCode: 'CAN', yellow: 1, red: 0 },
  { name: 'Nikola Katic', teamCode: 'BIH', yellow: 1, red: 0 },
  { name: 'Juan Cáceres', teamCode: 'PAR', yellow: 1, red: 0 },
  { name: 'Miguel Almirón', teamCode: 'PAR', yellow: 1, red: 0 },
  { name: 'Tyler Adams', teamCode: 'USA', yellow: 1, red: 0 },
  { name: 'Diego Gómez', teamCode: 'PAR', yellow: 1, red: 0 },
  { name: 'Alex Arce', teamCode: 'PAR', yellow: 1, red: 0 },
  { name: 'Junior Alonso', teamCode: 'PAR', yellow: 1, red: 0 }
]
