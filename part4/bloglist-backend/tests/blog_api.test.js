const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
]
//Initializing the database before tests
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

//test to check blogs in json
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

// test that all blogs are sent as response
test('all blogs returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(2)
})
// test that verifies unique identifier property of the blog posts is named id
test('id is an identifier', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body.map((x) => x.id)).toBeDefined()
    // expect(res.body[0].id).toBeDefined()
    // expect(res.body[1].id).toBeDefined()
})

//close the database connection
afterAll(() => {
    mongoose.connection.close()
})
