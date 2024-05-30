import { database } from "../database/connection.js"
import { DataTypes, Sequelize } from "sequelize"

export const UserModel = database.define("tb_users", {
    id:{
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    email:{
        type: DataTypes.STRING,
        validate:{
            isEmail: true
        },
        unique: true,
    },

    password:{
        type: DataTypes.STRING(60),
        allowNull: false,
    },

    description:{
        type: DataTypes.STRING,
        allowNull: true
    },

    profile_picture_url:{
        type: DataTypes.STRING,
        allowNull: true
    },

    cv_url:{
        type: DataTypes.STRING,
        allowNull: true
    }
})