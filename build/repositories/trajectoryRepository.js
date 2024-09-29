"use strict";
// Realizarán consultas a la base de datos mediante Prisma
// Este archivo contendrá la lógica de la base de datos para consultar trayectorias por taxiId y date
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
exports.findLatestTaxiLocations = exports.findTrajectoriesByTaxiAndDate = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Consulta trayectorias por taxiId y fecha
const findTrajectoriesByTaxiAndDate = (taxiId, date) => __awaiter(void 0, void 0, void 0, function* () {
    const startDate = new Date(date);
    const endDate = new Date(date);
    // Establecer el rango de fechas (inicio y fin del día)
    endDate.setDate(startDate.getDate() + 1); // Sumar 1 día
    endDate.setMilliseconds(endDate.getMilliseconds() - 1); // Restar 1 milisegundo para obtener 23:59:59.999
    const trajectories = yield prisma.trajectories.findMany({
        where: {
            taxi_id: parseInt(taxiId), // Conversión de taxiId a entero
            date: {
                gte: startDate, // Filtra desde el inicio del día
                lte: endDate, // Hasta el final del día
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
        taxiId: trajectory.taxi_id, // Renombrar 'taxi_id' a 'taxiId'
        date: trajectory.date,
        latitude: trajectory.latitude,
        longitude: trajectory.longitude,
    }));
    return renamedTrajectories;
});
exports.findTrajectoriesByTaxiAndDate = findTrajectoriesByTaxiAndDate;
// Función para obtener la última ubicación de cada taxi
const findLatestTaxiLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    const latestLocations = yield prisma.trajectories.groupBy({
        by: ['taxi_id'], // Agrupa por 'taxi_id'
        _max: {
            date: true, // Obtiene la fecha máxima para cada 'taxi_id'
        },
        where: {
            date: {
                not: null, // Asegura que el campo 'date' no sea null
            },
        },
        orderBy: {
            _max: {
                date: 'desc',
            },
        },
    });
    // Mapeo para ajustar los resultados
    const renamedLocations = yield Promise.all(latestLocations.map((location) => __awaiter(void 0, void 0, void 0, function* () {
        const lastLocation = yield prisma.trajectories.findFirst({
            where: {
                taxi_id: location.taxi_id,
                date: location._max.date, // Busca la fecha máxima
            },
            select: {
                taxi_id: true,
                date: true,
                latitude: true,
                longitude: true,
            },
        });
        return {
            taxiId: lastLocation === null || lastLocation === void 0 ? void 0 : lastLocation.taxi_id,
            date: lastLocation === null || lastLocation === void 0 ? void 0 : lastLocation.date,
            latitude: lastLocation === null || lastLocation === void 0 ? void 0 : lastLocation.latitude,
            longitude: lastLocation === null || lastLocation === void 0 ? void 0 : lastLocation.longitude,
        };
    })));
    return renamedLocations;
});
exports.findLatestTaxiLocations = findLatestTaxiLocations;
//startDate: Es la fecha que representa el inicio del día (00:00:00)
//endDate: Se ajusta para representar el final del día (23:59:59.999), sumando un día a startDate y restando 1 milisegundo.
//Filtrado de fechas:
//gte (greater than or equal): asegura que se incluyan trayectorias desde el inicio del día.
//lte (less than or equal): asegura que se incluyan trayectorias hasta el final del día.
