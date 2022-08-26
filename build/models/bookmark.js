"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserBookmark = exports.BookmarkFactory = exports.Bookmark = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Bookmark extends sequelize_1.Model {
}
exports.Bookmark = Bookmark;
function BookmarkFactory(sequelize) {
    Bookmark.init({
        bookmarkId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'bookmarks',
        sequelize
    });
}
exports.BookmarkFactory = BookmarkFactory;
function AssociateUserBookmark() {
    user_1.User.hasMany(Bookmark, { foreignKey: 'userId' });
    Bookmark.belongsTo(user_1.User, { foreignKey: 'userId' });
}
exports.AssociateUserBookmark = AssociateUserBookmark;
