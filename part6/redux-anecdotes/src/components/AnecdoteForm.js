import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createNewAnecdote, setNotification }) => {
    //const dispatch = useDispatch()

    const addNewAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdoteinput.value
        e.target.anecdoteinput.value = ''
        //const newAnecdote = await anecdoteService.create(content)
        //console.log('here is new anecdote', newAnecdote)
        createNewAnecdote(content)
        setNotification(`"${content}" - has been added`, 5000)
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

export default connect(null, { createNewAnecdote, setNotification })(
    AnecdoteForm
)
