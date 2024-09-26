import { Request, Response } from 'express';
// Importar el repositorio donde está la función para obtener las trayectorias
import { findTrajectoriesByTaxiAndDate } from '../repositories/trajectoryRepository';

// Controlador para obtener las trayectorias de un taxi dado su ID y una fecha
export const getTrajectoriesByTaxiAndDate = async (req: Request, res: Response) => {
  const taxiId = req.query.taxiId as string;
  const date = req.query.date as string;

  try {
    // Llamar a la función del repositorio para obtener las trayectorias filtradas
    const trajectories = await findTrajectoriesByTaxiAndDate(taxiId, date);

    // Enviar la respuesta con las trayectorias encontradas
    res.json(trajectories);
  } catch (error) {
    console.error('Error al obtener trayectorias:', error);
    res.status(500).json({ error: 'Error al obtener trayectorias' });
  }
};
