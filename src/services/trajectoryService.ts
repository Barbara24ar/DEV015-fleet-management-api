// Manejo de datos antes de pasarlo al repositorio o controladores
// Aquí se implementa la lógica de negocio. En este caso, se gestiona la paginación y la obtención de taxis con filtro.

import { findTrajectoriesByTaxiAndDate, findLatestTaxiLocations } from '../repositories/trajectoryRepository';

// Servicio para obtener la última ubicación de cada taxi
export const getLatestTrajectories = async () => {
  return await findLatestTaxiLocations();
};

// Lógica de negocio para obtener trayectorias por taxiId y fecha
export const getTrajectoriesByTaxiAndDate = async (taxiId: string, date: string) => {
  // Llama al método del repositorio que busca trayectorias por taxiId y fecha
  return await findTrajectoriesByTaxiAndDate(taxiId, date);
};
