import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import LogIn from './LogIn'
import SignUp from './SignUp'
import './common.blocks/spinner.css'

export class App extends Component {
  state = {
    loginError : '',
    signupError: '',
    loggedIn: false,
    startRender: false
  }

  componentDidMount = () => {
    this.getUser();
  }

  getUser = async () => {
    const res = await fetch('https://internsapi.public.osora.ru/api/auth/user',
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')  
      },
    })

    const user = await res.json();

    if(user.id){
        this.setState({
          user,
          loggedIn: true
        })
    }

    this.setState({startRender: true})
}


  //LOGOUT HANDLER
  onLogOut = () => {
    localStorage.clear();
    this.setState({
      user: '',
      gameStart: '',
      loggedIn: false
    });
  }


  //LOG IN HANDLER
  onLogIn = async (email, password) => {
    this.setState({loading: true})
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
      if (data.status){
        localStorage.setItem('token', data.data.access_token)
        this.setState({loginError: ''})
        this.getUser()
        
      } else {
        this.setState({loginError: data.errors})
      }
      this.setState({loading: false})
  }


  //SIGNIN HANDLER
  onSignUp = async (name, email, password, passwordConf) => {
    this.setState({loading: true})
    const res = await fetch(
      'https://internsapi.public.osora.ru/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name, email, password, password_confirmation: passwordConf
        })
      })

      const data = await res.json()
      if (data.status){
        this.setState({signupError: 'none'})
      } else {
        this.setState({signupError: data.errors})
      }

      this.setState({loading: false})
  }

  //START TEST HANDLER

  onStart = async (difficulty) => {
    const dif = parseInt(difficulty);
    const res = await fetch(
      'https://internsapi.public.osora.ru/api/game/play',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')  
        },
        body: JSON.stringify({type: 1 ,type_hard: dif})
      })
    const question = await res.json();

    this.setState({
      gameStart: question.data,
    })
  }

  //EXIT GAME HANDLER

  onEnd = () => {
    this.setState({gameStart: null})
  }

  render(){
    return (
      this.state.startRender ?
      <Router>
        <div className="container">
          <Header 
            user={this.state.user}
            onLogOut={this.onLogOut}/>
          <Switch>
            <Route exact path='/'>
              <Home 
                user={this.state.user} 
                onStart={this.onStart}
                gameStart={this.state.gameStart}
                onEnd={this.onEnd}/>
            </Route>
            <Route path='/signup'>
              <SignUp  
                onSignUp={this.onSignUp} 
                errors={this.state.signupError}
                isLoading={this.state.loading}/>
            </Route>
            <Route path='/login'>
              <LogIn 
                onLogIn={this.onLogIn} 
                errors={this.state.loginError} 
                loggedIn={this.state.loggedIn}
                setUser={this.setUser}
                isLoading={this.state.loading}/>
            </Route>
          </Switch>
        </div>
      </Router>
      : <div className='spinner spinner--center'></div>
    )
  } 
}
export default App;
