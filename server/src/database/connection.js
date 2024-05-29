import { Sequelize } from "sequelize";

const database = new Sequelize('volunteerhub_db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export async function tryToConnect(){
    try{
        database.sync({force:true});
        await database.authenticate();
        console.log("Connected to the database.");
    }catch(error){
        console.log("Error trying to connect to the database.");
    }
}

export {database};