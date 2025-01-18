import React from 'react';
import { useLocation } from 'react-router-dom';

export default function MainPage() {
    const location = useLocation();
    const { username } = location.state || { username: 'Guest' };

    return (
        <div>
            <h1>Hello {username}</h1>
            <p>Welcome to the main page</p>
        </div>
    );
}
