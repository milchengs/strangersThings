const cohortName = '2111-FTB-ET-WEB-FT'
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`

//POSTS
export async function getAllPosts() {
    let response = await fetch(`${APIURL}/posts`)
    let data = response.json()

    return data
}

export async function createPost(token, post) {
  await fetch(`${APIURL}/posts`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      post
    })
  })
}

export async function editPost(token, id, post) {
  await fetch(`${APIURL}/posts/${id}`, {
    method: "PATCH",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      post
    })
  })
}

export async function deletePost(token, id) {
  await fetch(`${APIURL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

//MESSAGES
export async function createMessage(token, postId, content) {
  await fetch(`${APIURL}/posts/${postId}/messages`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      message: {
        content: content
      }
  })
  })
}

//USER
export async function registerUser(username, password) {
    let response = await fetch(`${APIURL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      })

      let result = await response.json()
    
      if (result.success) {
          alert(result.data.message)
          return result.data.token
      } else {
          alert(result.error.message)
      }  
}

export async function loginUser(username, password) {
    let response = await fetch(`${APIURL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      })

    let result = await response.json()

    if (result.success) {
        alert(result.data.message)
        return result.data.token
    } else {
        alert(result.error.message)
    }    
}

export async function testLogin(token) {
    let response = await fetch(`${APIURL}/test/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    let result = await response.json()

    if (result.success === true) {
        return true
    } else if (result.success === false) {
        return false
    }
}

export async function getProfile(token) {
    let response = await fetch(`${APIURL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    })

    let result = await response.json()

    return result
}