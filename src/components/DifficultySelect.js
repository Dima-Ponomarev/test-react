import React, { Component } from 'react'
import './common.blocks/select.css'

export class DifficultySelect extends Component {
    render() {
        return (
            <select 
            className='select' 
            name="difficulty"
            value={this.props.currentDifficulty || '0'}
            onChange={(e) => this.props.onChange(e)}>
                <option disabled='disabled' value='0'>Choose difficulty</option>
                <option value="1">Easy</option>
                <option value="2">Hard</option>
            </select>
        )
    }
}

export default DifficultySelect
