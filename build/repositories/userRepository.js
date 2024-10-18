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
exports.deleteUserInDb = exports.updateUserInDb = exports.createUserInDb = exports.findUsers = exports.findUserByEmail = void 0;
const client_1 = __importDefault(require("../client"));
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.users.findUnique({
        where: { email },
    });
});
exports.findUserByEmail = findUserByEmail;
const findUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.users.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
});
exports.findUsers = findUsers;
const createUserInDb = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.users.create({
        data: {
            name,
            email,
            password,
        },
    });
});
exports.createUserInDb = createUserInDb;
const updateUserInDb = (uid, name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.users.update({
        where: {
            id: parseInt(uid) || undefined,
            email: isNaN(parseInt(uid)) ? uid : undefined,
        },
        data: {
            name,
        },
    });
});
exports.updateUserInDb = updateUserInDb;
const deleteUserInDb = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.users.delete({
        where: {
            id: parseInt(uid) || undefined,
            email: isNaN(parseInt(uid)) ? uid : undefined,
        },
    });
});
exports.deleteUserInDb = deleteUserInDb;
