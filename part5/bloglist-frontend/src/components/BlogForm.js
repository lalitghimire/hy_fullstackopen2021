import React, { useState } from 'react'

const BlogForm = ({
    handleCreateBlog,
    newTitle,
    newAuthor,
    newUrl,
    setNewTitle,
    setNewAuthor,
    setNewUrl,
    blogFormVisible,
    setblogFormVisible,
}) => {
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
                            onChange={({ target }) => setNewTitle(target.value)}
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
