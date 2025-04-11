import { ToastContainer } from 'react-toastify'
import AppRoutes from './routes/index'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  )
}

export default App
