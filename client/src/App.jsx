import Homepage from './home/Homepage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './home/Dashboard'
import Protected from './auth/Protected'
import FileHandleContextProvider from './context/Context'

function App() {

  return (
<FileHandleContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path='/access' element={<Protected>
        <Dashboard />
        </Protected>
          
    
    }/>
      
    </Routes>
    </BrowserRouter>
    </FileHandleContextProvider>
  )
}

export default App
