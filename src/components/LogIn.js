import React, { Component } from 'react'
import './common.blocks/login.css'
import './common.blocks/form.css'
import { Redirect } from 'react-router-dom'

class LogIn extends Component {

    constructor(props){
        super(props)
        this.onLogIn = props.onLogIn
        this.state = {
            email: '',
            password: '',
        }
    }


    onSubmit = (e) => {
        e.preventDefault()

        this.onLogIn(this.state.email, this.state.password)
        this.setState({
            email: '',
            password: '',
        })
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to='/'/>
        }

        return (
            <div className='login'>
                <h2 className='login__heading'>Log In</h2>
                {this.props.errors
                && <p style={{color: 'red'}}>Unauthorized</p>}
                <form className='form' onSubmit={(e) => this.onSubmit(e)}>
                    <div className='form__control'>
                        <label className='form__label'>Email</label>
                        <input 
                            className='form__input' 
                            type="email" 
                            value={this.state.email} 
                            onChange={(e) => this.setState({email: e.target.value})}
                            required/>
                    </div>
                    <div className='form__control'>
                        <label className='form__label'>Password</label>
                        <input 
                            className='form__input' 
                            type="password" 
                            value={this.state.password} 
                            onChange={(e) => this.setState({password: e.target.value})}
                            required/>
                    </div>
                    <button className='login__btn' type='submit'>Log In</button>
                </form>
            </div>
        )
    }   
}

export default LogIn
