import app from './app';  // Importar la configuración desde app.ts

const port = 5001;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
