"use strict";
/*defines la configuración de tu aplicación Express: las rutas, middlewares y conexión a la base de datos. Este archivo se importa
luego en otros lugares (como en las pruebas o para levantar el servidor). Así mantienes el código modular y fácil de probar.*/
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
// Crear instancia de Prisma para interactuar con la base de datos
const prisma = new client_1.PrismaClient();
// Crear la aplicación de Express
const app = (0, express_1.default)();
// Middleware para manejar JSON
app.use(express_1.default.json());
// Ruta para obtener todos los taxis
app.get('/taxis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taxis = yield prisma.taxis.findMany();
    res.json(taxis); // Devolver taxis en formato JSON
}));
// Ruta para obtener todas las trayectorias
app.get('/trajectories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trajectories = yield prisma.trajectories.findMany();
    res.json(trajectories); // Devolver trayectorias en formato JSON
}));
// Exportar la aplicación
exports.default = app;
