// const anecdotesAtStart = [
//     'If it hurts, do it more often',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//     return {
//         content: anecdote,
//         id: getId(),
//         votes: 0,
//     }
// }

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'VOTE':
            const id = action.data.id
            //const toBeVoted = state.find((x) => x.id === id)
            //const votedAnecdote = { ...toBeVoted, votes: toBeVoted.votes + 1 }
            return state.map((anecdote) =>
                anecdote.id === id ? action.data : anecdote
            )
        case 'CREATE_NEW':
            return [...state, action.data]

        case 'INIT_ANECDOTES':
            console.log('yyyyyyyyyyyyy', action.data)
            return action.data
        default:
            return state
    }
}
export const vote = (anecdote) => {
    return async (dispatch) => {
        const updatedAnecdote = await anecdoteService.addVote(anecdote)
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote,
        })
    }
}

export const createNewAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.create(content)

        dispatch({
            type: 'CREATE_NEW',
            data: newAnecdote,
        })
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({ type: 'INIT_ANECDOTES', data: anecdotes })
    }
}
export default anecdoteReducer
