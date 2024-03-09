const Footer = ({ nbTurn, timer, niveau }) => {
  return (
      <footer>
          <p>Difficulté : {niveau}</p>
      <p>Nombre de tour : {nbTurn}</p>
      <p>timer : {timer}</p>
    </footer>
  )
}
export default Footer
