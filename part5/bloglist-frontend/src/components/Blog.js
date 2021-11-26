import React from 'react'
const Blog = ({ blog }) => {
    console.log('here is the blog object', blog)

    const viewClick = () => {
        return <div>{blog.url} </div>
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
            {blog.title} {blog.author}{' '}
            <button onClick={viewClick}>view </button>
        </div>
    )
}

export default Blog
