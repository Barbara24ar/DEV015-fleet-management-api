"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrajectoriesByTaxiAndDate = void 0;
// Importar el repositorio donde está la función para obtener las trayectorias
const trajectoryRepository_1 = require("../repositories/trajectoryRepository");
// Controlador para obtener las trayectorias de un taxi dado su ID y una fecha
const getTrajectoriesByTaxiAndDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taxiId = req.query.taxiId;
    const date = req.query.date;
    try {
        // Llamar a la función del repositorio para obtener las trayectorias filtradas
        const trajectories = yield (0, trajectoryRepository_1.findTrajectoriesByTaxiAndDate)(taxiId, date);
        // Enviar la respuesta con las trayectorias encontradas
        res.json(trajectories);
    }
    catch (error) {
        console.error('Error al obtener trayectorias:', error);
        res.status(500).json({ error: 'Error al obtener trayectorias' });
    }
});
exports.getTrajectoriesByTaxiAndDate = getTrajectoriesByTaxiAndDate;
