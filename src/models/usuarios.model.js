import { pool } from "../config/db.js";

const buscarPorEmail = async(email) => {
    const [filas] = await pool.query("SELECT id, email, password_hash, creado_en FROM usuarios WHERE email = ?", [email]);

    return filas[0];
}

const buscarPorId = async(id) => {
    const [filas] = await pool.query("SELECT id, email, creado_en FROM usuarios WHERE id = ?", [id]);

    return filas[0];
}

const crear = async(email, passwordHash) => {
    const [resultado] = await pool.query("INSERT INTO usuarios (email, password_hash) VALUES (?, ?)", [email, passwordHash]);

    return { id: resultado.insertId, email };
}

export { buscarPorEmail, buscarPorId, crear };