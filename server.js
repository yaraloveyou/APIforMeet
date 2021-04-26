require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./app/models')

let corsOption = {
    origin: 'http://localhost:8081',
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db')
    db.users.create({username: 'user', password: '1'})
    db.users.create({username: 'user2', password: '1'})
    db.users.create({username: 'user3', password: '1'})
    db.users.create({username: 'user4', password: '1'})
    db.users.create({username: 'user5', password: '1'})
    // db.rooms.createRoom({room_id: '123333213212s'})
    // db.rooms.createRoom({room_id: 'asdadadasdas'})
})

require('./app/routes/users.routes')(app)
require('./app/routes/rooms.routes')(app)
require('./app/routes/userInRoom.routes')(app)
require('./app/routes/chats.routes')(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})
