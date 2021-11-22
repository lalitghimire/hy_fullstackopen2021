import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ setFilter }) => {
    //const dispatch = useDispatch()
    const handleChange = (event) => {
        setFilter(event.target.value)
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

export default connect(null, { setFilter })(Filter)
