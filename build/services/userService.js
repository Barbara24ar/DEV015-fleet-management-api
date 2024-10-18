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
exports.removeUser = exports.updateUser = exports.addUser = exports.getUsers = void 0;
const userRepository_1 = require("../repositories/userRepository");
const getUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, userRepository_1.findUsers)(page, limit);
});
exports.getUsers = getUsers;
const addUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el usuario con este email ya existe
    const existingUser = yield (0, userRepository_1.findUserByEmail)(email);
    if (existingUser) {
        // Si el usuario ya existe, lanzar un error personalizado
        throw new Error('EMAIL_ALREADY_EXISTS');
    }
    // Si no existe, crear el usuario
    return yield (0, userRepository_1.createUserInDb)(name, email, password);
});
exports.addUser = addUser;
const updateUser = (uid, name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, userRepository_1.updateUserInDb)(uid, name);
});
exports.updateUser = updateUser;
const removeUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, userRepository_1.deleteUserInDb)(uid);
});
exports.removeUser = removeUser;
