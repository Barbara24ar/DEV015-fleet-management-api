import { Request, Response } from 'express';
import { findTrajectoriesByTaxiAndDate, findLatestTaxiLocations } from '../repositories/trajectoryRepository';
import { getLatestTrajectories } from '../services/trajectoryService';

// Controlador para obtener trayectorias por taxiId y fecha
export const getTrajectoriesByTaxiAndDate = async (req: Request, res: Response) => {
  const taxiId = req.query.taxiId as string;
  const date = req.query.date as string;

  // Validación de parámetros
  if (!taxiId || !date) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos: taxiId o date' });
  }

  // Validar formato de la fecha
  const isValidDate = !isNaN(Date.parse(date));
  if (!isValidDate) {
    return res.status(400).json({ error: 'Formato de fecha inválido' });
  }

  try {
    const trajectories = await findTrajectoriesByTaxiAndDate(taxiId, date);

    // Manejar el caso de taxi no encontrado o sin trayectorias
    if (!trajectories || trajectories.length === 0) {
      return res.status(404).json({ error: 'Taxi no encontrado o sin trayectorias para la fecha dada' });
    }

    res.json(trajectories);
  } catch (error) {
    console.error('Error al obtener trayectorias:', error);
    res.status(500).json({ error: 'Error al obtener trayectorias' });
  }
};

//Controlador para obtener la última ubicación de cada taxi
export const getLatestTaxiLocations = async (req: Request, res: Response) => {
  try {
    const latestLocations = await getLatestTrajectories();

    // Manejar el caso si no se encuentran taxis o ubicaciones
    if (!latestLocations || latestLocations.length === 0) {
      return res.status(404).json({ error: 'No se encontraron ubicaciones recientes para los taxis' });
    }

    res.json(latestLocations);
  } catch (error) {
    console.error('Error al obtener la última ubicación de los taxis:', error);
    res.status(500).json({ error: 'Error al obtener la última ubicación de los taxis' });
  }
};
