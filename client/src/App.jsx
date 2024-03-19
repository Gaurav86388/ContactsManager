import Homepage from './home/Homepage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './home/Dashboard'
import AlertBox from './components/AlertBox'
import FileHandleContextProvider from './context/Context'

function App() {

console.log('app rendered')
  return (
<FileHandleContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path='/access' element={<Dashboard />}/>
      <Route path='/test' element={<AlertBox />}/>
    </Routes>
    </BrowserRouter>
    </FileHandleContextProvider>
  )
}

export default App
