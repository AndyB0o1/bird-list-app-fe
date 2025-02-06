import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth/AuthService.jsx';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(email, password);
            alert('User logged in successfully');
        } catch (error) {
            console.error(error);
            alert('Error logging in user');
        }
    };

    return (
        <>
            <h1 className="mt-4 p-2 bg-sky-700 text-white">Login below to see your list</h1>
            <form onSubmit={handleLogin}>
                <div className="flex gap-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <div className="flex gap-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );
}