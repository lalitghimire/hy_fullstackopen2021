import React from 'react'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch({ type: 'FILTER', data: event.target.value })
    }

    const style = {
        marginBottom: 20,
    }

    return (
        <div style={style}>
            filter <input type='text' onChange={handleChange} />
        </div>
    )
}

export default Filter
