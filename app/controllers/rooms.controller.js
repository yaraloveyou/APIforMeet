const db = require('../models')
const Rooms = db.rooms
const Users = db.users

// Добавление новой записи в таблицу "Rooms"
exports.create = (rooms) => {
    return Rooms.create({
        room_id: rooms.room_id,
    })
        .then(rooms => {
            console.log('>> Запись таблицы \"Rooms\" успешно создана')
            return rooms
        })
        .catch(err => {
            console.log('>> Ошибика создания новой записи \"Rooms\" ', err)
        })
}

// Создание связи многие ко многим таблиц "Users" и "Rooms"
exports.addUser = (roomsId, usersId) => {
    return Rooms.findByPk(roomsId)
        .then((room) => {
            if (!room) {
                console.log('Запись таблицы \"Rooms\" не найдена')
                return null
            }
            return Users.findByPk(usersId)
                .then((user) => {
                    if (!user) {
                        console.log('Запись таблицы \"Users\" не найдена')
                        return null
                    }

                    room.addUser(user)
                    return room
                })
        })
        .catch(err => {
            console.log('>> Ошибка создания связи таблицы \"Rooms\" с таблицей \"Users\"', err)
        })
}

// Поиск всех записей таблицы "Rooms"
exports.findAll = (req, res) => {
    const room = req.query.username
    let condition = room ? { room_id: { [OP.iLike]: `${username}` } } : null

    Rooms.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Не удалось найти записи таблицы \"Rooms\"'
            })
        })
}

// Поиск конкретной записи таблицы "Rooms"
exports.findOne = (req, res) => {
    const id = req.params.id

    Rooms.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Ошибка поиска записи с id=' + id
            })
        })
}

// Изменение записи таблицы "Rooms"
exports.update = (req, res) => {
    const id = req.params.id

    Rooms.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Запись таблицы \"Rooms\" была успешно обновлена'
                })
            } else {
                res.send({
                    message: 'Не удалось обновить запись таблицы \"Rooms\" с id=' + id
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Rooms with id=` + id
            })
        })
}

// Удаление записи из таблицы "Rooms"
exports.delete = (req, res) => {
    const id = req.params.id

    Rooms.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Запись таблицы \"Rooms\" была успешно удалена'
                })
            } else {
                res.send({
                    message: 'Не удалось удалить запись таблицы \"Rooms\" с id=' + id
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Не удалось удалить запись таблицы \"Rooms\" с id=' + id
            })
        })
}

// Удаление все записей таблицы "Rooms"
exports.deleteAll = (req, res) => {
    Rooms.destroy({
        where: {},
        truncate: false,
    })
        .then(nums => {
            res.send({
                message: `${nums} записей таблицы \"Rooms\" были успешно удалена`
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Не удалось удалить все записи таблицы \"Rooms\"'
            })
        })
}