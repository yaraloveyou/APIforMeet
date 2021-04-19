const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users.model.js')(sequelize, Sequelize)
db.rooms = require('./rooms.model.js')(sequelize, Sequelize)
db.userInRoom = require('./userInRoom.model.js')(sequelize, Sequelize)

db.users.belongsToMany(db.rooms, {
    through: db.userInRoom,
    as: 'rooms',
    foreignKey: 'room_id',
})

db.rooms.belongsToMany(db.users, {
    through: db.userInRoom,
    as: 'users',
    foreignKey: 'user_id',
})

module.exports = db;