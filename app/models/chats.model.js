module.exports = (sequelize, DataTypes) => {
    const Chats = sequelize.define('chat', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        userInRoom: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Chats
}