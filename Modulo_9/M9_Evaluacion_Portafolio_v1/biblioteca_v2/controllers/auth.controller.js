const usuarioModel = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// GET: muestra formulario registro
exports.showRegister = (req, res) => {
    res.render('register');
};

// GET: muestra formulario login
exports.showLogin = (req, res) => {
    res.render('login');
};

// POST: registrar usuario
exports.registro = (req, res) => {
    const { username, password, role } = req.body;

    const usuarios = usuarioModel.read();

    const existe = usuarios.find(u => u.username === username);
    if (existe) {
        return res.render('mensaje', { mensaje: 'El usuario ya existe' });
    }

    const nuevo = {
        id: usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
        username,
        password: bcrypt.hashSync(password, 10),
        role: role || "user"
    };

    usuarios.push(nuevo);
    usuarioModel.write(usuarios);

    return res.render('mensaje', { mensaje: 'Registro exitoso' });
};

// POST: login usuario
exports.login = (req, res) => {
    const { username, password } = req.body;

    const usuarios = usuarioModel.read();
    const user = usuarios.find(u => u.username === username);

    if (!user) {
        return res.render('mensaje', { mensaje: 'Usuario no encontrado' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.render('mensaje', { mensaje: 'Contraseña incorrecta' });
    }

    // generar token válido 10 minutos
    const token = jwt.sign(
        { username: user.username, role: user.role },
        "secreto123",
        { expiresIn: "10m" }
    );

    res.cookie("token", token, { httpOnly: true });

    return res.redirect('/');
};

// GET: logout
exports.logout = (req, res) => {
    res.clearCookie("token");
    return res.redirect('/');
};
