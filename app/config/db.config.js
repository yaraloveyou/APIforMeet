module.exports = {
    HOST: '192.168.64.128',
    USER: 'root',
    PASSWORD: 'root_password',
    DB: 'meet',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}
