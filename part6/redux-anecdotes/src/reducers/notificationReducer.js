const initialMessage = 'Notification at the start'

const notificationReducer = (state = initialMessage, action) => {
    switch (action.type) {
        case 'SET':
            return state
        default:
            return state
    }
}

export default notificationReducer
