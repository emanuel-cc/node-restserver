const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.conectarDB();
        
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        //Lo intenta serializar a un formato json
        this.app.use(express.json());
        // Directorio público
        this.app.use(express.static('public'));

    }

    //Se definen las rutas que se van a usar
    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port);
    }
}

module.exports = Server;