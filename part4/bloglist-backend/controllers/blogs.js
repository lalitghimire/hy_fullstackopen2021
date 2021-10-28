const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// route to get all blogs
blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs.map((blog) => blog.toJSON()))
})

// route to post a new blog
blogRouter.post('/', async (req, res, next) => {
    const body = req.body
    console.log('body', body)
    const user = await User.findById(body.userId)
    console.log('here is the found user', user._id)

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
    try {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (exception) {
        next(exception)
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
