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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importa el framework Express para crear el servidor
const client_1 = require("@prisma/client"); // Importa PrismaClient para interactuar con la base de datos
const trajectoryController_1 = require("./controllers/trajectoryController");
// Crear instancia de Prisma para interactuar con la base de datos
const prisma = new client_1.PrismaClient();
// Crear la aplicación de Express
const app = (0, express_1.default)();
// Middleware para manejar JSON en las peticiones
app.use(express_1.default.json());
// Ruta para obtener taxis con los parámetros opcionales: plate, page, limit
app.get('/taxis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extrae los parámetros de la consulta (query parameters) con valores por defecto
    const { plate, page = '1', limit = '10' } = req.query;
    try {
        // Convertir page y limit de string a número (porque vienen como strings en la URL)
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        // Construir el filtro condicional
        // Si plate está presente, busca taxis cuya matrícula (plate) contenga el valor; si no, retorna todos
        const where = plate ? { plate: { contains: plate } } : {};
        // Calcular el offset para la paginación, es decir, cuántos registros saltar antes de empezar a devolver resultados
        const offset = (pageNumber - 1) * limitNumber;
        // Consultar la base de datos con Prisma para obtener taxis con el filtro, la paginación y el límite
        const taxis = yield prisma.taxis.findMany({
            where, // Aplica el filtro por matrícula si se ha proporcionado
            skip: offset, // Salta los registros necesarios para la paginación
            take: limitNumber, // Limita el número de registros devueltos por página
        });
        // Responder con la lista de taxis obtenida en formato JSON
        res.json(taxis);
    }
    catch (error) {
        // Manejo de errores: en caso de error, responde con un mensaje y un código de estado 500 (error del servidor)
        console.error('Error al obtener taxis:', error);
        res.status(500).json({ error: 'Error al obtener taxis' });
    }
}));
// Ruta para obtener trayectorias filtradas por taxiId y fecha
// app.get('/trajectories/:taxiId/:date', getTrajectoriesByTaxiAndDate);
// Ruta original para obtener todas las trayectorias
app.get('/trajectories', trajectoryController_1.getTrajectoriesByTaxiAndDate);
// Exportar la aplicación para que pueda ser utilizada en otros archivos (en index.ts o pruebas)
exports.default = app;
