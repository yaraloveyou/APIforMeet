module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'USER'
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    })

    return Users
}