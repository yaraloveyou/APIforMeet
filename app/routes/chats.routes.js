module.exports = (app) => {
    const chats = require('../controllers/chats.controller')
    let router = require('express').Router()

    router.post('/', chats.create)

    app.use('/api/chats', router)
}
