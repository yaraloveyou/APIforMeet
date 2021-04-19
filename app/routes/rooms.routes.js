module.exports = app => {
    const rooms = require('../controllers/rooms.controller')

    let router = require('express').Router()

    router.post('/', rooms.create)
    router.get('/', rooms.findAll)
    router.get('/:id', rooms.findOne)
    router.get('/:id', rooms.update)
    router.delete('/:id', rooms.delete)
    router.delete('/', rooms.deleteAll)

    app.use('/api/rooms', router)
}