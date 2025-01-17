import React from 'react'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import{BrowserRouter,Routes,Route,} from "react-router-dom"

export default  function App() {
    return (
        <div>
                <BrowserRouter>
                    <Routes>
                        <Route index element = {<LoginPage></LoginPage>}></Route>
                        <Route path='/' element = {<LoginPage></LoginPage>}></Route>
                        <Route path='register' element = {<Register></Register>}></Route>
                    </Routes>
                </BrowserRouter>
        </div>
)
}
