import React, { useState } from 'react'
const Blog = ({ blog }) => {
    console.log('here is the blog object', blog)
    const [detailVisible, setDetailVisible] = useState(false)

    const detailView = { display: detailVisible ? '' : 'none' }

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
                    likes {blog.likes} <button> like</button>{' '}
                </div>
                <div>User {blog.user.name}</div>
            </div>
        </div>
    )
}

export default Blog
