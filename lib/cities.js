export const CITIES = [
  { id: 'delhi', name: 'Delhi', state: 'Delhi', x: 28.61, y: 77.21, gridX: 55, gridY: 30 },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', x: 26.91, y: 75.78, gridX: 42, gridY: 38 },
  { id: 'agra', name: 'Agra', state: 'Uttar Pradesh', x: 27.18, y: 78.01, gridX: 52, gridY: 42 },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', x: 26.85, y: 80.95, gridX: 72, gridY: 34 },
  { id: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh', x: 26.45, y: 80.33, gridX: 66, gridY: 40 },
  { id: 'gurugram', name: 'Gurugram', state: 'Haryana', x: 28.46, y: 77.04, gridX: 53, gridY: 32 },
  { id: 'noida', name: 'Noida', state: 'Uttar Pradesh', x: 28.54, y: 77.39, gridX: 57, gridY: 30 },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', x: 19.08, y: 72.88, gridX: 20, gridY: 72 },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', x: 18.52, y: 73.85, gridX: 24, gridY: 78 },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', x: 23.02, y: 72.57, gridX: 18, gridY: 52 },
];

export const CITY_MAP = CITIES.reduce((acc, c) => {
  acc[c.id] = c;
  return acc;
}, {});

export function getCity(id) {
  return CITY_MAP[id] || CITIES[0];
}

export function getCityName(id) {
  return getCity(id)?.name || id;
}

export const CORRIDORS = [
  { from: 'delhi', to: 'jaipur', distanceKm: 281, demandLevel: 'high', emptyCapacity: 42 },
  { from: 'delhi', to: 'mumbai', distanceKm: 1418, demandLevel: 'high', emptyCapacity: 68 },
  { from: 'delhi', to: 'agra', distanceKm: 231, demandLevel: 'medium', emptyCapacity: 28 },
  { from: 'delhi', to: 'lucknow', distanceKm: 557, demandLevel: 'medium', emptyCapacity: 35 },
  { from: 'jaipur', to: 'ahmedabad', distanceKm: 676, demandLevel: 'medium', emptyCapacity: 31 },
  { from: 'mumbai', to: 'pune', distanceKm: 148, demandLevel: 'high', emptyCapacity: 22 },
  { from: 'mumbai', to: 'ahmedabad', distanceKm: 525, demandLevel: 'high', emptyCapacity: 45 },
  { from: 'kanpur', to: 'delhi', distanceKm: 480, demandLevel: 'medium', emptyCapacity: 29 },
  { from: 'lucknow', to: 'kanpur', distanceKm: 82, demandLevel: 'low', emptyCapacity: 15 },
  { from: 'gurugram', to: 'jaipur', distanceKm: 235, demandLevel: 'medium', emptyCapacity: 26 },
  { from: 'noida', to: 'agra', distanceKm: 180, demandLevel: 'low', emptyCapacity: 18 },
  { from: 'pune', to: 'mumbai', distanceKm: 148, demandLevel: 'high', emptyCapacity: 38 },
  { from: 'ahmedabad', to: 'mumbai', distanceKm: 525, demandLevel: 'high', emptyCapacity: 52 },
  { from: 'agra', to: 'delhi', distanceKm: 231, demandLevel: 'medium', emptyCapacity: 24 },
];
