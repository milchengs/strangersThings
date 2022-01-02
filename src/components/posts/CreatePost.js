import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { createPost } from '../../api/apiHelpers'


function CreatePost({token}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [location, setLocation] = useState("On Request")
    const [willDeliver, setWillDeliver] = useState(false)
    const [postCreated, setPostCreated] = useState(false)

    const post = {
        title: title,
        description: description,
        price: price,
        location: location,
        willDeliver: willDeliver
    }
 
    async function submitHandler(event) {
        event.preventDefault()
        await createPost(token, post)
        setPostCreated(true)
    }

    return <div id="createPost">
        <Link to="/posts"><button>Back to All Posts</button></Link>
        <h2>Create Post</h2>
        {postCreated === false
        ? <form onSubmit={submitHandler}>
                <div className="formText">
                    <label>Title*</label>
                    <input 
                        type="text" 
                        required
                        onChange={(event) => {
                            setTitle(event.target.value)
                        }}
                    />
                </div>

                <div className="formText">
                    <label>Description*</label>
                    <textarea 
                        required
                        onChange={(event) => {
                            setDescription(event.target.value)
                        }}
                    />
                </div>

                <div className="formText">
                    <label>Price*</label>
                    <input 
                        type="text" 
                        required
                        onChange={(event) => {
                            setPrice(event.target.value)
                        }}
                    />
                </div>

                <div className="formText">
                    <label>Location</label>
                    <input 
                        type="text" 
                        onChange={(event) => {
                            setLocation(event.target.value)
                        }}
                    />
                </div>

                <div>
                    <input 
                        type="checkbox"
                        onChange={(event) => {
                            setWillDeliver(event.target.checked)
                        }}
                    />
                    <label>Willing to deliver?</label>
                </div>
                
                <button type="submit">Create New Post</button>
            </form>
        : <p>Created post: "{title}"</p>
        }
        
    </div>
}

export default CreatePost