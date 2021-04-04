import React, { Component } from 'react'
import './common.blocks/signup.css';
import './common.blocks/form.css'
import './common.blocks/spinner.css'
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
    
    constructor(props){
        super(props);
        this.onSignUp = props.onSignUp;
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    onSubmit = (e) => {
        e.preventDefault()

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
        if (this.props.isLoading){
            return    (
            <section className='signup'>
                <div className='spinner'></div>
            </section>   
            )
        }

        if (this.props.errors === 'no error'){
            return <Redirect to='/login'/>
        }
        return (
            <section className='signup'>
                <h2 className='signup__heading'>Sign Up</h2>
                {this.props.errors.email && <p style={{color: 'red'}}>Email is already taken</p>}
                {this.props.errors.password && <p style={{color: 'red'}}> Passwords are not matching </p>}
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
            </section>
        )
    }
}

export default SignUp
