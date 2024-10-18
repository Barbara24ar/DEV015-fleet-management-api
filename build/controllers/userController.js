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
exports.deleteUser = exports.modifyUser = exports.createUser = exports.listUsers = void 0;
const userService_1 = require("../services/userService");
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = '1', limit = '10' } = req.query;
    // Validar si 'page' y 'limit' son números válidos
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
        // Retornar un error 400 si los valores de página o límite no son válidos
        return res.status(400).json({ error: 'Invalid page or limit parameter' });
    }
    try {
        const users = yield (0, userService_1.getUsers)(pageNumber, limitNumber);
        res.json(users);
    }
    catch (error) {
        console.error('Error listing users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.listUsers = listUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // Validar que los campos obligatorios estén presentes
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields: name, email, or password' });
    }
    try {
        const newUser = yield (0, userService_1.addUser)(name, email, password);
        res.statusCode = 201;
        res.statusMessage = 'CREATED';
        // Responder con código 201 y un cuerpo que contenga el estado 'CREATED' y los datos del usuario
        res.json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        });
    }
    catch (error) {
        if (error.message === 'EMAIL_ALREADY_EXISTS') {
            // Si el email ya existe, devolver un 409 con el mensaje de error
            return res.status(409).json({ error: 'User with this email already exists' });
        }
        // Manejo de otros errores (500 por ejemplo)
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.createUser = createUser;
const modifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const { name } = req.body;
    try {
        const updatedUser = yield (0, userService_1.updateUser)(uid, name);
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Error modifying user:', error);
        res.status(404).json({ error: 'User not found' });
    }
});
exports.modifyUser = modifyUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        const deletedUser = yield (0, userService_1.removeUser)(uid);
        res.json(deletedUser);
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(404).json({ error: 'User not found' });
    }
});
exports.deleteUser = deleteUser;
