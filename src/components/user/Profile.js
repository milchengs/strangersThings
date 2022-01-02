import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfile } from '../../api/apiHelpers'

function Profile ({token, username}) {
    const [userObj, setUserObj] = useState({})

    useEffect( () => {
        async function fetchProfile() {
            setUserObj(await getProfile(token))
        }
        fetchProfile()
    }
    , [])

    return <div id="profile">
        <div id="profileHeader">
            <h2>Profile</h2>
            {userObj.data
            ? <p>Logged in as <span className="accent"><b>{userObj.data.username}</b></span></p>
            : null}
        </div>

        <h3>Inbox</h3>
        {userObj.data
        ? (userObj.data.posts).map((post) => {
            return <div key={post._id}>
                {(post.messages).map((message) => {
                    return <div key={message._id} className="message">
                        <p className="accent"><b>Sent from: </b>{message.fromUser.username}</p>
                        <p>Message: {message.content}</p>
                        {post.active === true
                        ? <Link to={`/posts/${post._id}`}><button>VIEW MY POST: {post.title}</button></Link> 
                        : <p className='deleted'>(deleted post)</p>
                        }
                        
                    </div>
                })}
            </div>
        })
        : null
        }

        <h3>Sent By Me</h3>
        {userObj.data
        ?(userObj.data.messages).filter((message) => {
            if (message.fromUser.username === username) {
                return message
            }
        }).map((message) => {
            return <div className="message" key={message._id}>
                <p className="sentFrom"><b>Sent by Me</b></p>
                <p><b>Message:</b> {message.content}</p>
                <Link to={`/posts/${message.post._id}`}><button>MESSAGE AGAIN: {message.post.title}</button></Link>
            </div>
        })
        : null
        }

    </div>
}

export default Profile