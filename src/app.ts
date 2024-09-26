import express from 'express';  // Importa el framework Express para crear el servidor
import { PrismaClient } from '@prisma/client';  // Importa PrismaClient para interactuar con la base de datos
import { getTrajectoriesByTaxiAndDate } from './controllers/trajectoryController';

// Crear instancia de Prisma para interactuar con la base de datos
const prisma = new PrismaClient();

// Crear la aplicación de Express
const app = express();

// Middleware para manejar JSON en las peticiones
app.use(express.json());

// Ruta para obtener taxis con los parámetros opcionales: plate, page, limit
app.get('/taxis', async (req, res) => {
  // Extrae los parámetros de la consulta (query parameters) con valores por defecto
  const { plate, page = '1', limit = '10' } = req.query;

  try {
    // Convertir page y limit de string a número (porque vienen como strings en la URL)
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    // Construir el filtro condicional
    // Si plate está presente, busca taxis cuya matrícula (plate) contenga el valor; si no, retorna todos
    const where = plate ? { plate: { contains: plate as string } } : {};

    // Calcular el offset para la paginación, es decir, cuántos registros saltar antes de empezar a devolver resultados
    const offset = (pageNumber - 1) * limitNumber;

    // Consultar la base de datos con Prisma para obtener taxis con el filtro, la paginación y el límite
    const taxis = await prisma.taxis.findMany({
      where,  // Aplica el filtro por matrícula si se ha proporcionado
      skip: offset,  // Salta los registros necesarios para la paginación
      take: limitNumber,  // Limita el número de registros devueltos por página
    });

    // Responder con la lista de taxis obtenida en formato JSON
    res.json(taxis);
  } catch (error) {
    // Manejo de errores: en caso de error, responde con un mensaje y un código de estado 500 (error del servidor)
    console.error('Error al obtener taxis:', error);
    res.status(500).json({ error: 'Error al obtener taxis' });
  }
});

// Ruta para obtener trayectorias filtradas por taxiId y fecha
// app.get('/trajectories/:taxiId/:date', getTrajectoriesByTaxiAndDate);

// Ruta original para obtener todas las trayectorias
app.get('/trajectories', getTrajectoriesByTaxiAndDate);

// Exportar la aplicación para que pueda ser utilizada en otros archivos (en index.ts o pruebas)
export default app;


