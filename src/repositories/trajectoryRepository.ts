//realizarán consultas a la base de datos mediante Prisma
//Este archivo contendrá la lógica de la base de datos para consultar trayectorias por taxiId y date

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findTrajectoriesByTaxiAndDate = async (taxiId: string, date: string) => {
  const startDate = new Date(date);
  const endDate = new Date(date);

  // Establecer el rango de fechas (inicio y fin del día)
  endDate.setDate(startDate.getDate() + 1); // Sumar 1 día
  endDate.setMilliseconds(endDate.getMilliseconds() - 1); // Restar 1 milisegundo para obtener 23:59:59.999

  const trajectories = await prisma.trajectories.findMany({
    where: {
      taxi_id: parseInt(taxiId),  // Conversión de taxiId a entero
      date: {
        gte: startDate,  // Filtra desde el inicio del día
        lte: endDate,  // Hasta el final del día
      },
    },
    select: {
      id: true,
      taxi_id: true,
      date: true,
      latitude: true,
      longitude: true,
    },
  });

  // Renombrar el campo 'taxi_id' a 'taxiId' en los resultados
  const renamedTrajectories = trajectories.map(trajectory => ({
    id: trajectory.id,
    taxiId: trajectory.taxi_id,  // Renombrar 'taxi_id' a 'taxiId'
    date: trajectory.date,
    latitude: trajectory.latitude,
    longitude: trajectory.longitude,
  }));

  return renamedTrajectories;
};

//startDate: Es la fecha que representa el inicio del día (00:00:00)
//endDate: Se ajusta para representar el final del día (23:59:59.999), sumando un día a startDate y restando 1 milisegundo.
//Filtrado de fechas:
//gte (greater than or equal): asegura que se incluyan trayectorias desde el inicio del día.
//lte (less than or equal): asegura que se incluyan trayectorias hasta el final del día.
