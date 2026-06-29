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
  3: [
    { time: "58'", type: "yellow", team: "away", player: "Seung Ho Paik" },
    { time: "50'", type: "goal", team: "home", player: "Luis Romo", description: "1 - 0" },
    { time: "4'", type: "yellow", team: "away", player: "Kang-in Lee" }
  ],
  4: [
    { time: "83'", type: "goal", team: "away", player: "Teboho Mokoena (P)", description: "1 - 1" },
    { time: "75'", type: "yellow", team: "home", player: "Ladislav Krejci" },
    { time: "40'", type: "yellow", team: "away", player: "Thalente Mbatha" },
    { time: "33'", type: "yellow", team: "away", player: "Teboho Mokoena" },
    { time: "6'", type: "goal", team: "home", player: "Michal Sadilek", secondaryPlayer: "Alexsandr Sojka", description: "1 - 0" }
  ],
  5: [
    { time: "90'+4", type: "goal", team: "away", player: "Álvaro Fidalgo", secondaryPlayer: 'Roberto Alvarado', description: "0 - 3" },
    { time: "64'", type: "yellow", team: "away", player: "Edson Álvarez" },
    { time: "61'", type: "goal", team: "away", player: "Julián Quiñones", secondaryPlayer: "Jorge Sánchez", description: "0 - 2" },
    { time: "55'", type: "goal", team: "away", player: "Mateo Chávez", secondaryPlayer: "Luis Romo", description: "0 - 1" }
  ],
  6: [
    { time: "79'", type: "yellow", team: "away", player: "Gue-sung Cho" },
    { time: "73'", type: "yellow", team: "home", player: "Aubrey Modiba" },
    { time: "63'", type: "goal", team: "home", player: "Thapelo Maseko", secondaryPlayer: "Tshepang Moremi", description: "0 - 1" },
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
  9: [
    { time: "85'", type: "goal", team: "home", player: "Johan Manzambi", secondaryPlayer: "Ruben Vargas", description: "4 - 1" },
    { time: "80'", type: "yellow", team: "away", player: "Edin Dzeko" },
    { time: "71'", type: "goal", team: "home", player: "Ruben Vargas", description: "3 - 1" },
    { time: "66'", type: "yellow", team: "away", player: "Amar Dedic" },
    { time: "48'", type: "red", team: "away", player: "Tarik Muharemovic" },
    { time: "41'", type: "goal", team: "home", player: "Johan Manzambi", description: "2 - 1" },
    { time: "23'", type: "goal", team: "away", player: "Ermin Mahmic", description: "1 - 1" },
    { time: "11'", type: "goal", team: "home", player: "Granit Xhaka", description: "1 - 0" },
    { time: "5'", type: "yellow", team: "home", player: "Nico Elvedi" }
  ],
  10: [
    { time: "90'+2", type: "goal", team: "home", player: "Jonathan David", secondaryPlayer: "Nathan-Dylan Saliba", description: "6 - 0" },
    { time: "75'", type: "goal", team: "home", player: "Mohamed Naceur Almanai (GC)", description: "5 - 0" },
    { time: "64'", type: "goal", team: "home", player: "Nathan-Dylan Saliba", description: "4 - 0" },
    { time: "62'", type: "yellow", team: "away", player: "Ahmed Fathi" },
    { time: "53'", type: "red", team: "away", player: "Assim Madibo" },
    { time: "45'+3", type: "goal", team: "home", player: "Jonathan David", description: "3 - 0" },
    { time: "33'", type: "red", team: "away", player: "Homan Al-Amin" },
    { time: "29'", type: "goal", team: "home", player: "Jonathan David", description: "2 - 0" },
    { time: "16'", type: "goal", team: "home", player: "Cyle Larin", description: "1 - 0" },
    { time: "9'", type: "yellow", team: "home", player: "Derek Cornelius" }
  ],
  11: [
    { time: "87'", type: "yellow", team: "away", player: "Liam Millar" },
    { time: "76'", type: "goal", team: "away", player: "Promise David", secondaryPlayer: "Nathan-Dylan Saliba", description: "2 - 1" },
    { time: "57'", type: "goal", team: "home", player: "Johan Manzambi", secondaryPlayer: "Breel Embolo", description: "2 - 0" },
    { time: "46'", type: "goal", team: "home", player: "Ruben Vargas", secondaryPlayer: "Johan Manzambi", description: "1 - 0" },
    { time: "32'", type: "yellow", team: "home", player: "Granit Xhaka" },
    { time: "32'", type: "yellow", team: "away", player: "Cyle Larin" }
  ],
  12: [
    { time: "81'", type: "yellow", team: "home", player: "Ermin Mahmic" },
    { time: "80'", type: "goal", team: "home", player: "Ermin Mahmic", secondaryPlayer: "Dennis Hadzikadunic", description: "3 - 1" },
    { time: "78'", type: "yellow", team: "away", player: "Ahmed Fathi" },
    { time: "42'", type: "goal", team: "away", player: "Hassan Al-Haydos", secondaryPlayer: "Edmilson Jr", description: "2 - 1" },
    { time: "34'", type: "goal", team: "home", player: "Sultan Al-Brake (GC)", description: "2 - 0" },
    { time: "29'", type: "goal", team: "home", player: "Kerim Alajbegovic", secondaryPlayer: "Ivan Basic", description: "1 - 0" }
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
  15: [
    { time: "72'", type: "yellow", team: "away", player: "Danley Jean Jacques" },
    { time: "66'", type: "yellow", team: "home", player: "Douglas Santos" },
    { time: "45'+4", type: "yellow", team: "away", player: "Frantzdy Pierrot" },
    { time: "45'+3", type: "goal", team: "home", player: "Vinicius Jr", secondaryPlayer: "Lucas Paquetá", description: "3 - 0" },
    { time: "36'", type: "goal", team: "home", player: "Matheus Cunha", secondaryPlayer: "Vinicius Jr", description: "2 - 0" },
    { time: "24'", type: "goal", team: "home", player: "Matheus Cunha", description: "1 - 0" },
    { time: "4'", type: "yellow", team: "away", player: "Carlens Arcus" }       
  ],
  16: [
    { time: "90'+5", type: "yellow", team: "home", player: "Andy Robertson" },
    { time: "23'", type: "yellow", team: "away", player: "Issa Diop" },
    { time: "2'", type: "goal", team: "away", player: "Ismael Saibari", secondaryPlayer: "Brahím Diaz", description: "0 - 1" }
  ],
  17: [
    { time: "89'", type: "yellow", team: "home", player: "Ryan Christie" },
    { time: "83'", type: "yellow", team: "away", player: "Fabinho" },
    { time: "63'", type: "yellow", team: "away", player: "Danilo" },
    { time: "61'", type: "goal", team: "away", player: "Matheus Cunha", secondaryPlayer: "Bruno Guimarães", description: "0 - 3" },
    { time: "45'+3", type: "goal", team: "away", player: "Vinicius Jr", secondaryPlayer: "Bruno Guimarães", description: "0 - 2" },
    { time: "7'", type: "goal", team: "away", player: "Vinicius Jr", secondaryPlayer: "Rayan", description: "0 - 1" }
  ],
  18: [
    { time: "90'+4", type: "yellow", team: "away", player: "Josué Casimir" },
    { time: "89'", type: "goal", team: "home", player: "Gessime Yassine", secondaryPlayer: "Soufiane Rahimi", description: "4 - 2"},
    { time: "79'", type: "yellow", team: "away", player: "Johny Placide" },
    { time: "79'", type: "yellow", team: "away", player: "Duckens Nazon" },
    { time: "78'", type: "goal", team: "home", player: "Soufiane Rahimi", secondaryPlayer: "Chadi Riad", description: "3 - 2"},
    { time: "45'+1", type: "goal", team: "home", player: "Ismael Saibari", secondaryPlayer: "Achraf Hakimi", description: "2 - 2" },
    { time: "43'", type: "goal", team: "away", player: "Wilson Isidor", secondaryPlayer: "Jean-Kévin Duverne", description: "1 - 2" },
    { time: "39'", type: "goal", team: "home", player: "Achraf Hakimi", description: "1 - 1" },
    { time: "23'", type: "goal", team: "away", player: "Yassine Bonou (GC)", description: "0 - 1" }
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
  21: [
    { time: "90'+2", type: "yellow", team: "home", player: "Chris Richards" },
    { time: "89'", type: "yellow", team: "away", player: "Harry Souttar" },
    { time: "89'", type: "yellow", team: "away", player: "Jacob Italiano" },
    { time: "89'", type: "yellow", team: "home", player: "Folarin Balogun" },
    { time: "56'", type: "yellow", team: "home", player: "Antonee Robinson" },
    { time: "44'", type: "goal", team: "home", player: "Alexsander Freeman", description: "2 - 0" },
    { time: "32'", type: "yellow", team: "away", player: "Alessandro Circati" },
    { time: "16'", type: "yellow", team: "away", player: "Jordan Bos" },
    { time: "11'", type: "goal", team: "home", player: "Cameron Burgess (GC)", description: "1 - 0" }
  ],
  22: [
    { time: "71'", type: "yellow", team: "home", player: "Eren Elmali" },
    { time: "45'+3", type: "red", team: "away", player: "Miguel Almirón" },
    { time: "4'", type: "yellow", team: "away", player: "Matias Galarza" },
    { time: "2'", type: "goal", team: "away", player: "Matias Galarza", secondaryPlayer: "Julio Enciso", description: "0 - 1" }
  ],
  23: [
    { time: "90'+8", type: "goal", team: "home", player: "Kaan Ayhan", description: "3 - 2" },
    { time: "49'", type: "goal", team: "away", player: "Sebastian Berhalter", description: "2 - 2" },
    { time: "31'", type: "goal", team: "home", player: "Baris Alper Yilmaz", secondaryPlayer: "Orkun Kokçu", description: "2 - 1" },
    { time: "19'", type: "yellow", team: "away", player: "Sebastian Berhalter" },
    { time: "10'", type: "goal", team: "home", player: "Arda Guler", secondaryPlayer: "Baris Alper Yilmaz", description: "1 - 1" },
    { time: "3'", type: "goal", team: "away", player: "Auston Trusty", secondaryPlayer: "Sebastian Berhalter", description: "0 - 1" }
  ],
  24: [
    { time: "77'", type: "yellow", team: "home", player: "Diego Gómez" },
    { time: "46'", type: "yellow", team: "away", player: "Jackson Irvine" }
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
  27: [
    { time: "90'+4", type: "goal", team: "home", player: "Deniz Undav", secondaryPlayer: "Felix Nmecha", description: "2 - 1" },
    { time: "68'", type: "goal", team: "home", player: "Deniz Undav", secondaryPlayer: "Nadiem Amiri", description: "1 - 1" },
    { time: "30'", type: "goal", team: "away", player: "Franck Kessié", description: "0 - 1" }
  ],
  28: [
    { time: "90'+1", type: "yellow", team: "away", player: "Gervane Kastaneer" },
    { time: "75'", type: "yellow", team: "away", player: "Jurien Gaari" },
    { time: "56'", type: "yellow", team: "away", player: "Livano Comenencia" },
    { time: "53'", type: "yellow", team: "away", player: "Juninho Bacuna" },
    { time: "39'", type: "yellow", team: "away", player: "Leandro Bacuna" },
    { time: "38'", type: "yellow", team: "home", player: "Jordy Alcivar" }
  ],
  29: [
    { time: "83'", type: "yellow", team: "home", player: "Gervane Kastaneer" },
    { time: "75'", type: "yellow", team: "home", player: "Juninho Bacuna" },
    { time: "64'", type: "goal", team: "away", player: "Nicolas Pépé", secondaryPlayer: "Ibrahim Sangaré", description: "0 - 2" },
    { time: "35'", type: "yellow", team: "away", player: "Nicolas Pépé" },
    { time: "7'", type: "goal", team: "away", player: "Nicolas Pépé", secondaryPlayer: "Yan Diomandé", description: "0 - 1" }
  ],
  30: [
    { time: "89'", type: "yellow", team: "home", player: "Gonzalo Plata" },
    { time: "77'", type: "goal", team: "home", player: "Gonzalo Plata", secondaryPlayer: "Kevin Rodríguez", description: "2 - 1" },
    { time: "50'", type: "yellow", team: "home", player: "Alan Franco" },
    { time: "44'", type: "yellow", team: "away", player: "Aleksander Pavlovic" },
    { time: "43'", type: "yellow", team: "home", player: "Piero Hincapié" },
    { time: "9'", type: "goal", team: "home", player: "Nilson Angulo", secondaryPlayer: "Pedro Vite", description: "1 - 1" },
    { time: "2'", type: "goal", team: "away", player: "Leroy Sané", secondaryPlayer: "Kai Havertz", description: "0 - 1" }
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
  33: [
    { time: "89'", type: "goal", team: "home", player: "Crysencio Summerville", secondaryPlayer: "Memphis Depay", description: "5 - 1" },
    { time: "80'", type: "yellow", team: "away", player: "Lucas Bergvall" },
    { time: "75'", type: "yellow", team: "away", player: "Yasin Ayari" },
    { time: "59'", type: "goal", team: "away", player: "Anthony Elanga", secondaryPlayer: "Alexsander Isak", description: "4 - 1" },
    { time: "54'", type: "goal", team: "home", player: "Cody Gakpo", secondaryPlayer: "Crysencio Summerville", description: "4 - 0" },
    { time: "53'", type: "yellow", team: "away", player: "Gabriel Gudmundsson" },
    { time: "47'", type: "goal", team: "home", player: "Cody Gakpo", secondaryPlayer: "Denzel Dumfries", description: "3 - 0" },
    { time: "17'", type: "goal", team: "home", player: "Brian Brobbey", secondaryPlayer: "Denzel Dumfries", description: "2 - 0" },    
    { time: "6'", type: "goal", team: "home", player: "Brian Brobbey", secondaryPlayer: "Cody Gakpo", description: "1 - 0" }    
  ],
  34: [
    { time: "83'", type: "goal", team: "away", player: "Ayase Ueda", secondaryPlayer: "Kaishu Sano", description: "0 - 4" },
    { time: "69'", type: "goal", team: "away", player: "Junya Ito", secondaryPlayer: "Ayase Ueda", description: "0 - 3" },
    { time: "31'", type: "goal", team: "away", player: "Ayase Ueda", secondaryPlayer: "Ko Itakura", description: "0 - 2" },
    { time: "4'", type: "goal", team: "away", player: "Daichi Kamada", secondaryPlayer: "Keito Nakamura", description: "0 - 1" }
  ],
  35: [
    { time: "62'", type: "goal", team: "away", player: "Jan Paul Van Hecke", secondaryPlayer: "Tijani Rejinders", description: "1 - 3" },
    { time: "54'", type: "goal", team: "home", player: "Hazem Mastouri", secondaryPlayer: "Hannibal Mejbri", description: "1 - 2" },
    { time: "7'", type: "goal", team: "away", player: "Brian Brobbey", secondaryPlayer: "Virgil van Dijk", description: "1 - 1" },
    { time: "3'", type: "goal", team: "home", player: "Ellyes Skhiri (GC)", description: "1 - 0" }
  ],
  36: [
    { time: "85'", type: "yellow", team: "away", player: "Viktor Gyokeres" },
    { time: "77'", type: "yellow", team: "home", player: "Shogo Taniguchi" },
    { time: "62'", type: "goal", team: "away", player: "Anthony Elanga", secondaryPlayer: "Viktor Gyokeres", description: "1 - 1" },
    { time: "56'", type: "goal", team: "home", player: "Daizen Maeda", secondaryPlayer: "Ritsu Doan", description: "1 - 0" },
    { time: "32'", type: "yellow", team: "away", player: "Isak Hien" }
  ],
 37: [
    { time: "75'", type: "yellow", team: "home", player: "Maxim De Cuyper" },
    { time: "67'", type: "goal", team: "home", player: "Mohamed Hany (GC)", description: "1 - 1" },
    { time: "34'", type: "yellow", team: "away", player: "Ahmed Fatouh" },
    { time: "20'", type: "goal", team: "away", player: "Emam Ashour", secondaryPlayer: "Mohamed Salah", description: "0 - 1" },
    { time: "14'", type: "yellow", team: "home", player: "Timothy Castagne" },
    { time: "13'", type: "yellow", team: "away", player: "Marwan Attia" }
  ],
  38: [
    { time: "89'", type: "yellow", team: "home", player: "Ehsan Hajsafi" },
    { time: "64'", type: "goal", team: "home", player: "Mohammad Mohebi", secondaryPlayer: "Ramin Rezaeian", description: "2 - 2" },
    { time: "54'", type: "goal", team: "away", player: "Elijah Just", secondaryPlayer: "Chris Wood", description: "1 - 2" },
    { time: "32'", type: "goal", team: "home", player: "Ramin Rezaeian", description: "1 - 1" },
    { time: "7'", type: "goal", team: "away", player: "Elijah Just", secondaryPlayer: "Chris Wood", description: "0 - 1" }
  ],
  39: [
    { time: "66'", type: "red", team: "home", player: "Nathan Ngoy" },
    { time: "33'", type: "yellow", team: "away", player: "Saeid Ezatolahi", },
    { time: "3'", type: "yellow", team: "home", player: "Romelu Lukaku"}
  ],
  40: [
    { time: "82'", type: "goal", team: "away", player: "Mahmoud Trezeguet", secondaryPlayer: "Mohamed Salah", description: "1 - 3" },
    { time: "67'", type: "goal", team: "away", player: "Mohamed Salah", secondaryPlayer: "Mostafa Zico", description: "1 - 2" },
    { time: "59'", type: "goal", team: "away", player: "Mostafa Zico", secondaryPlayer: "Mohamed Hany", description: "1 - 1" },
    { time: "34'", type: "yellow", team: "home", player: "Callum McCowatt" },
    { time: "20'", type: "yellow", team: "home", player: "Sarpreet Singh" },
    { time: "17'", type: "yellow", team: "away", player: "Mohanad Lasheen" },
    { time: "15'", type: "goal", team: "home", player: "Finn Surman", secondaryPlayer: "Tim Payne", description: "1 - 0" }
  ],
  41: [
    { time: "90'+4", type: "goal", team: "away", player: "Alexis Saelemaekers", secondaryPlayer: "Romelu Lukaku", description: "1 - 5" },
    { time: "86", type: "goal", team: "away", player: "Romelu Lukaku", secondaryPlayer: "Nicolas Raskin", description: "1 - 4" },
    { time: "84'", type: "goal", team: "home", player: "Elijah Just", description: "1 - 3" },
    { time: "66'", type: "goal", team: "away", player: "Kevin De Bruyne", description: "0 - 3"},
    { time: "56'", type: "yellow", team: "home", player: "Elijah Just" },
    { time: "50'", type: "goal", team: "away", player: "Leandro Trossard", secondaryPlayer: "Hans Vanaken", description: "0 - 2" },
    { time: "46'", type: "yellow", team: "home", player: "Marko Stamenic" },
    { time: "28'", type: "goal", team: "away", player: "Leandro Trossard", description: "0 - 1"}
  ],
  42: [
    { time: "90'+4", type: "yellow", team: "away", player: "Shoja Khalilzadeh" },
    { time: "90'+2", type: "yellow", team: "home", player: "Mohanad Lasheen" },
    { time: "79'", type: "yellow", team: "away", player: "Saeid Ezatolahi" },
    { time: "43'", type: "yellow", team: "away", player: "Ali Nemati" },
    { time: "42'", type: "yellow", team: "home", player: "Yasser Ibrahim" },
    { time: "20'", type: "yellow", team: "home", player: "Mahmoud Saber" },
    { time: "19'", type: "yellow", team: "away", player: "Hossein Kanaani" },
    { time: "14'", type: "goal", team: "away", player: "Ramin Rezaeian", description: "1 - 1" },
    { time: "5'", type: "goal", team: "home", player: "Mahmoud Saber", secondaryPlayer: "Mahmoud Trézéguet", description: "1 - 0" }
    
  ],
  43: [
    { time: "90'+33", type: "yellow", team: "home", player: "Pedri" },
    { time: "16'", type: "yellow", team: "away", player: "Sidny Lopes Cabral" }
  ],
  44: [
    { time: "80'", type: "goal", team: "away", player: "Maximiliano Araujo", description: "1 - 1" },
    { time: "44'", type: "yellow", team: "home", player: "Abdulaleh Al-Amri" },
    { time: "41'", type: "goal", team: "home", player: "Abdulaleh Al-Amri", description: "1 - 0" }
  ],
  45: [
    { time: "60'", type: "yellow", team: "away", player: "Mohamed Kanno" },
    { time: "49'", type: "goal", team: "home", player: "Hassan Tambakti (GC)", description: "4 - 0" },
    { time: "30'", type: "yellow", team: "away", player: "Salem Al-Dawsari", },
    { time: "24'", type: "goal", team: "home", player: "Mikel Oyarzabal", secondaryPlayer: "Dani Olmo",  description: "3 - 0" },
    { time: "21'", type: "goal", team: "home", player: "Mikel Oyarzabal", secondaryPlayer: "Aymeric Laporte",  description: "2 - 0" },
    { time: "10'", type: "goal", team: "home", player: "Lamine Yamal", secondaryPlayer: "Mikel Oyarzabal",  description: "1 - 0" }
  ],
  46: [
    { time: "90'+3", type: "yellow", team: "away", player: "Diney Borges" },
    { time: "61'", type: "goal", team: "away", player: "Hélio Varela", description: "2 - 2" },
    { time: "58", type: "yellow", team: "home", player: "Mathías Oliveira" },
    { time: "45'+6", type: "goal", team: "home", player: "Agustín Canobbio", secondaryPlayer: "Maximiliano Araújo", description: "2 - 1" },
    { time: "44'", type: "goal", team: "home", player: "Maximiliano Araújo", description: "1 - 1" },
    { time: "21'", type: "goal", team: "away", player: "Kevin Lenini", description: "0 - 1" },
    { time: "20'", type: "yellow", team: "home", player: "Rodrigo Bentancur" },
    { time: "5'", type: "yellow", team: "away", player: "Sidny Lopes Cabral" }
  ],
  47: [
    { time: "90'+5", type: "red", team: "home", player: "Agustín Canobbio"},
    { time: "90'+3", type: "yellow", team: "home", player: "Nicolás De La Cruz"},
    { time: "58'", type: "yellow", team: "home", player: "Guillermo Varela"},
    { time: "54'", type: "yellow", team: "home", player: "Juan Sanabria"},
    { time: "46'", type: "yellow", team: "away", player: "Alex Baena"},
    { time: "42'", type: "goal", team: "away", player: "Alex Baena", secondaryPlayer: "Marcos Llorente", description: "0 - 1" }
  ],
  48: [
    { time: "90'+3", type: "yellow", team: "away", player: "Firas Al-Buraikan" },
    { time: "67'", type: "yellow", team: "away", player: "Nasser Al-Dawsari" },
    { time: "9'", type: "yellow", team: "home", player: "Wagner Pina" },
    { time: "4'", type: "yellow", team: "away", player: "Saud Abdulhamid" }
  ],
  49: [
    { time: "90'+6", type: "goal", team: "home", player: "Kylian Mbappé", description: "3 - 1" },
    { time: "90'+5", type: "goal", team: "away", player: "Ibrahim Mbaye", secondaryPlayer: "Iliman Ndiaye", description: "2 - 1" },
    { time: "82'", type: "goal", team: "home", player: "Bradley Barcola", secondaryPlayer: "Adrien Rabiot", description: "2 - 0" },
    { time: "66'", type: "goal", team: "home", player: "Kylian Mbappé", secondaryPlayer: "Michael Olise", description: "1 - 0" }
  ],
  50: [
    { time: "90'+6", type: "goal", team: "away", player: "Aymen Hussein (GC)", description: "1 - 4" },
    { time: "86'", type: "yellow", team: "home", player: "Zaid Tahseen" },
    { time: "76'", type: "goal", team: "away", player: "Leo Ostigard", secondaryPlayer: "Martin Odegaard", description: "1 - 3" },
    { time: "43'", type: "goal", team: "away", player: "Erling Haaland", description: "1 - 2" },
    { time: "39'", type: "goal", team: "home", player: "Aymen Hussein", secondaryPlayer: "Amir Al-Ammari", description: "1 - 1" },
    { time: "29'", type: "goal", team: "away", player: "Erling Haaland", secondaryPlayer: "David Moller Wolffe", description: "0 - 1" }
  ],
  51: [
    { time: "66'", type: "goal", team: "home", player: "Ousmane Dembélé", secondaryPlayer: "Michael Olise", description: "3 - 0" },
    { time: "54'", type: "goal", team: "home", player: "Kylian Mbappé", secondaryPlayer: "Ousmane Dembélé", description: "2 - 0" },
    { time: "14'", type: "goal", team: "home", player: "Kylian Mbappé", secondaryPlayer: "Michael Olise", description: "1 - 0" },
    { time: "6'", type: "yellow", team: "away", player: "Amir Al-Ammari" }
  ],
  52: [
    { time: "90'+3", type: "goal", team: "away", player: "Ismaila Sarr", secondaryPlayer: "Nicolas Jackson", description: "3 - 2" },
    { time: "58'", type: "goal", team: "home", player: "Erling Haaland", secondaryPlayer: "Patrick Berg", description: "3 - 1" },
    { time: "53'", type: "goal", team: "away", player: "Ismaila Sarr", secondaryPlayer: "Sadio Mané", description: "2 - 1" },
    { time: "48'", type: "goal", team: "home", player: "Erling Haaland", secondaryPlayer: "Martin Odegaard", description: "2 - 0" },
    { time: "43'", type: "goal", team: "home", player: "Marcus Pedersen", description: "1 - 0" },
  ],
  53: [
    { time: "90'+4", type: "goal", team: "away", player: "Désiré Doué", secondaryPlayer: "Bradley Barcola", description: "1 - 4"},
    { time: "74'", type: "yellow", team: "away", player: "Aurélien Tchouaméni" },
    { time: "32'", type: "goal", team: "away", player: "Ousmane Dembélé", secondaryPlayer: "Aurélien Tchouaméni", description: "1 - 3" },
    { time: "21'", type: "goal", team: "home", player: "Thelo Aasgard", secondaryPlayer: "Andreas Schjelderup", description: "1 - 2" },
    { time: "20'", type: "goal", team: "away", player: "Ousmane Dembélé", secondaryPlayer: "Kylian Mbappé", description: "0 - 2" },
    { time: "10'", type: "yellow", team: "home", player: "Patrick Berg" },
    { time: "7'", type: "goal", team: "away", player: "Ousmane Dembélé", secondaryPlayer: "Kylian Mbappé", description: "0 - 1" },
  ],
  54: [
    { time: "90'", type: "yellow", team: "away", player: "Merchas Doski" },
    { time: "82'", type: "goal", team: "home", player: "Iliman Ndiaye", secondaryPlayer: "Pape Gueye", description: "5 - 0" },
    { time: "81'", type: "yellow", team: "home", player: "Pape Gueye" },
    { time: "76'", type: "yellow", team: "away", player: "Amir Al-Ammari" },
    { time: "72'", type: "goal", team: "home", player: "Pape Gueye", secondaryPlayer: "Iliman Ndiaye", description: "4 - 0" },
    { time: "59'", type: "goal", team: "home", player: "Pape Gueye", secondaryPlayer: "Ismaila Sarr", description: "3 - 0" },
    { time: "56'", type: "goal", team: "home", player: "Ismaila Sarr", secondaryPlayer: "Lamine Camara", description: "2 - 0" },
    { time: "17'", type: "yellow", team: "home", player: "Abdoulaye Seck" },
    { time: "13'", type: "red", team: "away", player: "Rebin Sulaka" },
    { time: "4'", type: "goal", team: "home", player: "Habib Diarra", secondaryPlayer: "Abdoulaye Seck", description: "1 - 0" }
  ],
  55: [
    { time: "76'", type: "goal", team: "home", player: "Lionel Messi", secondaryPlayer: "Nicolás González", description: "3 - 0" },
    { time: "60'", type: "goal", team: "home", player: "Lionel Messi", description: "2 - 0" },
    { time: "17'", type: "goal", team: "home", player: "Lionel Messi", secondaryPlayer: "Rodrigo De Paul", description: "1 - 0" }
  ],
  56: [
    { time: "90'+12", type: "goal", team: "home", player: "Marko Arnautovic (P)", description: "3 - 1" },
    { time: "77'", type: "yellow", team: "home", player: "Marcel Sabitzer" },
    { time: "76'", type: "goal", team: "home", player: "Yazan Al-Arab (GC)", description: "2 - 1" },
    { time: "50'", type: "goal", team: "away", player: "Ali Olwan", secondaryPlayer: "Noor Al-Rawabdeh", description: "1 - 1" },
    { time: "21'", type: "goal", team: "home", player: "Romano Schmid", secondaryPlayer: "Xaver Schlager", description: "1 - 0" }
  ],
  57: [
    { time: "90'+5", type: "goal", team: "home", player: "Lionel Messi", description: "2 - 0" },
    { time: "90'+2", type: "yellow", team: "home", player: "Leandro Paredes" },
    { time: "76'", type: "yellow", team: "away", player: "Konrad Laimer" },
    { time: "76'", type: "yellow", team: "home", player: "Facundo Medina" },
    { time: "41'", type: "yellow", team: "away", player: "Stefan Posch" },
    { time: "38'", type: "goal", team: "home", player: "Lionel Messi", secondaryPlayer: "Facundo Medina", description: "1 - 0" }
  ],
  58: [
    { time: "82'", type: "goal", team: "away", player: "Amine Gouiri", description: "1 - 2" },
    { time: "69'", type: "goal", team: "away", player: "Ahmed Nadhir Benbouali", secondaryPlayer: "Riyad Mahrez", description: "1 - 1" },
    { time: "64'", type: "yellow", team: "home", player: "Husam Al Mohammad Abudahb" },
    { time: "44'", type: "yellow", team: "away", player: "Ramiz Zerrouki" },
    { time: "36'", type: "goal", team: "home", player: "Nizar Al-Rashdan", secondaryPlayer: "Mousa Tamari", description: "1 - 0" }
  ],
  59: [
    { time: "90'+6", type: "goal", team: "away", player: "Sasa Kalajdzic", secondaryPlayer: "Michael Gregoritsch", description: "3 - 3" },
    { time: "90'+3", type: "goal", team: "home", player: "Riyad Mahrez", secondaryPlayer: "Houssem Aouar", description: "3 - 2" },
    { time: "60'", type: "goal", team: "home", player: "Riyad Mahrez", secondaryPlayer: "Houssem Aouar", description: "2 - 2" },
    { time: "55'", type: "goal", team: "away", player: "Marcel Sabitzer", secondaryPlayer: "Konrad Laimer", description: "1 - 2" },
    { time: "45'", type: "goal", team: "home", player: "Rafik Belghali", description: "1 - 1"},
    { time: "28'", type: "goal", team: "away", player: "Marko Arnautovic", secondaryPlayer: "David Alaba", description: "0 - 1" },
    { time: "11'", type: "yellow", team: "away", player: "Marko Arnautovic" }
  ],
  60: [
    { time: "90'+4", type: "yellow", team: "home", player: "Mohammad Abu Zrayq" },
    { time: "80'", type: "goal", team: "away", player: "Lionel Messi", description: "1 - 3" },
    { time: "64'", type: "yellow", team: "home", player: "Yazan Al-Arab"},
    { time: "55'", type: "goal", team: "home", player: "Mousa Tamari", secondaryPlayer: "Ehsan Haddad", description: "1 - 2"},
    { time: "31'", type: "goal", team: "away", player: "Lautaro Martínez (P)", description: "0 - 2" },
    { time: "19'", type: "goal", team: "away", player: "Giovanni Lo Celso", description: "0 - 1" },
    { time: "17'", type: "yellow", team: "home", player: "Mohannad Abu Taha" }
  ],
  61: [
    { time: "90'+2", type: "yellow", team: "home", player: "Tomás Araújo" },
    { time: "88'", type: "yellow", team: "home", player: "Nelson Semedo" },
    { time: "45'+5", type: "goal", team: "away", player: "Yoane Wissa", secondaryPlayer: "Arthur Masuaku", description: "1 - 1" },
    { time: "32'", type: "yellow", team: "away", player: "Chancel Mbemba" },
    { time: "13'", type: "yellow", team: "home", player: "Bernardo Silva" },
    { time: "6'", type: "goal", team: "home", player: "João Neves", secondaryPlayer: "Pedro Neto", description: "1 - 0" }
  ],
  62: [
    { time: "90'+9", type: "goal", team: "away", player: "Jaminton Campaz", secondaryPlayer: "Cucho Hernández", description: "1 - 3" },
    { time: "65'", type: "goal", team: "away", player: "Luis Diaz", secondaryPlayer: "Gustavo Puerta", description: "1 - 2" },
    { time: "60'", type: "goal", team: "home", player: "Abbosbek Fayzullaev", description: "1 - 1" },
    { time: "40'", type: "goal", team: "away", player: "Daniel Muñoz", secondaryPlayer: "Luis Diaz", description: "0 - 1" },
    { time: "34'", type: "yellow", team: "home", player: "Abdukodir Khusanov" },
    { time: "7'", type: "yellow", team: "away", player: "Johan Mojica" }
  ],
  63: [
    { time: "87'", type: "goal", team: "home", player: "Rafael Leão", description: "5 - 0" },
    { time: "68'", type: "yellow", team: "home", player: "Renato Veiga" },
    { time: "60'", type: "goal", team: "home", player: "Abduvokhid Nematov (GC)", description: "4 - 0" },
    { time: "39'", type: "goal", team: "home", player: "Cristiano Ronaldo", secondaryPlayer: "Bruno Fernandes", description: "3 - 0" },
    { time: "17'", type: "goal", team: "home", player: "Nuno Mendes", description: "2 - 0" },
    { time: "14'", type: "yellow", team: "away", player: "Odijon Khamrobekov" },
    { time: "6'", type: "goal", team: "home", player: "Cristiano Ronaldo", secondaryPlayer: "João Cancelo", description: "1 - 0" }
  ],
  64: [
    { time: "90'+4", type: "yellow", team: "home", player: "Jefferson Lerma" },
    { time: "90'+3", type: "yellow", team: "away", player: "Charles Pickel" },
    { time: "76'", type: "goal", team: "home", player: "Daniel Muñoz", secondaryPlayer: "Juan Quintero", description: "1 - 0" },
    { time: "56'", type: "yellow", team: "home", player: "Jhon Lucumi" }
  ],
  65: [
    { time: "86'", type: "yellow", team: "home", player: "Gustavo Puerta" }
  ],
  66: [
    { time: "90'+1", type: "goal", team: "home", player: "Yoane Wissa", secondaryPlayer: "Meshack Elanga", description: "3 - 1" },
    { time: "78'", type: "goal", team: "home", player: "Fiston Mayele", description: "2 - 1" },
    { time: "68'", type: "goal", team: "home", player: "Yoane Wissa", description: "1 - 1" },
    { time: "62'", type: "yellow", team: "home", player: "Samuel Moutoussamy" },
    { time: "48'", type: "yellow", team: "away", player: "Sherzod Nasrulloev" },
    { time: "45'+5'", type: "yellow", team: "home", player: "Nathanael Mbuku" },
    { time: "43'", type: "yellow", team: "away", player: "Abdukodir Khusanov" },
    { time: "21'", type: "yellow", team: "home", player: "Noah Sadiki" },
    { time: "10'", type: "goal", team: "away", player: "Eldor Shomurodov", secondaryPlayer: "Akmal Mozgovoy", description: "0 - 1" }
  ],
  67: [
    { time: "85'", type: "goal", team: "home", player: "Marcus Rashford", secondaryPlayer: "Bukayo Saka", description: "4 - 2" },
    { time: "47'", type: "goal", team: "home", player: "Jude Bellingham", secondaryPlayer: "Elliot Anderson", description: "3 - 2" },
    { time: "45'+5", type: "goal", team: "away", player: "Petar Musa", secondaryPlayer: "Ivan Perisic", description: "2 - 2" },
    { time: "42'", type: "goal", team: "home", player: "Harry Kane", secondaryPlayer: "Declan Rice", description: "2 - 1" },
    { time: "36'", type: "goal", team: "away", player: "Martin Baturina", secondaryPlayer: "Petar Sucic", description: "1 - 1" },
    { time: "12'", type: "goal", team: "home", player: "Harry Kane (P)", description: "1 - 0" }
  ],
  68: [
    { time: "90'+9", type: "yellow", team: "away", player: "Carlos Harvey" },
    { time: "90'+5", type: "goal", team: "home", player: "Caleb Yirenkyi", description: "1 - 0" },
    { time: "72'", type: "yellow", team: "away", player: "César Blackman" },
    { time: "16'", type: "yellow", team: "home", player: "Caleb Yirenkyi" }
  ],
  69: [
    { time: "60'", type: "yellow", team: "away", player: "Iñaki Williams" },
    { time: "41'", type: "yellow", team: "home", player: "Declan Rice" }
  ],
  70: [
    { time: "90'+2", type: "yellow", team: "away", player: "Petar Sucic" },
    { time: "61'", type: "yellow", team: "home", player: "Yoel Barcenas" },
    { time: "54'", type: "goal", team: "away", player: "Ante Budimir", secondaryPlayer: "Josip Stanisic", description: "0 - 1" }
  ],
  71: [
    { time: "84'", type: "yellow", team: "home", player: "Andrés Andrade" },
    { time: "67'", type: "goal", team: "away", player: "Harry Kane", secondaryPlayer: "Jude Bellingham", description: "0 - 2" },
    { time: "62'", type: "goal", team: "away", player: "Jude Bellingham", secondaryPlayer: "Bukayo Saka", description: "0 - 1" },
    { time: "60'", type: "yellow", team: "away", player: "Jarell Quansah" },
    { time: "53'", type: "yellow", team: "home", player: "José Fajardo" }
  ],
  72: [
    { time: "90'+4", type: "yellow", team: "away", player: "Kojo Peprah Oppong" },
    { time: "83'", type: "goal", team: "home", player: "Nikola Vlasic", secondaryPlayer: "Luka Modric", description: "2 - 1" },
    { time: "73'", type: "goal", team: "away", player: "Derrick Luckassen", secondaryPlayer: "Ernest Nuamah", description: "1 - 1" },
    { time: "68'", type: "yellow", team: "home", player: "Ivan Perisic" },
    { time: "31'", type: "goal", team: "home", player: "Petar Sucic", secondaryPlayer: "Mateo Kovacic", description: "1 - 0" }
  ],
  'R32-1': [
    { time: "90'+2", type: "goal", team: "away", player: "Stephen Eustáquio", description: "0 - 1" },
    { time: "67'", type: "yellow", team: "away", player: "Niko Sigur" },
    { time: "54'", type: "yellow", team: "away", player: "Nathan-Dylan Saliba" }
  ],
  'R32-2': [
    { time: "90'+5", type: "goal", team: "home", player: "Gabriel Martinelli", secondaryPlayer: "Bruno Guimarães", description: "2 - 1" },
    { time: "84'", type: "yellow", team: "away", player: "Junnosuke Suzuki" },
    { time: "56'", type: "goal", team: "home", player: "Casemiro", secondaryPlayer: "Gabriel Magalhães", description: "1 - 1" },
    { time: "48'", type: "yellow", team: "home", player: "Danilo", },
    { time: "45'", type: "yellow", team: "away", player: "Daichi Kamada" },
    { time: "29'", type: "goal", team: "away", player: "Kaishu Sano", description: "0 - 1" },
    { time: "14'", type: "yellow", team: "home", player: "Casemiro" },
    { time: "12'", type: "yellow", team: "away", player: "Kaishu Sano" }    
  ]
}
// force hmr