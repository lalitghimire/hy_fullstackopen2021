const initialFilter = ''

const notificationReducer = (state = initialFilter, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data

        default:
            return state
    }
}

export default notificationReducer
