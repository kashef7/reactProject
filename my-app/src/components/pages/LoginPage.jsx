import React from 'react'
import Header from '../Header'
import Input from '../Input'

export default  function LoginPage() {
    return (
        <div className='container'>
            <Header headerValue = 'Login page'></Header>
            <Input header = 'Login' linkTo = 'register' type = 'Login' linkHeader = 'Register'></Input>
        </div>
)
}