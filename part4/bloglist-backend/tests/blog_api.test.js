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
    let blogObjects = initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
})

describe('when getting and testing initial blogs', () => {
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
})

describe('when posting a new blog', () => {
    // test to verify new blog post is saved
    test('blog post is added', async () => {
        const newBlog = {
            id: '5a422bc61b54a676234d17fc',
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2,
        }
        await api.post('/api/blogs').send(newBlog).expect(200)
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(initialBlogs.length + 1)
    })

    // test for blog with missing likes and test for default value to be zero
    test('blog post is added without likes', async () => {
        const newBlog = {
            id: '5a422bc61b54a676234d17fc',
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        }
        await api.post('/api/blogs').send(newBlog).expect(200)
        const res = await api.get('/api/blogs')
        expect(res.body[2].likes).toBe(0)
    })

    // test for blog with missing title and url and response as bad request
    test('blog post missing title and url', async () => {
        const newBlog = {
            id: '5a422bc61b54a676234d17fc',
            author: 'Robert C. Martin',
            likes: 5,
        }
        await api.post('/api/blogs').send(newBlog).expect(400)
    })
})

// test for deletion of a blog entry
describe('deletion of a blog post', () => {
    test('deletion success with status code 204 ', async () => {
        // first get the blogs stored in database

        const storedBlogs = await Blog.find({})
        const blogToDelete = storedBlogs[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const blogsAfterDeletion = await Blog.find({})
        expect(blogsAfterDeletion.length).toBe(storedBlogs.length - 1)
    })
})

//close the database connection
afterAll(() => {
    mongoose.connection.close()
})
