const initialMessage = null

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

export default notificationReducer
