import { Sequelize } from "sequelize";

const database = new Sequelize("postgresql://db_insight_bytes_owner:uUIc8MZdBEN6@ep-late-boat-a5f0niug.us-east-2.aws.neon.tech/db_insight_bytes?sslmode=require");

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