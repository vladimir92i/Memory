import React, { useState, useEffect } from 'react'
import SingleCard from './component/SingleCard'
import canelo from './img/canelo.jpg'
import ali from './img/ali.jpeg'
import crawford from './img/crawford.jpg'
import inoue from './img/inoue.jpg'
import foreman from './img/foreman.png'
import leonard from './img/leonard.jpg'
import Footer from './component/footer'
//import dosDeCarte from './img/dos_de_carte.png'

function App () {
  const [cards, setCard] = useState([])
  const [nbTurn, setNbTurn] = useState(0)
  const [Choice1, setChoice1] = useState(null)
  const [Choice2, setChoice2] = useState(null)
  const [intouchable, setIntouchable] = useState(false)
  const [timer, setTimer] = useState(0)
  const [win, setWin] = useState(false)
  const [niveau, setNiveau] = useState('Facile')

  const facile = [{ src: canelo }, { src: ali }]
  const moyen = [{ src: crawford }, { src: inoue }]
  const difficile = [{ src: leonard }, { src: foreman }]

  const shuffleCards = () => {
    let shuffleCards
    switch (niveau) {
      case 'Facile':
        shuffleCards = [...facile, ...facile]
        break
      case 'Moyen':
        shuffleCards = [...facile, ...moyen, ...facile, ...moyen]
        break
      case 'Difficile':
        shuffleCards = [
          ...facile,
          ...moyen,
          ...difficile,
          ...facile,
          ...moyen,
          ...difficile
        ]
        break
    }

    shuffleCards = shuffleCards
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random(), matched: false }))

    setChoice1(null)
    setChoice2(null)
    setWin(false)
    setTimer(0)
    setCard(shuffleCards)
    setNbTurn(0)
  }
  //incremente le nombre de tour pcq pk pas
  const increment_nbTurn = () => {
    let valTemp = nbTurn + 1
    setNbTurn(valTemp)
  }
  const chooseLevel = niveau => {
    setNiveau(niveau)
  }
  //check si deux cartes ont été sélectionnées
  const handleChoice = card => {
    Choice1 ? setChoice2(card) : setChoice1(card)
  }
  const resetTurn = () => {
    setChoice1(null)
    setChoice2(null)
    setIntouchable(false)

    increment_nbTurn()
  }
  const checkWin = () => {
    if (cards.every(card => card.matched === true) && nbTurn > 0) {
      setWin(true)
      alert(
        'Vous avez gagné le niveau : ' +
          niveau +
          ' en ' +
          nbTurn +
          ' tours et le tout en ' +
          timer +
          ' secondes'
      )
    }
  }
  //compare les cartes sélectionnées
  useEffect(() => {
    if (Choice1 && Choice2) {
      setIntouchable(true)
      if (Choice1.src === Choice2.src && Choice1.id !== Choice2.id) {
        setCard(prevCards => {
          return prevCards.map(card => {
            if (card.src === Choice1.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1100)
      }
    }
  }, [Choice1, Choice2])
  //verifie si le jeu est gagné
  useEffect(() => {
    checkWin()
  }, [cards])

  //timer
  useEffect(() => {
    let interval = null
    if (!win & nbTurn > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [win, timer])

  return (
    <div className='App'>
      <h1>Memory game</h1>
      <button onClick={shuffleCards}>Nouvelle partie</button>
      <div>
        <button onClick={() => chooseLevel('Facile')}>Facile</button>
        <button onClick={() => chooseLevel('Moyen')}>Moyen</button>
        <button onClick={() => chooseLevel('Difficile')}>Difficile</button>
      </div>
      <div className='list-card'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === Choice1 || card === Choice2 || card.matched}
            intouchable={intouchable}
          />
        ))}
      </div>
      <Footer niveau={niveau} nbTurn={nbTurn} timer={timer} />
    </div>
  )
}

export default App
