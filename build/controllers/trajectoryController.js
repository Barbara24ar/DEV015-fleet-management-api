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
const trajectoryRepository_1 = require("../repositories/trajectoryRepository");
const getTrajectoriesByTaxiAndDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taxiId = req.query.taxiId;
    const date = req.query.date;
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
        const trajectories = yield (0, trajectoryRepository_1.findTrajectoriesByTaxiAndDate)(taxiId, date);
        // Manejar el caso de taxi no encontrado o sin trayectorias
        if (!trajectories || trajectories.length === 0) {
            return res.status(404).json({ error: 'Taxi no encontrado o sin trayectorias para la fecha dada' });
        }
        res.json(trajectories);
    }
    catch (error) {
        console.error('Error al obtener trayectorias:', error);
        res.status(500).json({ error: 'Error al obtener trayectorias' });
    }
});
exports.getTrajectoriesByTaxiAndDate = getTrajectoriesByTaxiAndDate;
