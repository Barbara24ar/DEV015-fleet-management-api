"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//conectarán las rutas con los controladores
const express_1 = __importDefault(require("express"));
const trajectoryController_1 = require("../controllers/trajectoryController");
const router = express_1.default.Router();
// Ruta para obtener trayectorias por taxiId y fecha con req.query
router.get('/trajectories', trajectoryController_1.getTrajectoriesByTaxiAndDate);
// Ruta para obtener la última ubicación de los taxis
router.get('/trajectories/latest', trajectoryController_1.getLatestTaxiLocations);
exports.default = router;
//Ruta: /trajectories/:taxiId/:date define la ruta para obtener las trayectorias de un taxi por ID y fecha. Los parámetros taxiId y date se pasan directamente en la URL.
//Controlador: El método del controlador getTrajectoriesByTaxiAndDate es llamado cuando la ruta es solicitada.
