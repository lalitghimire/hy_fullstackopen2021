import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)
    const [type, setType] = useState('')
    const [blogFormVisible, setblogFormVisible] = useState(false)

    // new blog
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    // fetch the blogs
    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    //the application checks if user details of a logged-in user
    //can already be found on the local storage.
    //If they can, the details are saved to the state of the application

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    //handle the login process and check credentials validity
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with ', username, password)

        try {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            // keep a user logged in
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials provided')
            setType('error')
            setTimeout(() => {
                setErrorMessage(null)
                setType('')
            }, 5000)
        }
    }

    // handle the blog creation
    const handleCreateBlog = async (event) => {
        event.preventDefault()
        console.log('xxxxx', newTitle, newAuthor, newUrl)
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        }
        console.log('new blogobject is here', blogObject)
        const newBlog = await blogService.create(blogObject)
        console.log('returned blog', newBlog)
        blogs.concat(newBlog)
        const updatedBlogsList = await blogService.getAll()
        setBlogs(updatedBlogsList)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setblogFormVisible(false)
        setNotification(`new blog ${newTitle} has been added`)
        setType('notification')
        setTimeout(() => {
            setNotification(null)
            setType('')
        }, 5000)
    }

    // logout
    const logout = () => {
        window.localStorage.clear()
        setUser(null)
        setUsername('')
        setPassword('')
    }

    // form to create a new blog
    const newBlogForm = () => {
        const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
        const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setblogFormVisible(true)}>
                        Create a blog
                    </button>
                </div>
                <div style={showWhenVisible}>
                    <form onSubmit={handleCreateBlog}>
                        <h3> Create a new blog</h3>
                        <div>
                            title{' '}
                            <input
                                type='text'
                                value={newTitle}
                                onChange={({ target }) =>
                                    setNewTitle(target.value)
                                }
                            />
                        </div>
                        <div>
                            author{' '}
                            <input
                                type='text'
                                value={newAuthor}
                                onChange={({ target }) =>
                                    setNewAuthor(target.value)
                                }
                            />
                        </div>
                        <div>
                            url
                            <input
                                type='text'
                                value={newUrl}
                                onChange={({ target }) =>
                                    setNewUrl(target.value)
                                }
                            />
                        </div>
                        <button type='submit'>Create</button>
                    </form>
                    <button onClick={() => setblogFormVisible(false)}>
                        cancel
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>blogs</h1>
            <Notification message={errorMessage} type={type} />
            <Notification message={notification} type={type} />
            {
                user === null ? (
                    <LoginForm
                        username={username}
                        password={password}
                        handleSubmit={handleLogin}
                        handleNameChange={({ target }) =>
                            setUsername(target.value)
                        }
                        handlePasswordChange={({ target }) =>
                            setPassword(target.value)
                        }
                    />
                ) : (
                    <div>
                        {' '}
                        <h2>
                            {' '}
                            {user.name} is logged in{' '}
                            <button onClick={logout}>logout</button>
                        </h2>{' '}
                        {newBlogForm()}
                        <h3>Blogs for the logged user</h3>
                        {blogs
                            .filter(
                                (blog) => blog.user.username === user.username
                            )
                            .map((blog) => (
                                <Blog key={blog.id} blog={blog} />
                            ))}
                    </div>
                )

                /* {user == null && loginForm()}
            {user != null && <h2> {user.name} is logged in </h2>}
            {user != null &&
                blogs
                    .filter((blog) => blog.user.username === user.username)
                    .map((blog) => <Blog key={blog.id} blog={blog} />)} */
            }
        </div>
    )
}

export default App
