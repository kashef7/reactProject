import React from 'react';
import { useLocation } from 'react-router-dom';

export default function MainPage() {
    const location = useLocation();
    const { username } = location.state || { username: 'Guest' };

    return (
        <div className='container'>
            <div className='secret'>
            <h1>Hello {username}</h1>
            <p>Welcome to the main page</p>
            <textarea rows="4" cols="30" placeholder='say your secret' type='text' />
            </div>

            <button className='secretButton'>Submit secret</button>
        </div>
    );
}
