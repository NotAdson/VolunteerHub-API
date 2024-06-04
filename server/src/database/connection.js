import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

const database = new Sequelize(process.env.ADDRESS);

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