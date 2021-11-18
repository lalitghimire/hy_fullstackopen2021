const initialFilter = ''

const filterReducer = (state = initialFilter, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data

        default:
            return state
    }
}

export const setFilter = (searchWord) => {
    return {
        type: 'FILTER',
        data: searchWord,
    }
}

export default filterReducer
