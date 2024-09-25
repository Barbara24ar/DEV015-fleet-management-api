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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 5001;
// Middleware para manejar datos en formato JSON
app.use(express_1.default.json());
// Ruta para obtener taxis con parámetros: plate, page, limit
app.get('/taxis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plate, page = '1', limit = '10' } = req.query;
    try {
        // Convertir page y limit a números
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        // Construir el filtro condicional
        const where = plate ? { plate: { contains: plate } } : {};
        // Calcular el offset para la paginación
        const offset = (pageNumber - 1) * limitNumber;
        // Consultar la base de datos con Prisma
        const taxis = yield prisma.taxis.findMany({
            where, // Filtro por matrícula (si se proporcionó)
            skip: offset, // Paginación
            take: limitNumber, // Límite de resultados por página
        });
        // Responder con los resultados
        res.json(taxis);
    }
    catch (error) {
        console.error('Error al obtener taxis:', error);
        res.status(500).json({ error: 'Error al obtener taxis' });
    }
}));
// Ruta para obtener todas las trajectories
app.get('/trajectories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTrajectories = yield prisma.trajectories.findMany();
        res.json(allTrajectories);
    }
    catch (error) {
        console.error('Error al obtener trajectories:', error);
        res.status(500).json({ error: 'Error al obtener trajectories' });
    }
}));
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
/*
uso en Postman:
Obtener todos los taxis:
GET http://localhost:3000/taxis

Filtrar por matrícula (plate):
GET http://localhost:3000/taxis?plate=ABC123

Paginación con page y limit:
GET http://localhost:3000/taxis?page=2&limit=5
 */ 
