import React from 'react'
import Header from '../Header'
import Input from '../Input'
export default  function Register() {
    return (
        <div className='container'>
            <Header headerValue = 'Register page'></Header>
            <Input header = 'Register' linkTo = '/' type = 'Sign up' linkHeader = 'Login'></Input>
            
        </div>
)
}