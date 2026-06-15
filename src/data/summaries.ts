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
  ],
  2: [
    { time: "90'+6", type: "yellow", team: "home", player: "Lee Kihyuk" },
    { time: "80'", type: "goal", team: "home", player: "Oh Hyeongyu", secondaryPlayer: "Hwang Inbeom", description: "2 - 1" },
    { time: "67'", type: "goal", team: "home", player: "Hwang Inbeom", secondaryPlayer: "Lee Kang-in", description: "1 - 1" },
    { time: "59'", type: "goal", team: "away", player: "Ladislav Krejčí", secondaryPlayer: "Vladimír Coufal", description: "0 - 1" }
  ],
  7: [
    { time: "90'+3", type: "yellow", team: "away", player: "Nikola Katic" },
    { time: "78'", type: "goal", team: "home", player: "Cyle Larin", secondaryPlayer: "Promise David", description: "1 - 1" },
    { time: "53'", type: "yellow", team: "home", player: "Luc De Fougerolles" },
    { time: "45'+1", type: "yellow", team: "away", player: "Jovo Lukic" },
    { time: "45'", type: "yellow", team: "away", player: "Ermedin Demirovic" },
    { time: "21'", type: "goal", team: "away", player: "Jovo Lukic", secondaryPlayer: "Saed Kolasinac", description: "0 - 1" },
    { time: "11'", type: "yellow", team: "home", player: "Alistair Johnston" }
  ],
  8: [
    { time: "90'+4", type: "goal", team: "home", player: "Miro Muheim (GC)", description: "1 - 1" },
    { time: "42'", type: "yellow", team: "away", player: "Denis Zakaria" },
    { time: "23'", type: "yellow", team: "home", player: "Jassem Gaber Abdulsallam" },
    { time: "17'", type: "goal", team: "away", player: "Breel Embolo (P)", description: "0 - 1" },
    { time: "16'", type: "yellow", team: "home", player: "Mahmud Abunada" }
  ],
  13: [
    { time: "43'", type: "yellow", team: "home", player: "Roger Ibañez" },
    { time: "37'", type: "yellow", team: "home", player: "Casemiro" },
    { time: "32'", type: "goal", team: "home", player: "Vinicius Jr", secondaryPlayer: "Bruno Guimarães", description: "1 - 1" },
    { time: "21'", type: "goal", team: "away", player: "Ismael Saibari", secondaryPlayer: "Brahím Diaz", description: "0 - 1" }
  ],
  14: [
    { time: "90'+5", type: "yellow", team: "away", player: "Kenny McLean" },
    { time: "90'+1", type: "yellow", team: "away", player: "Findlay Curtis" },
    { time: "46'", type: "yellow", team: "away", player: "Aaron Hickey" },
    { time: "39'", type: "yellow", team: "home", player: "Jean-Ricner Bellegarde" },
    { time: "28'", type: "goal", team: "away", player: "John McGinn", description: "0 - 1" }
  ],
  19: [
    { time: "90'+8", type: "goal", team: "home", player: "Giovanni Reyna", secondaryPlayer: "Alexander Freeman", description: "4 - 1" },
    { time: "90'+3", type: "yellow", team: "away", player: "Junior Alonso" },
    { time: "88'", type: "yellow", team: "away", player: "Alex Arce" },
    { time: "79'", type: "yellow", team: "away", player: "Diego Gómez" },
    { time: "73'", type: "goal", team: "away", player: "Mauricio", secondaryPlayer: "Julio Enciso", description: "3 - 1" },
    { time: "59'", type: "yellow", team: "home", player: "Tyler Adams" },
    { time: "53'", type: "yellow", team: "away", player: "Miguel Almirón" },
    { time: "45'+5", type: "goal", team: "home", player: "Folarin Balogun", secondaryPlayer: "Malik Tillman", description: "3 - 0" },
    { time: "31'", type: "goal", team: "home", player: "Folarin Balogun", secondaryPlayer: "Christian Pulisic", description: "2 - 0" },
    { time: "10'", type: "yellow", team: "away", player: "Juan Cáceres" },
    { time: "7'", type: "goal", team: "home", player: "Damián Bobadilla (GC)", description: "1 - 0" }
  ],
  20: [
    { time: "86'", type: "yellow", team: "away", player: "Yunus Akgun" },
    { time: "75'", type: "goal", team: "home", player: "Connor Metcalfe", description: "2 - 0" },
    { time: "27'", type: "goal", team: "home", player: "Nestory Irankuda", secondaryPlayer: "Paul Okon-Engstler", description: "1 - 0" }
  ],
  25: [
    { time: "88'", type: "goal", team: "home", player: "Kai Havertz", secondaryPlayer: "Deniz Undav", description: "7 - 1" },
    { time: "78'", type: "goal", team: "home", player: "Deniz Undav", secondaryPlayer: "Joshua Kimmich", description: "6 - 1" },
    { time: "68'", type: "goal", team: "home", player: "Nathaniel Brown", secondaryPlayer: "Deniz Undav", description: "5 - 1" },
    { time: "47'", type: "goal", team: "home", player: "Jamal Musiala", secondaryPlayer: "Joshua Kimmich", description: "4 - 1" },
    { time: "45'+5", type: "goal", team: "home", player: "Kai Havertz (P)", description: "3 - 1" },
    { time: "38'", type: "goal", team: "home", player: "Nico Schlotterbeck", secondaryPlayer: "Nathaniel Brown", description: "2 - 1" },
    { time: "21'", type: "goal", team: "away", player: "Livano Comenencia", description: "1 - 1" },
    { time: "6'", type: "goal", team: "home", player: "Felix Nmecha", secondaryPlayer: "Florian Wirtz", description: "1 - 0" }
  ],
  31: [
    { time: "90'+1", type: "yellow", team: "home", player: "Micky van de Ven" },
    { time: "89'", type: "goal", team: "away", player: "Daichi Kamada", secondaryPlayer: "Koki Ogawa", description: "2 - 2" },
    { time: "83'", type: "yellow", team: "home", player: "Memphis Depay" },
    { time: "64'", type: "goal", team: "home", player: "Crysencio Summerville", secondaryPlayer: "Ryan Gravenberch", description: "2 - 1" },
    { time: "61'", type: "yellow", team: "home", player: "Crysencio Summerville" },
    { time: "57'", type: "goal", team: "away", player: "Keito Nakamura", secondaryPlayer: "Takefusa Kubo", description: "1 - 1" },
    { time: "51'", type: "goal", team: "home", player: "Virgil van Dijk", secondaryPlayer: "Ryan Gravenberch", description: "1 - 0" }
  ],
  26: [
    { time: "90'", type: "goal", team: "home", player: "Amad Diallo", description: "1 - 0" },
    { time: "73'", type: "yellow", team: "away", player: "Jackson Porozo" },
    { time: "40'", type: "yellow", team: "home", player: "Guéla Doué" },
    { time: "38'", type: "yellow", team: "home", player: "Franck Kessié" },
    { time: "28'", type: "yellow", team: "home", player: "Seko Fofana" }
  ],
  32: [
    { time: "90'+6", type: "goal", team: "home", player: "Yasin Ayari", secondaryPlayer: "Lucas Bergvall", description: "5 - 1" },
    { time: "84'", type: "goal", team: "home", player: "Mattias Svanberg", secondaryPlayer: "Alexsander Isak", description: "4 - 1" },
    { time: "59'", type: "goal", team: "home", player: "Viktor Gyokeres", secondaryPlayer: "Alexsander Isak", description: "3 - 1" },
    { time: "54'", type: "yellow", team: "away", player: "Rani Khedira" },
    { time: "43'", type: "goal", team: "away", player: "Omar Rekik", secondaryPlayer: "Hannibal Mejbri", description: "2 - 1" },
    { time: "30'", type: "goal", team: "home", player: "Alexsander Isak", secondaryPlayer: "Viktor Gyokeres", description: "2 - 0" },
    { time: "7'", type: "goal", team: "home", player: "Yasin Ayari", description: "1 - 0" }
  ],
  43: [
    { time: "90'+33", type: "yellow", team: "home", player: "Pedri" },
    { time: "16'", type: "yellow", team: "away", player: "Sidny Lopes Cabral" }
  ]
}
