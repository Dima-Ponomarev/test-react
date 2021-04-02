import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import LogIn from './LogIn'
import SignUp from './SignUp'

class App extends Component {
  
  
  onLogIn = async (email, password) => {
    console.log({email, password})
    const res = await fetch(
      'https://internsapi.public.osora.ru/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })

      const data = await res.json();
      console.log(data)
  }

  onSignUp = async (name, email, password, passwordConf) => {
    const res = await fetch(
      'https://internsapi.public.osora.ru/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({name, email, password, password_confirmation: passwordConf})
      })

      const data = await res.json();
      console.log(data)
  }

  render(){
    return (
      <Router>
        <div className="container">
          <Header/>
          <Route path='/signup'>
            <SignUp  onSignUp={this.onSignUp}/>
          </Route>
          <Route path='/login'>
            <LogIn onLogIn={this.onLogIn}/>
          </Route>
        </div>
      </Router>
    );
  }
  
}
export default App;
