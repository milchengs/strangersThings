import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'

import {
    AuthHeader,
    UnauthHeader,
    Register,
    Login,
    Profile,
    AllPosts,
    CreatePost,
    EditPost,
    SinglePost
} from './components'

function Main () {
    const [posts, setPosts] = useState([])
    const [token, setToken] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")

    return <div id="main">
        {isLoggedIn === true
        ? <AuthHeader
            setToken={setToken}
            setIsLoggedIn={setIsLoggedIn}
        />
        : <UnauthHeader />
        }

        <Routes>
            <Route 
                path="/" 
                element=
                {isLoggedIn === true
                ? <Navigate replace to="/posts" />
                : <Navigate replace to="/login" />
                }
            />

            <Route 
                path="/register"
                element= 
                {isLoggedIn === true
                ? <Navigate replace to="/profile" />
                : <Register
                    token={token}
                    setToken={setToken}
                    setIsLoggedIn={setIsLoggedIn}
                    username={username}
                    setUsername={setUsername}
                />
                }
            />

            <Route 
                path="/login"
                element = 
                {isLoggedIn === true
                ? <Navigate replace to="/profile" /> 
                : <Login 
                    token={token}
                    setToken={setToken}
                    setIsLoggedIn={setIsLoggedIn}
                    username={username}
                    setUsername={setUsername}
                />
                }
            />
            
            <Route 
                path="/profile"
                element=
                {isLoggedIn === true
                ? <Profile
                    token={token}
                    isLoggedIn={isLoggedIn}
                    username={username}
                />
                : <Navigate replace to="/login" />
                }
            />

            <Route 
                path="/posts" 
                element={<AllPosts
                    posts = {posts}
                    setPosts = {setPosts}
                    username= {username}
                    isLoggedIn = {isLoggedIn}
                />}
            />

            <Route 
                path="posts/create"
                element=
                {isLoggedIn === true
                ? <CreatePost
                    token={token}
                />
                : <Navigate replace to="/login" />
                }
            />

            <Route
                path="posts/edit/:id"
                element=
                {isLoggedIn === true
                ? <EditPost 
                    token={token}
                    posts = {posts}
                    setPosts = {setPosts}
                />
                : <Navigate replace to="/login" />
                }
            />

            <Route 
                path="posts/:id"
                element=
                {isLoggedIn === true
                ? <SinglePost 
                    posts = {posts}
                    setPosts = {setPosts}
                    username = {username}
                    token = {token}
                />
                : <Navigate replace to="/login" />
                }
            />

        </Routes>
    </div>
}

ReactDOM.render(
    <Router><Main /></Router>,
    document.getElementById('app')
)