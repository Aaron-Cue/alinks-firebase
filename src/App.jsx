import { useNavigate } from 'react-router-dom'

import './App.css'

function App() {
  const navigate = useNavigate()

  return (
    <>
      <header>
        Quiero mis A-links
        <button
          onClick={() => { navigate('/login') }}>
          Crear Cuenta
        </button>
      </header>
      <h1>alinks App</h1>
    </>
  )
}

export default App
