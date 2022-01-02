import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser, testLogin } from '../../api/apiHelpers'

function Register ({
    token,
    setToken,
    setIsLoggedIn,
    username,
    setUsername
}) {
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")

    async function submitHandler (event) {
        event.preventDefault()
        let result = await registerUser(username, password)
        setToken(result)
    }

    useEffect (() => {
        async function authorize() {
            let testResult = await testLogin(token)
            setIsLoggedIn(testResult)
        }
        authorize()
    }, [token])

    return <div className="loginRegister">
        <h2>Register</h2>

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

            <label>Re-enter Password</label>
            <input 
                type="password"
                onChange={(event) => {
                    setPasswordCheck(event.target.value)
                }}
            />

            {password === passwordCheck
            ? <button 
                type="submit"
            >Register
            </button>
            : <>
            <p>Passwords do not match.</p>
            <button 
                type="submit"
                disabled
            >Register
            </button>
            </>
            }

            <Link to="/login">Already have an account? Log in here</Link>
        </form>
    </div>
}

export default Register