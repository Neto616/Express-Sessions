const express = require('express');
const cors = require('cors');
const session = require('express-session');


class Server{

    constructor(){
        this.app = express();
        
        
        this.port = process.env.PORT;
        
        this.middleawares();
        this.routes();
        
    }
    
    middleawares(){
        //this.app.use( express.static('public') );
        this.app.use(session({
            secret: 'keyboard cat', //Clave
            resave: true, //Forma de almacenamiento 
            saveUninitialized: true,
            cookie: { maxAge:15000  }
          }))
        this.app.use( cors() );
    }

    routes(){
        this.app.get('/', ( req, res ) =>{
            req.session.usuario = "Nestor Ivan";
            req.session.rol = "Admin";
            req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;

            res.send(`El usuario: ${req.session.usuario}
            con rol: ${req.session.rol}
            ha visitado esta pagina ${req.session.visitas} veces`);
        })
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor funcionando aqui: http://localhost:${this.port}`);
        })
    }
}

module.exports = Server;