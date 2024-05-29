import { database } from "../database/connection.js"
import { DataTypes, Sequelize } from "sequelize"
import { UserModel } from "./User.model.js"
import { PostModel } from "./Post.model.js"

const CommentModel = database.define("tb_comments", {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },

    comment:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    postId:{
        type: DataTypes.UUID,
        references:{
            model: PostModel,
            key: PostModel.id
        },
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

export {CommentModel}