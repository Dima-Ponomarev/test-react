import React, { Component } from 'react'
import './common.blocks/select.css'

export class DifficultySelect extends Component {

    changeDifHandler = (e) => {

        this.props.onChange(e)
    }

    render() {
        return (
            <select 
            className='select' 
            name="difficulty"
            value
            onChange={(e) => this.changeDifHandler(e)}>
                <option disabled='disabled' value>Choose difficulty</option>
                <option value="1">Easy</option>
                <option value="2">Hard</option>
            </select>
        )
    }
}

export default DifficultySelect
