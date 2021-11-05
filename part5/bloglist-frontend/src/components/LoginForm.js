import React from 'react'

const LoginForm = ({
    username,
    password,
    handleSubmit,
    handleNameChange,
    handlePasswordChange,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h2>Log in to the application</h2>
            <div>
                username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={handleNameChange}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={handlePasswordChange}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )
}

export default LoginForm
