const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (req) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return null
}

// route to get all blogs
blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs.map((blog) => blog.toJSON()))
})

// route to post a new blog
blogRouter.post('/', async (req, res, next) => {
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    try {
        const savedBlog = await blog.save()
        user.blogs.push(savedBlog._id)
        await user.save()
        res.json(savedBlog)
    } catch (exception) {
        console.log('reached here', exception)
        next(exception)
    }
})

// route to delete a post
blogRouter.delete('/:id', async (req, res, next) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    try {
        const blog = await Blog.findById(req.params.id)
        console.log('her ei s blog', blog)
        if (blog.user.toString() === decodedToken.id) {
            await Blog.findByIdAndRemove(req.params.id)
            res.status(204).end()
        } else {
            res.send('Not authorized to delete')
        }
    } catch (error) {
        next(error)
    }
})

// route to update a post with changed parameter
blogRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    try {
        let editedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
            new: true,
        })
        res.json(editedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter
