import React, { Component } from 'react'
import './common.blocks/game.css' 
import './common.blocks/spinner.css'

export class Game extends Component {
    state = {
        question: this.props.question,
        timer: this.props.question.time,
        active: true,
        gameFinished: false,
        gameResult: ''
    }

    componentDidMount = () => {
        this.countDown = setInterval(() => {
            this.setState({timer: this.state.timer - 1})
            this.state.timer <= 0 && clearInterval(this.countDown)
        }, 1000);
        
        this.searchInput && this.searchInput.focus();
        console.log(this.searchInput)
    }

    componentWillUnmount = () => {
        clearInterval(this.countDown)
    }

    onAnswer = async (answer = this.state.answer) =>{
        this.setState({active: false})
        const res = await fetch(
        'https://internsapi.public.osora.ru/api/game/play',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')  
            },
            body: JSON.stringify({answer: answer , type_hard: this.props.difficulty, type: 2})
        })
        const responseJSON = await res.json()

        console.log(responseJSON)

        if(responseJSON.data.id){
            this.setState({
                gameFinished: true,
                gameResult: responseJSON.data
            })
        } else {
            this.setState({
                question: responseJSON.data,
                timer: responseJSON.data.time,
                active: true
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        
        this.onAnswer();
    }



    render() {
        if(this.state.gameFinished){
            return (
                <section className='game'>
                    <p className='game__score'>Score: {this.state.gameResult.points}</p>
                    <ul className='game__result-list'>
                        <li className='game__result-item' style={{fontWeight: 700}}>
                            <p className="game__result-question">Question</p>
                            <p className="game__result-answer">Answer</p>
                            <p className="game__result-correct">Correct</p>
                        </li>
                        {this.state.gameResult.questions.map((question, index) => (
                            <li key={index} className='game__result-item'>
                                <p className="game__result-question">{question.question}</p>
                                <p className="game__result-answer">{question.current_answer}</p>
                                <p className="game__result-correct">{question.answer}</p>
                            </li>
                        ))}
                    </ul>
                    <button className='game__end' onClick={this.props.onEnd}>Go Back</button>
                </section>
            )
        }
        
        return (
            <section className='game'>
                {this.state.active ? (
                <>
                    <p className='game__score'>Score: {this.state.question.points}</p>
                    <p className='game__timer'>Timer: {this.state.timer}</p>
                    <h3 className='game__question'>{`${this.state.question.question} = ?`}</h3>
                    {this.props.difficulty === '1' ?
                    (
                        <ul className='game__option-list'>
                            {this.state.question.options.map((option, index) => (
                            <li key={index} className='game__option' onClick={() => this.onAnswer(option)}>{option}</li>))}
                        </ul>
                    ) : (
                        <>
                            <form className='game__form' onSubmit={(e) => this.onSubmit(e)}>
                                <input 
                                    type="number" 
                                    className='game__input'
                                    ref={inputEl => (this.searchInput = inputEl)}
                                    required
                                    onChange={(e) => this.setState({answer: e.target.value})}/>
                            </form>
                            <p className='game__help'>Hit enter to submit</p>
                        </>
                    )}               
                    <button className='game__end' onClick={this.props.onEnd}>Go Back</button>
                </>)
                : <div className='spinner'></div>}
            </section>
        )
    }
}

export default Game
