import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './common.blocks/header.css'

class Header extends Component {
    render() {
        return (
            <header className='header'>
                <h1 className='header__logo'>Test your Math</h1>
                <div className='header__auth-btns'>
                    <Link to='./login' className='header__login'>Log In</Link>   
                    <Link to='./signup' className='header__signup'>Sign Up</Link>
                </div>
            </header>
        )
    }
}

export default Header
