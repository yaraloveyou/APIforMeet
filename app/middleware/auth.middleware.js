require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            res.status(401).json({
                massage: 'Не авторизован'
            })    
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()

    } catch(ex) {
        res.status(401).json({
            massage: 'Не авторизован'
        })
        console.log(ex)
    }
}