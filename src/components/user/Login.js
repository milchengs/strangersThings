import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser, testLogin } from '../../api/apiHelpers'

function Login ({
    token, 
    setToken, 
    setIsLoggedIn, 
    username, 
    setUsername
}) {
    const [password, setPassword] = useState("")
    
    useEffect (() => {
        async function authorize() {
            let testResult = await testLogin(token)
            setIsLoggedIn(testResult)
        }
        authorize()

    }, [token])

    async function submitHandler (event) {
        event.preventDefault()
        let result = await loginUser(username, password)
        setToken(result)
    }

    return <div className="loginRegister">
        <h2>Log In</h2>

        <form className="logRegForm" onSubmit={submitHandler}>
            <label>Username</label>
            <input 
                type="text"
                onChange={(event) => {
                    setUsername(event.target.value)
                }}
            />

            <label>Password</label>
            <input 
                type="password"
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
            />

            <button type="submit">Login</button>

            <Link to="/register">Don't have an account? Register here</Link>
        </form>
    </div>
}

export default Login