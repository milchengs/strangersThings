import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllPosts, deletePost, createMessage } from '../../api/apiHelpers'

function SinglePost ({posts, setPosts, username, token}) {
    const [content, setContent] = useState({})
    const [disabled, setDisabled] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)
    const { id } = useParams()
    
    useEffect ( () => {
        async function loadPosts() {
            let response = await getAllPosts()
            setPosts(response.data.posts)
        }
        loadPosts()
    }, [])

    async function deleteHandler(event) {
        event.preventDefault()
        await deletePost(token, id)
        setIsDeleted(true)
    }

    async function sendMessageHandler(event) {
        event.preventDefault()
        await createMessage(token, id, content)
        setDisabled(true)
        setFeedbackMessage("Message sent!")
    }

   return <div className="singlePost">
       <Link to="/posts"><button>Back to All Posts</button></Link>

       {posts.filter((post) => {
           if (id === post._id) {
               return post
           }
       }).map((post, index)=> {
           return <div key={index}>
           {isDeleted === false
            ? <div key={post._id}>
                <h3>Title: {post.title}</h3>
                <p className="accent"><b>Seller: {post.author.username}</b></p>
                <p><b>Description:</b> {post.description}</p>
                <p><b>Price:</b> {post.price}</p>
                <p><b>Location: </b>{post.location}</p>

                {post.author.username === username
                ? <div className="editDeleteButtons">
                    <Link to={`/posts/edit/${post._id}`}>
                        <button>Edit</button>
                    </Link>

                    <button
                        onClick={deleteHandler}
                        className="deleteButton"
                    >Delete
                    </button>
                </div>
                : <form>
                    <textarea
                        placeholder="Type message here"
                        onChange={(event)=> {
                            setContent(event.target.value)
                        }}
                        disabled = {disabled}
                    />
                    <button
                        type="submit"
                        onClick={sendMessageHandler}
                        disabled = {disabled}
                    >Send Message</button>
                    <p className="accent">{feedbackMessage}</p>
                </form>
                }   
            </div>
            : <div>
                <p><b>{post.title}</b> has been deleted</p>
            </div>
            }
           </div>
       })
       }

   </div> 
}

export default SinglePost