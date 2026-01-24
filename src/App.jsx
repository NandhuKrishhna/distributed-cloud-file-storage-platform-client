import { Routes, Route } from 'react-router-dom'
import { MyDrive } from './Pages/MyDrive'
import { NotFound } from './Pages/NotFound'

function App() {
  return (
    <Routes>  
      <Route path="/" element={<MyDrive />} />
      <Route path="/drive/*" element={<MyDrive />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
