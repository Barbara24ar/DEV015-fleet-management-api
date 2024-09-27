//manejo de datos antes de pasarlo al repositorio o controladores
//Aquí se implementa la lógica de negocio. En este caso, se gestiona la paginación y la obtención de taxis con filtro.

import { findTrajectoriesByTaxiAndDate } from '../repositories/trajectoryRepository'; 

// Lógica de negocio para obtener trayectorias por taxiId y fecha
export const getTrajectoriesByTaxiAndDate = async (taxiId: string, date: string) => {
  // Llama al método del repositorio que busca trayectorias por taxiId y fecha
  return await findTrajectoriesByTaxiAndDate(taxiId, date);
};


