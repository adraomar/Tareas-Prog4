import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Usuarios from '../models/usuarios.model.js';

const registro = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: email y password' });
        }

        const usuarioExistente = await Usuarios.buscarPorEmail(email);

        if(usuarioExistente) {
            return res.status(400).json({ error: 'El email ya esta registrado '});
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuarios.crear(email, passwordHash);

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: { id: nuevoUsuario.id, email: nuevoUsuario.email }
        });

    } catch (error) {
        next(error);
    }
}

const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: email y password.'});
        }

        const usuario = await Usuarios.buscarPorEmail(email);
        if(!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas '});
        }

        const passwordValida = await bcrypt.compare(password, usuario.password_hash);
        if(!passwordValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas '});
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login existoso',
            token,
            usuario: { id: usuario.id, email: usuario.email }
        });

    } catch (error) {
        next(error);
    }
}

export { registro, login };