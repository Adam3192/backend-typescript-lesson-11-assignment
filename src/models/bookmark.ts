import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Bookmark extends Model<InferAttributes<Bookmark>, InferCreationAttributes<Bookmark>>{
    declare bookmarkId: number;
    declare userId: number;
    declare title: string;
    declare url: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function BookmarkFactory(sequelize: Sequelize) {
    Bookmark.init({
        bookmarkId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'bookmarks',
        sequelize
    });
}

export function AssociateUserBookmark() {
    User.hasMany(Bookmark, { foreignKey: 'userId' });
    Bookmark.belongsTo(User, { foreignKey: 'userId' });
}