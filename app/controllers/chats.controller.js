const db = require('../models')
const Chats = db.chats

exports.create = (roomInUser, message) => {
    return Chats.create({
        roomInUser: roomInUser,
        message: message
    })
        .then(chats => {
            console.log('Сообщение успешно записано')
            return chats
        })
        .catch(err => {
            console.log('Неудалось создать сообщение ',  err)
        })
}