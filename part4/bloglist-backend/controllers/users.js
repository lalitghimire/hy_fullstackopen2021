const userRouter = require('express').Router()

userRouter.get('/', (req, res) => {
    res.send('<h1> Hello </h1>')
})

module.exports = userRouter
