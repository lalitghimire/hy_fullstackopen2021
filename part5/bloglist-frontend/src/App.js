import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)
    const [type, setType] = useState('')
    const [blogFormVisible, setblogFormVisible] = useState(false)

    // fetch the blogs
    useEffect(() => {
        // blogService.getAll().then((blogs) => setBlogs(blogs))
        const fetch = async () => {
            const blogList = await blogService.getAll()
            setBlogs(blogList)
        }
        fetch()
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

    // logout
    const logout = () => {
        window.localStorage.clear()
        setUser(null)
        setUsername('')
        setPassword('')
    }

    // handler for the like button

    const handleLike = async (blog) => {
        console.log('here is blogvalue', blog)
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        await blogService.update(likedBlog)
        const updateblogs = await blogService.getAll()
        setBlogs(updateblogs)
    }
    // handler for delete blog button
    const handleDelete = async (blog) => {
        console.log('clicked remove', blog)
        console.log('here is blogvalue', blog)
        const confirm = window.confirm(
            `Remove blog ${blog.title}! by ${blog.author}`
        )
        try {
            if (confirm) {
                const tobeDeletedBlog = { ...blog }
                await blogService.remove(tobeDeletedBlog)
                const updateblogs = await blogService.getAll()
                setBlogs(updateblogs)
            }
        } catch (exception) {
            const deleteError = exception.response.data.error
            setErrorMessage(`${deleteError}`)
            setType('error')
            setTimeout(() => {
                setErrorMessage(null)
                setType('')
            }, 5000)
        }
    }

    return (
        <div>
            <h1>blogs</h1>
            <Notification message={errorMessage} type={type} />
            <Notification message={notification} type={type} />
            {user === null ? (
                <LoginForm
                    username={username}
                    password={password}
                    handleSubmit={handleLogin}
                    handleUsernameChange={({ target }) =>
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
                    <BlogForm
                        blogs={blogs}
                        setBlogs={setBlogs}
                        setNotification={setNotification}
                        blogFormVisible={blogFormVisible}
                        setblogFormVisible={setblogFormVisible}
                        setType={setType}
                    />
                    <h3>Blogs</h3>
                    {blogs
                        //.filter((blog) => blog.user.username === user.username)
                        .sort((x, y) => y.likes - x.likes)
                        .map((blog) => (
                            <Blog
                                key={blog.id}
                                blog={blog}
                                handleLike={handleLike}
                                handleDelete={handleDelete}
                            />
                        ))}
                </div>
            )}
        </div>
    )
}

export default App
