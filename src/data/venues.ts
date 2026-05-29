import type { Venue } from '../types'

export const venues: Venue[] = [
  { id: 'azteca', name: 'Estádio Azteca', city: 'Cidade do México', state: 'CDMX', country: 'México', capacity: 83000, imageUrl: '/venues/azteca.jpg?v=4' },
  { id: 'akron', name: 'Estádio Akron', city: 'Guadalajara', state: 'Jalisco', country: 'México', capacity: 48000, imageUrl: '/venues/akron.jpg?v=4' },
  { id: 'bbva', name: 'Estádio BBVA', city: 'Monterrey', state: 'Nuevo León', country: 'México', capacity: 53500, imageUrl: '/venues/bbva.jpg?v=4' },
  { id: 'bmo', name: 'BMO Field', city: 'Toronto', state: 'Ontário', country: 'Canadá', capacity: 45000, imageUrl: '/venues/bmo.jpg?v=4' },
  { id: 'bcplace', name: 'BC Place', city: 'Vancouver', state: 'Colúmbia Britânica', country: 'Canadá', capacity: 54000, imageUrl: '/venues/bcplace.jpg?v=4' },
  { id: 'metlife', name: 'MetLife Stadium', city: 'Nova York', state: 'Nova Jersey', country: 'EUA', capacity: 82500, imageUrl: '/venues/metlife.jpg?v=4' },
  { id: 'sofi', name: 'SoFi Stadium', city: 'Los Angeles', state: 'Califórnia', country: 'EUA', capacity: 70000, imageUrl: '/venues/sofi.jpg?v=4' },
  { id: 'gillette', name: 'Gillette Stadium', city: 'Boston', state: 'Massachusetts', country: 'EUA', capacity: 65878, imageUrl: '/venues/gillette.jpg?v=4' },
  { id: 'mercedesbenz', name: 'Mercedes-Benz Stadium', city: 'Atlanta', state: 'Geórgia', country: 'EUA', capacity: 71000, imageUrl: '/venues/mercedesbenz.jpg?v=4' },
  { id: 'hardrock', name: 'Hard Rock Stadium', city: 'Miami', state: 'Flórida', country: 'EUA', capacity: 64767, imageUrl: '/venues/hardrock.jpg?v=4' },
  { id: 'att', name: 'AT&T Stadium', city: 'Dallas', state: 'Texas', country: 'EUA', capacity: 80000, imageUrl: '/venues/att.jpg?v=4' },
  { id: 'nrg', name: 'NRG Stadium', city: 'Houston', state: 'Texas', country: 'EUA', capacity: 72220, imageUrl: '/venues/nrg.jpg?v=4' },
  { id: 'lincoln', name: 'Lincoln Financial Field', city: 'Filadélfia', state: 'Pensilvânia', country: 'EUA', capacity: 69796, imageUrl: '/venues/lincoln.jpg?v=4' },
  { id: 'levis', name: "Levi's Stadium", city: 'Santa Clara', state: 'Califórnia', country: 'EUA', capacity: 68500, imageUrl: '/venues/levis.jpg?v=4' },
  { id: 'lumen', name: 'Lumen Field', city: 'Seattle', state: 'Washington', country: 'EUA', capacity: 69000, imageUrl: '/venues/lumen.jpg?v=4' },
  { id: 'geha', name: 'Arrowhead Stadium', city: 'Kansas City', state: 'Missouri', country: 'EUA', capacity: 76416, imageUrl: '/venues/geha.jpg?v=4' },
]

export const venuesById: Record<string, Venue> = Object.fromEntries(
  venues.map(v => [v.id, v])
)
