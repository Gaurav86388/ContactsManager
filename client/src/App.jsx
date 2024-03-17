import Homepage from './home/Homepage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './home/Dashboard'


function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path='/access' element={<Dashboard />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
