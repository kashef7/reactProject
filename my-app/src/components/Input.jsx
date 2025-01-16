import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProvider } from './UserProvider'

export default function Input(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setCPassword] = useState("");
    const [users, setUsers] = useState([{ username: "", password: "" }]);

    useEffect(() => {
        console.log(users);
    }, [users]);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handleCPasswordChange(event) {
        setCPassword(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleClick(event) {
        if(event.target.name === "Register"){
            if(confirmPassword === password){
                setUsers(prevUsers => [
            ...prevUsers,
            { username: username, password: password }
        ]);
            }
            else if(confirmPassword !== password){
                console.log('password dont match');
            }
        }
        else{
            const userExists = users.some(user => 
                user.username === username && user.password === password
            );
            console.log(users);
            if (userExists) {
                console.log("Login successful!");
            } else {
                console.log("Invalid username or password");
            }
        }
        
    }

    return (
        <div className='form'>
            <h1 className='header'>{props.header}</h1>
            <input placeholder='Username' id='username' type='text' onChange={handleUsernameChange}></input>
            <input placeholder='Password' id='password' type='password' onChange={handlePasswordChange}></input>
            {props.header === "Register" && (
                <input placeholder='Confirm Password' id='confirmPassword' type='password' onChange={handleCPasswordChange}></input>
            )}
            <button name={props.header==='Register'?'Register':'Login'} onClick={handleClick}>{props.type}</button>
            <p>
                <Link to={props.linkTo} className='link'>{props.linkHeader}</Link>
            </p>
        </div>
    );
}
