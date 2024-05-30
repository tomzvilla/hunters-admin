import React from 'react'

const Home = () => {

  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  return (
    <div>
      <h3>¡Hola!</h3>
      <h3>Actualmente son las {hour}:{min}</h3>
    </div>
  )
}

export default Home