//express,cors no está en typescript, por lo cual hay que realizar la siguiente instalación
//npm i --save-dev @types/express

//exportacion por defecto sin llaves
import express, {Application} from 'express';
import userRoutes from '../routes/usuarios';
import cors from 'cors';
import db from './../db/connection';

class Server {

    //a diferencia de JS, hay que definir las propiedades antes de inicializar en el constructor
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura Body
        this.app.use(express.json());

        //Carpeta Publica
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    async dbConnection(){

        try {

            await db.authenticate();
            console.log('Database Online');
            
        } catch (error: any) {
            throw new Error(error);
        }
    }
    

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        //Métodos iniciales
        
        //DB
        this.dbConnection();
        //Middlewares
        this.middlewares();
        //Definir Rutas
        this.routes();
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto',this.port);
        });
    }
}

export default Server;