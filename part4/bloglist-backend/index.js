const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blogs')

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to database')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB')
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
