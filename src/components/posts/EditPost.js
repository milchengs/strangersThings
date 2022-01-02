import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getAllPosts, editPost } from '../../api/apiHelpers'

function EditPost ({token, posts, setPosts}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [location, setLocation] = useState("On Request")
    const [willDeliver, setWillDeliver] = useState(false)
    const [postEdited, setPostEdited] = useState(false)
    const { id } = useParams()

    const post = {
        title: title,
        description: description,
        price: price,
        location: location,
        willDeliver: willDeliver
    }

    useEffect ( () => {
        async function loadPosts() {
            let response = await getAllPosts()
            setPosts(response.data.posts)
        }
        loadPosts()
    }, [])

    async function submitHandler(event) {
        event.preventDefault()
        await editPost(token, id, post)
        setPostEdited(true)
    }

    return <div id="editPost">
        <Link to="/posts"><button>Back to All Posts</button></Link>
        <h2>Edit Post</h2>

        {posts.filter((post) => {
            if (id === post._id) {
                return post
            }
        }).map((post, index) => {
            return <div key={index}>
            {postEdited === false
            ? <form onSubmit={submitHandler}>
                <div className="formText">
                    <label>Title*</label>
                    <input 
                        type="text" 
                        required
                        defaultValue = {post.title}
                        onChange={(event) => {
                            setTitle(event.target.value)
                        }}
                    />
                </div>

                <div className="formText">
                    <label>Description*</label>
                    <textarea 
                        required
                        defaultValue = {post.description}
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
                        defaultValue = {post.price}
                        onChange={(event) => {
                            setPrice(event.target.value)
                        }}
                    />
                </div>

                <div className="formText">
                    <label>Location</label>
                    <input 
                        type="text" 
                        defaultValue= {post.location}
                        onChange={(event) => {
                            setLocation(event.target.value)
                        }}
                    />
                </div>

                <div>
                    <input 
                        type="checkbox"
                        defaultChecked = {post.willDeliver}
                        onChange={(event) => {
                            setWillDeliver(event.target.checked)
                        }}
                    />
                    <label>Willing to deliver?</label>
                </div>
                
                <button type="submit">Edit Post</button>
            </form>
            : <p>Edited post: <b>"{title}"</b></p>
            }
            </div>
        })
        }
        
    </div>
}

export default EditPost