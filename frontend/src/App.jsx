import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin' 
import CaptainSignup from './pages/CaptainSignup'
import UserContext, { UserDataContext } from './context/UserContext'
import Home from './pages/Home'




const App = () => {
    
const ans = UserContext(UserDataContext)
console.log(ans)

  return (
    <div >
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/login" element={<UserLogin/>} />
      <Route path="/signup" element={<UserSignUp/>} />
      <Route path="/captain-login" element={<CaptainLogin/>} />
      <Route path="/captain-signup" element={<CaptainSignup/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
    </div>
  )
}

export default App
