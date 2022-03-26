import express, {Application} from 'express'
import  userRouter from '../routes/usuarios'
import  cors from 'cors'
import db from '../db/connection'
class Server {
    private app : Application
    private port : string
    private apiPaths = {
        usuarios:'/api/usuarios'
    }
    constructor(){
        this.app = express()
        this.port = process.env.PORT || '8080'
        this.dbConnection()
        this.middlewares()
        //definir rutas
        this.routes()
    }
    async dbConnection(){
        try {
            await db.authenticate()
            console.log('Base de datos online')
        } catch (error: any) {
            console.log(error)
        }
    }
    middlewares(){
        this.app.use( cors())
        //lectura body
        this.app.use( express.json())
        this.app.use( express.static('public'))
    }
    routes(){
        this.app.use(this.apiPaths.usuarios, userRouter)
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}
export default Server