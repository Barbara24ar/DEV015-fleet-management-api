// Manejo de datos antes de pasarlo al repositorio o controladores
// Aquí se implementa la lógica de negocio. En este caso, se gestiona la paginación y la obtención de taxis con filtro.

import { PrismaClient } from '@prisma/client';
import { findTrajectoriesByTaxiAndDate, findLatestTaxiLocations } from '../repositories/trajectoryRepository';

const prisma = new PrismaClient();

// Servicio para obtener la última ubicación de cada taxi
export const getLatestTrajectories = async () => {
   const latestLocations = await findLatestTaxiLocations();

// Mapeo para ajustar los resultados
   const renamedLocations = await Promise.all(
     latestLocations.map(async (location) => {
       const lastLocation = await prisma.trajectories.findFirst({
         where: {
           taxi_id: location.taxi_id,
           date: location._max.date,  // Busca la fecha máxima
         },
         select: {
            id: true,
           taxi_id: true,
           date: true,
           latitude: true,
           longitude: true,
         },
       });

       const taxi = await prisma.taxis.findUnique({
        where: {
          id: lastLocation ? lastLocation.taxi_id : 0,  // Usa el taxi_id para buscar el taxi
        },
        select: {
          plate: true,  // Obtén solo el atributo plate
        },
      });

       return {
        id: lastLocation?.id,
         taxiId: lastLocation?.taxi_id,
         timestamp: lastLocation?.date,
         latitude: lastLocation?.latitude,
         longitude: lastLocation?.longitude,
         plate: taxi?.plate,
       };
     })
   );

   return renamedLocations;
};

// Lógica de negocio para obtener trayectorias por taxiId y fecha
export const getTrajectoriesByTaxiAndDate = async (taxiId: string, date: string) => {
  // Llama al método del repositorio que busca trayectorias por taxiId y fecha
  return await findTrajectoriesByTaxiAndDate(taxiId, date);
};
