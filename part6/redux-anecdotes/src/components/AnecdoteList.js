import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes)
    const anecdoteFilter = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    const filteredAnecdotes = anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(anecdoteFilter.toLowerCase())
    )

    console.log('this is filtered list', filteredAnecdotes)
    return (
        <div>
            {filteredAnecdotes
                .sort((x, y) => y.votes - x.votes)
                .map((anecdote) => (
                    <div
                        style={{
                            backgroundColor: 'skyblue',
                            border: 'solid 1px',
                            margin: '5px',
                        }}
                        key={anecdote.id}
                    >
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button
                                onClick={() => {
                                    dispatch(vote(anecdote.id))
                                    dispatch(
                                        setNotification(
                                            `You voted - "${anecdote.content}"`
                                        )
                                    )
                                    setTimeout(() => {
                                        dispatch({ type: 'CLEAR' })
                                    }, 5000)
                                }}
                            >
                                vote
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default AnecdoteList
