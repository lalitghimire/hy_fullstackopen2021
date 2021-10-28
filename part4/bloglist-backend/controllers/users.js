const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

// create new users using POST method
userRouter.post('/', async (req, res, next) => {
    const body = req.body

    if (body.password.length < 3) {
        return res
            .status(400)
            .json({ error: 'password should be at least 3 characters' })
    }
    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

// implementation to see the details of all users
userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
    })
    res.json(users.map((user) => user.toJSON()))
})

// not requierd now on this step(for self)....................
userRouter.delete('/:id', async (req, res, next) => {
    try {
        await User.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

module.exports = userRouter
