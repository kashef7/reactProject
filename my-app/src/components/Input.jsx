import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Input(props) {
    const [username, setUsername] = useState("");
    const [check, setCheck] = useState(false);
    const [msg, setMsg] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setCPassword] = useState("");
    const [users, setUsers] = useState([{ username: "", password: "" , secret_id: "" }]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("There was an error fetching the users!", error);
            });
    }, []);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handleCPasswordChange(event) {
        setCPassword(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function randomId() {
        return  Math.floor(Math.random()*100000);
    }

    let id = randomId();

    function addUser(un, p) {
        fetch("/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: un, password: p , id: id})
        });
    }
    function handleClick(event) {
        if (event.target.name === "Register") {
            if (confirmPassword === password) {
                addUser(username, password);
                navigate('/main', { state: { username , id} });
            } else if (confirmPassword !== password) {
                console.log('password dont match');
                setCheck(true);
                setMsg("Password doesn't match");
            }
        } else {
            const userExists = users.some(user =>
                user.username === username && user.password === password
            );
            console.log(users);
            if (userExists) {
                console.log("Login successful!");
                let user = users.find(user => user.username === username);
                let id = user.secret_id;
                console.log(id);
                navigate('/main', { state: { username , id} });
            } else {
                console.log("Invalid username or password");
                setCheck(true);
                password === "" ? setMsg("Password field is empty") : setMsg("Invalid username or password");
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
            {check && <p className='msg'>{msg}</p>}
            <button name={props.header === 'Register' ? 'Register' : 'Login'} onClick={handleClick}>{props.type}</button>
            <p>
                <Link to={props.linkTo} className='link'>{props.linkHeader}</Link>
            </p>
        </div>
    );
}

