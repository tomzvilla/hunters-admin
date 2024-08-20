import React from 'react'

const Home = () => {

  const date = new Date();
  const hour = date.getHours().toString().padStart(2, '0');;
  const min = date.getMinutes().toString().padStart(2, '0');;
  return (
    <div>
      <h3>¡Hola!</h3>
      <h3>Actualmente son las {hour}:{min}</h3>
    </div>
  )
}

export default Home