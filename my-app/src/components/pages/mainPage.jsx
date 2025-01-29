import React , { useState} from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';

export default function MainPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [check, setCheck] = useState(false);
    const [msg, setMsg] = useState("");
    const { username  , id} = location.state || { username: 'Guest' };
    const [secret , setSecret] = useState('');

    function handleSecretChange(event){
        setSecret(event.target.value);
    }

    function submitSecret(){
        fetch("http://localhost:5000/addSecret", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ secret: secret , id: id})
        }).then(data =>{
            setCheck(true);
            setMsg("Secret submitted successfully");
            setSecret('');
            setTimeout(() => {
                setCheck(false);
            }, 3000);
        });
    };

    function findSecret(){
        navigate('/secretPage');
    }

    return (
        <div className='container'>
            <div className='secret'>
            <h1>Hello {username}</h1>
            <p>Welcome to the main page</p>
            <p>Your secret id is {id}</p>
            <textarea onChange={handleSecretChange} rows="4" cols="30" value={secret} placeholder='say your secret' type='text' />
            {check && <p className='msg'>{msg}</p>}
            </div>
            <button onClick={submitSecret} className='secretButton'>Submit secret🤫</button>
            <button onClick={findSecret} className='secretButton'>Find secret🙈</button>
            <p>
                <Link to='/' className='link'>Logout</Link>
            </p>
        </div>
    );
}
