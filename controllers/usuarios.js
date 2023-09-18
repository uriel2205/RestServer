const {response, request} = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');


const usuariosGet =(req,res = response) =>{
    const {q, nombre = "No name", apikey, page = 1, limit} = req.query;
    res.json({
        msg: 'get API  controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}


const usuariosPost = async(req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req,res = response) =>{ 

    const {id} = req.params;
    const {password, google, correo, ...resto} =req.body;

    //TODO validar contra base de datos
    if( password ) {
        // Encriptar la contrasena
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
    msg: 'put API controlador',
    id
});
}

const usuariosDelete = (req,res = response) =>{ 
    res.json({
    msg: 'delete API controlador'
});
}

const usuariosPatch = (req, res = response) =>{
    res.json({
    msg: 'patch API controlador'
});
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}