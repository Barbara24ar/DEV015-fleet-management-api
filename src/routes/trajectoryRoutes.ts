//conectarán las rutas con los controladores

import express from 'express';
import { getTrajectoriesByTaxiAndDate } from '../controllers/trajectoryController';

const router = express.Router();

// Definir la ruta para obtener las trayectorias por taxiId y fecha
router.get('/trajectories/:taxiId/:date', getTrajectoriesByTaxiAndDate);

export default router;



//Ruta: /trajectories/:taxiId/:date define la ruta para obtener las trayectorias de un taxi por ID y fecha. Los parámetros taxiId y date se pasan directamente en la URL.
//Controlador: El método del controlador getTrajectoriesByTaxiAndDate es llamado cuando la ruta es solicitada.
