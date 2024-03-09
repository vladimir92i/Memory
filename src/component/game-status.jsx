import React from "react"
import Footer from "./footer"


const Game = () => {
return (
    console.log(cards),
    <section className="center">
            <div>
                <p>Boxing memory</p>
            <button onClick={() => shuffleCards()}>Nouvelle Partie</button>
        </div>
        <Footer nbTurn={nbTurn} />
    </section>
)
}
export default Game;