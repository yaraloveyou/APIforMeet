module.exports = (sequelize, DataTypes) => {
    const Rooms = sequelize.define('rooms', {
        room_id: {
            type: DataTypes.STRING,
        },
    })

    return Rooms
}