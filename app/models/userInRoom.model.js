module.exports = (sequelize, DataTypes) => {
    const userInRoom = sequelize.define('userInRoom', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        online:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        room_id:{
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    })

    return userInRoom
}