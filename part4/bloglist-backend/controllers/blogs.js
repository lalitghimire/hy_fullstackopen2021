const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body)

    try {
        const savedBlog = await blog.save()
        res.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (req, res, next) => {
    try {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter
