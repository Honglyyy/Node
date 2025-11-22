const container = document.querySelector('.container')
const inputForm = document.getElementById('inputForm')
const name = document.getElementById('name')
const age = parseInt(document.getElementById('age'))
const description = document.getElementById('description')
const postsArr = []
document.addEventListener("DOMContentLoaded", () => {
    renderPost()
})

async function renderPost(){
    try {
        const response = await fetch('http://localhost:4000/api/v1/post/getPosts')
        const posts = await response.json()

        console.log(posts);
        displayPost(posts)
        
    } catch (error) {
        console.error('Error fetching posts:', error)
    }
}

function displayPost(posts){
    // Clear container first to avoid duplicates
    container.innerHTML = ''
    
    posts.forEach(post => {
        container.innerHTML += 
            `<div class="post">
                <h3>${post.name}</h3>
                <p><strong>Age:</strong> ${post.age}</p>
                <p>${post.description}</p>
                <button onclick="editPost(${post._id})">Edit</button>
            </div>`
        
    })
}

async function addPost(e){
    e.preventDefault() 

    const nameVal = name.value;
    const ageVal = age.value;
    const descriptionVal = description.value;
    
    const formData = {
        name: nameVal,
        age: ageVal,
        description: descriptionVal
    }
    
    console.log('Sending:', formData) 
    
    try {
        const res = await fetch('http://localhost:4000/api/v1/post/create',{ 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        
        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const result = await res.json()
        console.log('Response:', result)
        
        alert("Post has been created!!")
        
        // Reset form properly
        inputForm.reset()
        
        // Refresh posts
        renderPost()
    } catch (error) {
        console.error(error)
        alert('Failed to create post. Please try again.')
    }
}
inputForm.addEventListener('submit', addPost)
