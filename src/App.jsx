import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router'
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
// import router from './Router/Router'

function App() {

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer></ToastContainer>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
