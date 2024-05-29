import { database } from "../database/connection.js"
import { DataTypes, Sequelize } from "sequelize"
import { UserModel } from "./User.model.js"

const PostModel = database.define("tb_posts", {
    id:{
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },

    title:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },

    content:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    creatorId:{
        type: DataTypes.UUID,
        references:{
            model: UserModel,
            key: UserModel.id
        },
        allowNull: false
    }
})

export {PostModel}