const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

// create new users using POST method
userRouter.post('/', async (req, res) => {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    res.json(savedUser)
})

// implementation to see the details of all users
userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users.map((user) => user.toJSON()))
})

module.exports = userRouter
