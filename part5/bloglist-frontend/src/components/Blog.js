import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
    console.log('here is the blog object', blog)
    const [detailVisible, setDetailVisible] = useState(false)

    const detailView = { display: detailVisible ? '' : 'none' }

    const handleLike = async (blog) => {
        console.log('here is blogvalue', blog)
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        await blogService.update(likedBlog)
        const updateblogs = await blogService.getAll()
        setBlogs(updateblogs)
    }
    const handleDelete = async (blog) => {
        console.log('clicked remove', blog)
        console.log('here is blogvalue', blog)
        const tobeDeletedBlog = { ...blog }
        await blogService.remove(tobeDeletedBlog)
        const updateblogs = await blogService.getAll()
        setBlogs(updateblogs)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        color: 'purple',
    }
    return (
        <div className='blog' style={blogStyle}>
            <div>
                {blog.title} {blog.author}{' '}
                <button onClick={() => setDetailVisible(!detailVisible)}>
                    {detailVisible ? 'hide' : 'view'}
                </button>
            </div>
            <div style={detailView}>
                <div>Url {blog.url}</div>
                <div>
                    likes {blog.likes}{' '}
                    <button onClick={() => handleLike(blog)}> like</button>{' '}
                </div>
                <div>User {blog.user.name}</div>
                <button
                    style={{ background: 'rgb(66, 184, 221)' }}
                    onClick={() => handleDelete(blog)}
                >
                    {' '}
                    remove{' '}
                </button>
            </div>
        </div>
    )
}

export default Blog
