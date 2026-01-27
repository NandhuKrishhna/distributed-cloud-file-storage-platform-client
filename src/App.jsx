import { Routes, Route } from 'react-router-dom'
import { MyDrive } from './Pages/MyDrive'
import { Login } from './Pages/Login'
import { NotFound } from './Pages/NotFound'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <>
    <Routes> 
      <Route path="/" element={<MyDrive />} />
      <Route path="/login" element={<Login />} />
      <Route path="/:id" element={<MyDrive />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App
