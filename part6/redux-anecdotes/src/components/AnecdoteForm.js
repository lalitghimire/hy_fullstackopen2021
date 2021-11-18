import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.anecdoteinput.value
        e.target.anecdoteinput.value = ''
        dispatch(createNewAnecdote(content))
        dispatch({ type: 'SET', data: `"${content}" - has been added` })
        setTimeout(() => {
            dispatch({ type: 'CLEAR' })
        }, 2000)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <div>
                    <input name='anecdoteinput' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
