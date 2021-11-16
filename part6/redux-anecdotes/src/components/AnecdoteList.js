import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes)
    const dispatch = useDispatch()
    return (
        <div>
            {anecdotes
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
                                    dispatch({
                                        type: 'SET',
                                        data: `you voted ${anecdote.content}`,
                                    })
                                    setTimeout(() => {
                                        dispatch({ type: 'CLEAR' })
                                    }, 2000)
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
