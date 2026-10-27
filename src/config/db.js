import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

const probarConexion = async() => {
    const [filas] = await pool.query("SELECT 1 + 1 AS resultado");
    console.log(`[SERVER]: Conexion con MySQL: 1 + 1 = ${filas[0].resultado}`);
}

export { pool, probarConexion };