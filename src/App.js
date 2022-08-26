import React from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(defaultTenzi())
  
  React.useEffect(() => {
    let allHeld = dice.every(die => die.onHold)
    let allSameValue = dice.every(die => die.value === dice[0].value)
    if (allHeld && allSameValue) {
      setTenzies(prevTenzi => ({
        ...prevTenzi, 
        gameWon: true, 
        buttonText: "New Game"
      }))
    }
  }, [dice])
  
  function generateDie(prevNum = 0) {
    let randNum = Math.ceil(Math.random() * 6)
    while (prevNum === randNum) {
      randNum = Math.ceil(Math.random() * 6)
    }
    return {
      value: randNum, 
      onHold: false,
      id: nanoid()
    }
  }
  
  function defaultTenzi() {
    return {
      gameWon: false,
      counter: 0,
      buttonText: "Roll"
    }
  } 

  function allNewDice() {
    const newDice =[]
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie())
    }
    return newDice;  
  }

  function newGame() {
    setTenzies(defaultTenzi())
    setDice(allNewDice())
  }

  function rollDice() {
    setDice(oldDice =>
      oldDice.map(die => 
        die.onHold ? 
        die : generateDie(die.value)
    ))
    setTenzies(prevTenzi => ({...prevTenzi, counter: prevTenzi.counter+1 }))
}

  function holdDice(id) {
    setDice(prevDice => 
      prevDice.map(die => 
        die.id === id ? {...die, onHold: !die.onHold} : die
      )
    )
  }
  
  return (
      <main>
        <div className="confetti">
          {tenzies.gameWon && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        </div>
        <h1 className="title">{tenzies? 'You Won :)' : 'Tenzies'}</h1>
        <p className="instructions"><a href="https://youtu.be/dQw4w9WgXcQ">Roll</a> until all dice are the same.
        Click each die to freeze it at its current value between rolls.</p>
        <p>Counter: {tenzies.counter}</p>
        <div className='dice-container'>
          {dice.map(die => 
            (
              <Die 
                key={die.id} 
                value={die.value} 
                onHold={die.onHold}
                holdDice={() => holdDice(die.id)}
              />
            )
          )}
        </div>
        <button 
          className='roll-btn' 
          onClick={tenzies.gameWon? newGame : rollDice}
        >
          {tenzies.buttonText}
        </button>
        <small className='footer-text'>This is a React Project 
        by <a href='https://github.com/justinz99'>Justin Zhao</a> from 
        the <a href='https://scrimba.com/learn/learnreact'>Scrimba Course</a>.</small>
      </main>
  )
}