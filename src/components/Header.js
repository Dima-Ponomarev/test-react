import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './common.blocks/header.css'

class Header extends Component {

    constructor(props){
        super(props)
        this.onLogOut = props.onLogOut
    }

    render() {

        return (
            <header className='header'>
                <h1>
                    <Link className='header__logo' to='/'>Test your Math</Link>   
                </h1>
                {this.props.user 
                    ? <div className='header__auth-btns'>
                        <Link to='/' className='header__logout' onClick={this.onLogOut}>Log Out</Link>   
                    </div>
                    : <div className='header__auth-btns'>
                        <Link to='./login' className='header__login'>Log In</Link>   
                        <Link to='./signup' className='header__signup'>Sign Up</Link>
                    </div>
                }
            </header>
        )
    }
}

export default Header
