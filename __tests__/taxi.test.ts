import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../src/app';

const prisma = new PrismaClient();

describe('GET /taxis', () => {
    // Configuración previa a las pruebas
    beforeAll(async () => {
        // Aquí puedes agregar cualquier configuración que necesites antes de las pruebas
    });

    // Limpiar después de las pruebas
    afterAll(async () => {
        await prisma.$disconnect(); // Desconectar Prisma al terminar
    });

    // Primera prueba: obtener todos los taxis
    it('Debería devolver todos los taxis', async () => {
        const response = await request(app).get('/taxis');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);  // Debería devolver 3 taxis
    });

    // Segunda prueba: filtrar taxis por matrícula
    it('Debería filtrar taxis por matrícula (plate)', async () => {
        const response = await request(app).get('/taxis?plate=ABC123');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);  // Debería devolver 1 taxi con plate 'ABC123'
        expect(response.body[0].plate).toBe('ABC123');
    });

    // Tercera prueba: paginación
    it('Debería aplicar paginación correctamente', async () => {
        const response = await request(app).get('/taxis?page=1&limit=2');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);  // Debería devolver 2 taxis en la primera página
    });
});
