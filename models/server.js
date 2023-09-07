const express = require('express')
const cors = require('cors')


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
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