module.exports = (sequelize, DataTypes) => {
    const Rooms = sequelize.define('rooms', {
        room_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    })

    return Rooms
}