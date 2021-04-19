const db = require('../models')
const UserInRoom = db.userInRoom
const Op = db.Sequelize.Op

exports.findAll = (req, res) => {
    const id = req.query.id
    let condition = id ? { id: { [Op.iLike]: `${id}` } } : null

    UserInRoom.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while retrieving UserInRoom'
            })
        })
}