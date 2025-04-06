import { ToastContainer } from 'react-toastify'
import AppRoutes from './routes/index'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  )
}

export default App
