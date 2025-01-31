import React , { useState} from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';



export default function SecretPage() {
    const [msg, setMsg] = useState('🙈');
    const [id , setId] = useState();
    const navigate  = useNavigate();
    function handleChange(event){
        setId(event.target.value);
    }

    function handleClick() {
        fetch(`http://localhost:5000/secrets?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data[0].secret);
            setMsg(data[0].secret);
        })
        .catch((error) => {
            console.error("There was an error fetching the secret", error);
        });
    }
    function submitSecret(){
        navigate('/main');
    }
    return(
        <div className='container'>
            <h1>Secret Page</h1>
            <div className='secret_page'>
            <p>{msg}</p>
            </div>
            <input onChange={handleChange} type='number' placeholder='secret id' />
            <button onClick={handleClick} className='secretButton'>Find secret🙈</button>
            <button onClick={submitSecret} className='secretButton'>Submit secret🤫</button>
            <p>
                <Link to='/' className='link'>Logout</Link>
            </p>
        </div>
    );
}