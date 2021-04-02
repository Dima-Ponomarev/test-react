import React, { Component } from 'react'
import './common.blocks/home.css'

export class Home extends Component {

    render() {
        if (this.props.user){
            return (
                <main className='home'>
                    <h2 className='home__title'> Hi {this.props.user.name}</h2>
                </main>
            )
        }
        return (
            <main className='home'>
                <h2 className='home__title'>You are not logged in</h2>
            </main>

        )
    }
}

export default Home
