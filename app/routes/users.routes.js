module.exports = app => {
    const users = require('../controllers/users.controller')
    const auth = require('../middleware/auth.middleware')
    let router = require('express').Router()

    router.post('/signup', users.registration)
    router.post('/login', users.login)
    router.get('/auth', auth, users.check)
    router.get('/', users.findAll)
    router.get('/:id', users.findOne)

    app.use('/api/users', router)
}