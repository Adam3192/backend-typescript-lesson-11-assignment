"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const bookmark_1 = require("./bookmark");
const user_1 = require("./user");
const dbName = 'bookmarkDB';
const username = 'sqluser';
const password = 'password';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
(0, bookmark_1.BookmarkFactory)(sequelize);
(0, user_1.UserFactory)(sequelize);
(0, bookmark_1.AssociateUserBookmark)();
exports.db = sequelize;
