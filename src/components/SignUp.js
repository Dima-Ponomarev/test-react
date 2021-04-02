import React, { Component } from 'react'
import './common.blocks/signup.css';
import './common.blocks/form.css'

class SignUp extends Component {
    
    constructor(props){
        super(props);
        this.onSignUp = props.onSignUp;
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            status: true
        }
    }

    onSubmit = (e) => {
        e.preventDefault()

        if (this.state.password !== this.state.confirmPassword){
            this.setState({status: false})
            return
        } else {
            this.setState({status: true})
        }

        this.onSignUp(
            this.state.name, 
            this.state.email, 
            this.state.password,
            this.state.confirmPassword)
        this.setState({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        })
    }

    render() {
        return (
            <div className='signup'>
                <h2 className='signup__heading'>Sign Up</h2>
                {!this.state.status && <p style={{color: 'red'}}>Passwords are not matching</p>}
                <form className='form' onSubmit={(e) => this.onSubmit(e)}>
                    <div className='form__control'>
                        <label className='form__label'>Name</label>
                        <input 
                            className='form__input' 
                            type="text" 
                            value={this.state.name} 
                            onChange={(e) => this.setState({name: e.target.value})}
                            required/>
                    </div>
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
                    <div className='form__control'>
                        <label className='form__label'>Password Confirmation</label>
                        <input 
                            className='form__input' 
                            type="password" 
                            value={this.state.confirmPassword}
                            onChange={(e) => this.setState({confirmPassword: e.target.value})} 
                            required/>
                    </div>
                    <button className='signup__btn' type='submit'>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp
