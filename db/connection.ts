import {Sequelize} from 'sequelize'

const db = new Sequelize('nodebd','root','',{
    host:'localhost',
    dialect:'mysql'
})
export default db