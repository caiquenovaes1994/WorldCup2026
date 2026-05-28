import type { Venue } from '../types'

export const venues: Venue[] = [
  { id: 'azteca', name: 'Estádio Azteca', city: 'Cidade do México', country: 'México' },
  { id: 'akron', name: 'Estádio Akron', city: 'Guadalajara', country: 'México' },
  { id: 'bbva', name: 'Estádio BBVA', city: 'Monterrey', country: 'México' },
  { id: 'bmo', name: 'BMO Field', city: 'Toronto', country: 'Canadá' },
  { id: 'bcplace', name: 'BC Place', city: 'Vancouver', country: 'Canadá' },
  { id: 'metlife', name: 'MetLife Stadium', city: 'Nova York/NJ', country: 'EUA' },
  { id: 'sofi', name: 'SoFi Stadium', city: 'Los Angeles', country: 'EUA' },
  { id: 'gillette', name: 'Gillette Stadium', city: 'Boston', country: 'EUA' },
  { id: 'mercedesbenz', name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'EUA' },
  { id: 'hardrock', name: 'Hard Rock Stadium', city: 'Miami', country: 'EUA' },
  { id: 'att', name: 'AT&T Stadium', city: 'Dallas', country: 'EUA' },
  { id: 'nrg', name: 'NRG Stadium', city: 'Houston', country: 'EUA' },
  { id: 'lincoln', name: 'Lincoln Financial Field', city: 'Filadélfia', country: 'EUA' },
  { id: 'levis', name: "Levi's Stadium", city: 'Santa Clara', country: 'EUA' },
  { id: 'lumen', name: 'Lumen Field', city: 'Seattle', country: 'EUA' },
  { id: 'geha', name: 'GEHA Field at Arrowhead', city: 'Kansas City', country: 'EUA' },
]

export const venuesById: Record<string, Venue> = Object.fromEntries(
  venues.map(v => [v.id, v])
)
