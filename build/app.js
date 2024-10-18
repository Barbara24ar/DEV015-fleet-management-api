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
const trajectoryRoutes_1 = __importDefault(require("./routes/trajectoryRoutes"));
const userRoutes_1 = require("./routes/userRoutes");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Crear instancia de Prisma para interactuar con la base de datos
const prisma = new client_1.PrismaClient();
// Crear la aplicación de Express
const app = (0, express_1.default)();
// Middleware para manejar JSON en las peticiones
app.use(express_1.default.json());
// Middleware de logging para depuración
app.use((req, res, next) => {
    console.log(`Ruta accedida: ${req.method} ${req.path}`);
    next();
});
// Ruta para obtener taxis con los parámetros opcionales: plate, page, limit
app.get('/taxis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extrae los parámetros de la consulta (query parameters) con valores por defecto
    const { plate, page = '1', limit = '10' } = req.query;
    try {
        // Convertir page y limit de string a número (porque vienen como strings en la URL)
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        // Construir el filtro condicional
        const where = plate ? { plate: { contains: plate } } : {};
        // Calcular el offset para la paginación
        const offset = (pageNumber - 1) * limitNumber;
        // Consultar la base de datos con Prisma
        const taxis = yield prisma.taxis.findMany({
            where,
            skip: offset,
            take: limitNumber,
        });
        // Responder con la lista de taxis obtenida en formato JSON
        res.json(taxis);
    }
    catch (error) {
        console.error('Error al obtener taxis:', error);
        res.status(500).json({ error: 'Error al obtener taxis' });
    }
}));
// Usar el router para las rutas de trayectorias
app.use(trajectoryRoutes_1.default);
app.use(userRoutes_1.userRouter);
app.use(authRoutes_1.default);
// Exportar la aplicación
exports.default = app;
