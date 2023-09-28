const { response } = require("express");
const {Categoria} = require('../models')

// obtenerCategorias - paginado - total - populate
const categoriasGet = async(req, res = response) =>{
   const{limite = 5, desde = 0} = req.query
   const query = {estado: true}

   const [total, usuarios] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario')
   ]);

   res.json({
    total,
    usuarios
   });
}



const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }
    // Generar la data a guardar
    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //Guardar DB
    await categoria.save();

    res.status(201).json(categoria)
}

const categoriaDelete = async(req,res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});
    const usuarioAutenticado = req.usuario

    res.json({categoria, usuarioAutenticado})
}

// actualizarCategoria

const categoriaPut = async (req, res = response) => { 
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

        res.json(categoria);
}







module.exports = {
    crearCategoria,
    categoriasGet,
    categoriaPut,
    categoriaDelete
}