"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // Importar la configuración desde app.ts
const port = 5001;
// Iniciar el servidor
app_1.default.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
