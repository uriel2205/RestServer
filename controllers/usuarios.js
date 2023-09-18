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

const usuariosPost = async(req = request,res = response) =>{
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password,rol});

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        });
    }
    // Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )
    // Guardar en DB
    await usuario.save();
    delete usuario.password;

    res.json({
        usuario
        
    });
}

const usuariosPut = (req,res = response) =>{ 

    const id = req.params;

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