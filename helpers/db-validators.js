
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria')

const esRoleValido = async( rol = '') =>{
    const existeRol = await Role.findOne({ rol });
    if( !existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}
const emailExiste = async ( correo = '') =>{
const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
           throw new Error(`El correo ${correo}, ya esta registrado en la BD`)
    }
}
const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}
const existeCategoria = async( id ) => {

    // Verificar si la categoriaa existe
    const categoriaExiste = await Categoria.findById(id);
    if ( !categoriaExiste ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {esRoleValido, emailExiste, existeUsuarioPorId, existeCategoria}