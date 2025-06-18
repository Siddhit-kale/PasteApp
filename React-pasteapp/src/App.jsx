import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Pastes from './components/Pastes'
import ViewPates from './components/ViewPates'

const router = createBrowserRouter([
  {
    path: "/",
    element:
    <div>
      <Navbar />
      <Home />
    </div>
  },
  {
    path: "/pastes",
    element:
    <div>
      <Navbar />
      <Pastes />
    </div>
  },
  {
    path: "/pastes/:id",
    element:
    <div>
      <Navbar />
      <ViewPates />
    </div>
  },

])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
