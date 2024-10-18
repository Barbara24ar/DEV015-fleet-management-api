import express from 'express';
import { PrismaClient } from '@prisma/client';
import trajectoryRouter from './routes/trajectoryRoutes';
import { userRouter } from './routes/userRoutes';
import authRouter from './routes/authRoutes';

// Crear instancia de Prisma para interactuar con la base de datos
const prisma = new PrismaClient();

// Crear la aplicación de Express
const app = express();

// Middleware para manejar JSON en las peticiones
app.use(express.json());

// Middleware de logging para depuración
app.use((req, res, next) => {
  console.log(`Ruta accedida: ${req.method} ${req.path}`);
  next();
});

// Ruta para obtener taxis con los parámetros opcionales: plate, page, limit
app.get('/taxis', async (req, res) => {
  // Extrae los parámetros de la consulta (query parameters) con valores por defecto
  const { plate, page = '1', limit = '10' } = req.query;

  try {
    // Convertir page y limit de string a número (porque vienen como strings en la URL)
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    // Construir el filtro condicional
    const where = plate ? { plate: { contains: plate as string } } : {};

    // Calcular el offset para la paginación
    const offset = (pageNumber - 1) * limitNumber;

    // Consultar la base de datos con Prisma
    const taxis = await prisma.taxis.findMany({
      where,
      skip: offset,
      take: limitNumber,
    });

    // Responder con la lista de taxis obtenida en formato JSON
    res.json(taxis);
  } catch (error) {
    console.error('Error al obtener taxis:', error);
    res.status(500).json({ error: 'Error al obtener taxis' });
  }
});

// Usar el router para las rutas de trayectorias
app.use(trajectoryRouter);
app.use(userRouter)
app.use(authRouter)

// Exportar la aplicación
export default app;