import '../css/card.css'
import dosDeCarte from '../img/dos_de_carte.png'

const SingleCard = ({
  card,
  handleChoice,
  flipped,
  intouchable,
  chooseLevel
}) => {
  const handleClick = () => {
    if (!intouchable) {
      handleChoice(card)
    }
  }

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img className='Face' src={card.src} />
        <img className='Dos' onClick={handleClick} src={dosDeCarte} />
      </div>
    </div>
  )
}

export default SingleCard
