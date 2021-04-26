require('dotenv').config()

const db = require('../models')
const Users = db.users
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken')

exports.create = (users) => {
    return Users.create({
        username: users.username,
        password: users.password
    })
        .then(users => {
            console.log('>> Created Users')
            return users
        })
        .catch(err => {
            console.log('>> Error while creating Users ', err)
        })
}

exports.findAll = (req, res) => {
    const username = req.query.username
    let condition = username ? { username: { [Op.iLike]: `%${username}` } } : null

    Users.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Users'
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Users.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Error retrieving Users with id=' + id
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    Users.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Users was updated successfully'
                })
            } else {
                res.send({
                    message: `Cannot update Users with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Error updating Users with id=${id}`
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Users.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Users was deleted successefully'
                })
            } else {
                res.send({
                    message: `Cannot delete Users with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Could not delete Users with id=${id}`
            })
        })
}

exports.deleteAll = (req, res) => {
    Users.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Users were deleted successfully`
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while removing all Users'
            })
        })
}

exports.findAllPublished = (req, res) => {
    Users.findAll({ where: { published: true } })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                message:
                    err.message || 'Some error occurred while retrieving Users'
            })
        })
}

const generateJwt = (id, username, password, role, published) => {
    return jwt.sign(
        { id: id, username, password, role, published },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

exports.registration = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.send({
            message: 'Отсутствует логин или пароль'
        })
    }

    const candidate = await Users.findOne({ where: { username } })
    if (candidate) {
        res.send({
            message: 'Данное имя пользователя занято'
        })
    }

    const user = await Users.create({ username, password })
    const token = generateJwt(user.id, username, password, user.role, user.published)

    return res.json({ token })
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    const user = await Users.findOne({ where: { username } })
    if (!user) {
        res.send({
            message: 'Пользователь с таким именем не найдет'
        })
    }

    if (password != user.password) {
        res.send({
            message: 'Неверный логин или пароль'
        })
    }

    const token = generateJwt(user.id, username, password, user.role, user.published)
    return res.json({ token, user: user })
}

exports.check = async(req, res) => {
    const token = generateJwt(req.user.id, req.user.username, req.user.password, req.user.role, req.user.published)
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    return res.json({ decoded })
}