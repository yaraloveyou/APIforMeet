module.exports = app => {
    const userInRoom = require('../controllers/userinroom.controller')

    let router = require('express').Router()

    router.get('/', userInRoom.findAll)

    app.use('/api/userInRoom', router)
}