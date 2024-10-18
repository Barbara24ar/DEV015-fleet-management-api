"use strict";
// Manejo de datos antes de pasarlo al repositorio o controladores
// Aquí se implementa la lógica de negocio. En este caso, se gestiona la paginación y la obtención de taxis con filtro.
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
exports.getTrajectoriesByTaxiAndDate = exports.getLatestTrajectories = void 0;
const client_1 = require("@prisma/client");
const trajectoryRepository_1 = require("../repositories/trajectoryRepository");
const prisma = new client_1.PrismaClient();
// Servicio para obtener la última ubicación de cada taxi
const getLatestTrajectories = () => __awaiter(void 0, void 0, void 0, function* () {
    const latestLocations = yield (0, trajectoryRepository_1.findLatestTaxiLocations)();
    // Mapeo para ajustar los resultados
    const renamedLocations = yield Promise.all(latestLocations.map((location) => __awaiter(void 0, void 0, void 0, function* () {
        const lastLocation = yield prisma.trajectories.findFirst({
            where: {
                taxi_id: location.taxi_id,
                date: location._max.date, // Busca la fecha máxima
            },
            select: {
                id: true,
                taxi_id: true,
                date: true,
                latitude: true,
                longitude: true,
            },
        });
        const taxi = yield prisma.taxis.findUnique({
            where: {
                id: lastLocation ? lastLocation.taxi_id : 0, // Usa el taxi_id para buscar el taxi
            },
            select: {
                plate: true, // Obtén solo el atributo plate
            },
        });
        return {
            id: lastLocation === null || lastLocation === void 0 ? void 0 : lastLocation.id,
            taxiId: lastLocation === null || lastLocation === void 0 ? void 0 : lastLocation.taxi_id,
            timestamp: lastLocation === null || lastLocation === void 0 ? void 0 : lastLocation.date,
            latitude: lastLocation === null || lastLocation === void 0 ? void 0 : lastLocation.latitude,
            longitude: lastLocation === null || lastLocation === void 0 ? void 0 : lastLocation.longitude,
            plate: taxi === null || taxi === void 0 ? void 0 : taxi.plate,
        };
    })));
    return renamedLocations;
});
exports.getLatestTrajectories = getLatestTrajectories;
// Lógica de negocio para obtener trayectorias por taxiId y fecha
const getTrajectoriesByTaxiAndDate = (taxiId, date) => __awaiter(void 0, void 0, void 0, function* () {
    // Llama al método del repositorio que busca trayectorias por taxiId y fecha
    return yield (0, trajectoryRepository_1.findTrajectoriesByTaxiAndDate)(taxiId, date);
});
exports.getTrajectoriesByTaxiAndDate = getTrajectoriesByTaxiAndDate;
