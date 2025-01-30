import React from 'react'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import MainPage from './pages/mainPage'
import SecretPage from './pages/secretPage'
import{BrowserRouter,Routes,Route,} from "react-router-dom"

export default  function App() {
    return (
        <div>
                <BrowserRouter>
                    <Routes>
                        <Route index element = {<LoginPage></LoginPage>}></Route>
                        <Route path='/' element = {<LoginPage></LoginPage>}></Route>
                        <Route path='register' element = {<Register></Register>}></Route>
                        <Route path='main' element = {<MainPage></MainPage>}></Route>
                        <Route path='secretPage' element = {<SecretPage></SecretPage>}></Route>
                    </Routes>
                </BrowserRouter>
        </div>
)
}
