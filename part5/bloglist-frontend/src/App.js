import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

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
            // keep a user logged in
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials provided')
            setTimeout(() => {
                setErrorMessage(null)
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

    // login form generator
    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>Log in to the application</h2>
            <div>
                username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )

    return (
        <div>
            <h1>blogs</h1>
            <Notification message={errorMessage} />
            {
                user === null ? (
                    loginForm()
                ) : (
                    <div>
                        {' '}
                        <h2>
                            {' '}
                            {user.name} is logged in{' '}
                            <button onClick={logout}>logout</button>
                        </h2>{' '}
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
