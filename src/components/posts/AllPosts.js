import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../../api/apiHelpers'

function AllPosts ({posts, setPosts, username, isLoggedIn}) {
    const [searchTerm, setSearchTerm] = useState("")

    useEffect ( () => {
        async function loadPosts() {
            let response = await getAllPosts()
            setPosts(response.data.posts)
        }
        loadPosts()
    }, [])

    return <div id="allPosts">
        <nav id="allPostsNav">
            <h2>Posts</h2>

            <input
                placeholder="Search posts here"
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}
            />
            
            {isLoggedIn === true
            ? <Link to="/posts/create"><button>Create Post</button></Link>
            : null
            }
        </nav>
        
        {posts.filter((post) => {
            if (searchTerm === "") {
                return post
            } else if (
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
                || post.description.toLowerCase().includes(searchTerm.toLowerCase())
                || post.price.toLowerCase().includes(searchTerm.toLowerCase())
                || post.author.username.toLowerCase().includes(searchTerm.toLowerCase())
                || post.location.toLowerCase().includes(searchTerm.toLowerCase())
                ) 
            {
                return post
            }
        }).map((post) => {
            return <div key={post._id} className="post">
                <h3>Title: {post.title}</h3>
                <p className="accent"><b>Seller:</b> {post.author.username}</p>
                <p><b>Description:</b> {post.description}</p>
                <p><b>Price:</b> {post.price}</p>
                <p><b>Location:</b> {post.location}</p>
                <p><b>Willing to deliver?:</b> {post.willDeliver ? "Yes" : "No"}</p>
                
                <Link to={`/posts/${post._id}`}>
                    {post.author.username === username
                    ?<button className="viewButton">View</button>
                    :<button>Send Message</button>
                    }
                </Link>
            </div>
        })}

    </div>
}

export default AllPosts