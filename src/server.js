import "dotenv/config";
import app from "./app.js";
import { probarConexion } from "./config/db.js";

const PORT = process.PORT || 3000;

try {
    await probarConexion();
    app.listen(PORT, () => console.log(`[SERVER]: Servidor corriendo y escuchando en el puerto ${PORT}. http://localhost:${PORT}.`));
} catch (error) {
    console.log(`[ERROR]: Error al intentar conexion con servidor MySQL. Error: ${error.message}`);
    process.exit();
}