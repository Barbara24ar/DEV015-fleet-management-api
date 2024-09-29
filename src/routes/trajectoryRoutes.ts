//conectarán las rutas con los controladores
import express from 'express';
import { getLatestTaxiLocations, getTrajectoriesByTaxiAndDate } from '../controllers/trajectoryController';

const router = express.Router();

// Ruta para obtener trayectorias por taxiId y fecha con req.query
router.get('/trajectories', getTrajectoriesByTaxiAndDate);

// Ruta para obtener la última ubicación de los taxis
router.get('/trajectories/latest', getLatestTaxiLocations);

export default router;

//Ruta: /trajectories/:taxiId/:date define la ruta para obtener las trayectorias de un taxi por ID y fecha. Los parámetros taxiId y date se pasan directamente en la URL.
//Controlador: El método del controlador getTrajectoriesByTaxiAndDate es llamado cuando la ruta es solicitada.
