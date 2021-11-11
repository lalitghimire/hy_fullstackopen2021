import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({
    blogs,
    setBlogs,
    setNotification,
    setType,
    blogFormVisible,
    setblogFormVisible,
}) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

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
                            id='blog-title'
                            type='text'
                            value={newTitle}
                            onChange={({ target }) => setNewTitle(target.value)}
                        />
                    </div>
                    <div>
                        author{' '}
                        <input
                            id='blog-author'
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
                            id='blog-url'
                            type='text'
                            value={newUrl}
                            onChange={({ target }) => setNewUrl(target.value)}
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

export default BlogForm
