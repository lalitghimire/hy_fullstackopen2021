import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdoteinput.value
        e.target.anecdoteinput.value = ''
        const newAnecdote = await anecdoteService.create(content)
        console.log('here is new anecdote', newAnecdote)
        dispatch(createNewAnecdote(newAnecdote))
        dispatch(setNotification(`"${newAnecdote.content}" - has been added`))
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
