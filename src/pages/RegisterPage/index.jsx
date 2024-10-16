import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage({ apiBaseUrl }) {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const newBirder = {
            username: username,
            password: password
        }

        fetch(apiBaseUrl + '/birders', {
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newBirder)
        }).then(response => {
            if (response.status === 201) {
                navigate("/user_added")
            }
            else {
                response.json().then(newBirder => {
                    const usernameErrorsString = responseBody.errors.username?.join("\n") ?? ''
                    const passwordErrorsString = responseBody.errors.password?.join("\n") ?? ''
                    alert("Adding the birder failed: \n"
                        + usernameErrorsString + "\n"
                        + passwordErrorsString + "\n"
                    )
                })
            }
        })
    }

    return (
        <>
            <h1 className="mt-4 p-2 bg-sky-700 text-white">Register to start your list by completing the form below</h1>
            <form className="my-3 flex flex-col gap-4 px-3" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Create username (required, max 10 characters)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="username" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Create a password (required, max 12 characters)</label>
                    <input className="p-1 border border-sky-700 rounded" type="text" id="password" name="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <input className="bg-sky-700 text-white p-1" type="submit" value="Register" />
            </form>
        </>
    )
}