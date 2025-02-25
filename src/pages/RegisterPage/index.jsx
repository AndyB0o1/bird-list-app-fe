import React, { useState } from 'react'
import AuthService from '../../services/auth/AuthService'
import { useNavigate } from 'react-router-dom'


export default function RegisterPage() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await AuthService.register(name, email, password, passwordConfirmation)
            alert('User registered successfully, please log in to access the site')
        } catch (error) {
            console.error(error)
            alert('Error registering user')
        }
    }

    return (
        <>
            <h1 className="mt-4 p-2 bg-sky-700 text-white text-sm md:text-base rounded">Register to start your list by completing the form below</h1>
            <form className="my-1 md:my-3 flex flex-col gap-4 px-3 text-sky-700 text-sm md:text-base" onSubmit={handleRegister}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Create username (required, max 10 characters)</label>
                    <input className="px-1 border rounded" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Username" required />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email address</label>
                    <input className="px-1 border rounded" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Create a password (required, min 6 and max 12 characters)</label>
                    <input className="px-1 border rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Confirm your password</label>
                    <input className="px-1 border rounded" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" required />
                </div>
                <input className="p-1 bg-sky-700 text-white rounded" type="submit" value="Register" />
            </form>
        </>
    )
}