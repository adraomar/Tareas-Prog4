import { pool } from "../config/db.js";

const aBooleano = (tareas) => ({ ...tareas, completada: !!tareas.completada });

const listarPorUsuario = async(usuarioId, { completada, buscar } = {}) => {
    let query = "SELECT id, texto, completada FROM tareas WHERE usuario_id = ?";
    const parametros = [usuarioId];

    if(completada != undefined) {
        query += ' AND completada = ?';
        parametros.push(completada == "true");
    }

    if(buscar != undefined) {
        query += ' AND texto LIKE ?';
        parametros.push(`%${buscar}%`);
    }

    query += ' ORDER BY id DESC';

    const [filas] = await pool.query(query, parametros);
    
    return filas.map(aBooleano);
}

const crear = async(crear, usuarioId) => {
    const [resultado] = await pool.query('INSERT INTO tareas (texto, usuario_id) VALUES (?, ?)', [texto, usuarioId]);

    return { id: resultado.insertId, text, completada: false };
}

const alternarCompletada = async(id, usuarioId) => {
    const [resultado] = await pool.query('UPDATE tareas SET completada = NOT completada WHERE id = ? AND usuario_id = ?', [id, usuarioId]);

    return resultado.affectedRows > 0;
}

const eliminar = async(id, usuarioId) => {
    CONST [resultado] = await pool.query('DELETE FROM tareas WHERE id = ? AND usuario_id = ?', [id, usuarioId]);

    return resultado.affectedRows > 0;
}

export { listarPorUsuario, crear, alternarCompletada, eliminar };