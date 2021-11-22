const initialMessage = null
let timeid = 0
const notificationReducer = (state = initialMessage, action) => {
    switch (action.type) {
        case 'SET':
            return action.data
        case 'CLEAR':
            return null
        default:
            return state
    }
}

export const setNotification = (message, clearTime) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET',
            data: message,
        })

        clearTimeout(timeid)
        timeid = setTimeout(() => {
            dispatch({ type: 'CLEAR' })
        }, clearTime)
    }
}

export default notificationReducer
