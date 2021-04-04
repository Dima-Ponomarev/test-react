import React, { Component } from 'react'
import './common.blocks/home.css'
import './common.blocks/game-setup.css'
import DifficultySelect from './DifficultySelect'
import Game from './Game'

export class Home extends Component {

    state = {}

    onChange = (e) => {
        this.setState({ difficulty: e.target.value })
    }

    render() {
        if (this.props.gameStart){
            return <Game 
                question={this.props.gameStart} 
                difficulty={this.state.difficulty}
                onEnd={this.props.onEnd}/>
        } else {
            if (this.props.user){
                return (
                    <main className='home home--loggedin'>
                        <h2 className='home__title'> Logged in as {this.props.user.name}</h2>
                        <div className="game-setup">
                            <DifficultySelect 
                                onChange={this.onChange} 
                                currentDifficulty={this.state.difficulty}/>
                            {this.state.difficulty 
                            ?   <button
                                className='game-setup__start-btn game-setup__start-btn--active' 
                                onClick={() => this.props.onStart(this.state.difficulty)}>
                                Start game
                                </button>
                            :   <button
                                className='game-setup__start-btn' >
                                    Start game
                                </button>}
                        </div>
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
}

export default Home
