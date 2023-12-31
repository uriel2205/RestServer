const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){

        //CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json());

        // Directorios publicos
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/usuarios'))
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', process.env.PORT);
        });
    }
}

module.exports = Server;