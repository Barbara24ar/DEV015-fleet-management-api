import { Request, Response } from 'express';
import { findTrajectoriesByTaxiAndDate } from '../repositories/trajectoryRepository';

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
