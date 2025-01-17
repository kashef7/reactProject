import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Input(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setCPassword] = useState("");
    const [users, setUsers] = useState([{ username: "", password: "" }]);

    // Fetch users from the backend when the component mounts
    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((response) => response.json()) // Parse the JSON from the response
            .then((data) => {
                setUsers(data); // Update the users state with the fetched data
            })
            .catch((error) => {
                console.error("There was an error fetching the users!", error); // Log any errors
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

    // Add a new user to the backend
    function addUser(un, p) {
        fetch("http://localhost:5000/add", {
            method: "POST", // Specify the request method as POST
            headers: {
                "Content-Type": "application/json" // Set the content type to JSON
            },
            body: JSON.stringify({ username: un, password: p }) // Convert the user data to a JSON string
        });
    }

    function handleClick(event) {
        if (event.target.name === "Register") {
            if (confirmPassword === password) {
                addUser(username, password); // Call addUser function if passwords match
            } else if (confirmPassword !== password) {
                console.log('password dont match');
            }
        } else {
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
            <button name={props.header === 'Register' ? 'Register' : 'Login'} onClick={handleClick}>{props.type}</button>
            <p>
                <Link to={props.linkTo} className='link'>{props.linkHeader}</Link>
            </p>
        </div>
    );
}
