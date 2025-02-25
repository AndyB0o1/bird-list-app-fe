import React, { useEffect, useState } from 'react'
import AuthService from '../../services/auth/AuthService.jsx'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await AuthService.login(email, password)
            alert('User logged in successfully')
            navigate("/mylist")

        } catch (error) {
            console.error(error);
            alert('Error logging in user')
        }
    }

    return (
        <>
            <h1 className="mt-4 p-2 bg-sky-700 text-white">Login below to see your list</h1>
            <form onSubmit={handleLogin}>
                <div className="my-1 flex gap-2 text-sky-700">
                    <label htmlFor="email">Email address:</label>
                    <input className="px-1 border rounded" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" required />
                </div>
                <div className="flex gap-2 text-sky-700">
                    <label htmlFor="password">Password:</label>
                    <input className="px-1 border rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>
                <button className="p-1 my-2 bg-sky-700 text-white rounded" type="submit">Login</button>
            </form>
        </>
    )
}