import React, { useEffect, useState } from 'react'
import './App.css'
import Login from './view/login/login'
import Home from './view/homepage/homepage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { URLSearchParams } from 'url'

function App() {
  const [isLogin, setisLogin] = useState(false)
  const navigate = useNavigate()
  //做某些事情的時候切換到Count頁面
  useEffect(() => {
    if (isLogin) {
      navigate('/home')
    } else {
      navigate('/login')
    }
  }, [isLogin])
  useEffect(() => {
    if (window.location.search.includes('?code')) {
      setisLogin(true)
    }
    else{
      setisLogin(false)
    }
  })

  return (
    <div className="app">
      <Routes>
        <Route path="/"></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  )
}

export default App
