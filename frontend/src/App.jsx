import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import Update from './pages/Update'
import Transaction from './pages/Transaction'
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signin" element={<Signin />}/>
          <Route index path="/dashboard" element={<Dashboard />}/>
          <Route path="/send" element={<SendMoney />}/>
          <Route path='/update' element={<Update/>}/>
          <Route path='/transaction' element={<Transaction/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
