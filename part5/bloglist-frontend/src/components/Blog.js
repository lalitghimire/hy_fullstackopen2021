import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
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
            <div className='limitview'>
                {blog.title} {blog.author}{' '}
                <button
                    className='hideviewbutton'
                    onClick={() => setDetailVisible(!detailVisible)}
                >
                    {detailVisible ? 'hide' : 'view'}
                </button>
            </div>
            {detailVisible ? (
                <div style={detailView} className='detailview'>
                    <div>Url {blog.url}</div>
                    <div>
                        likes {blog.likes}{' '}
                        <button
                            className='likeButton'
                            onClick={() => handleLike(blog)}
                        >
                            {' '}
                            like
                        </button>{' '}
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
            ) : null}
        </div>
    )
}

export default Blog
