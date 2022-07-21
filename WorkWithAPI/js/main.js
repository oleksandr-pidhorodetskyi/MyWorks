const url = 'https://jsonplaceholder.typicode.com/';
const containerJS = document.querySelector('.container-JS');
const containerFetch = document.querySelector('.container-Fetch');
const LoadJsBtn = document.querySelector('.button-js');
const LoadFetchBtn = document.querySelector('.button-fetch');
const loader = document.querySelector('#loading');
let arrAjax = [];


function displayLoading() {
    loader.classList.add('display');
    setTimeout(() => {
        loader.classList.remove('display');
    }, 5000);
}

function hideLoading() {
    loader.classList.remove('display');
}

LoadJsBtn.addEventListener('click', function() {
    getUsersAjax();
});


function createUsersAjax(arr){
    for (let i = 0; i < arr.length; i++) {
        const usersAjax = document.createElement('div');
        usersAjax.classList.add('container-JS__item');
        containerJS.appendChild(usersAjax);

        const usersAjax_text = document.createElement('p');
        usersAjax_text.classList.add('container-JS__text');
        usersAjax_text.innerText = arr[i].name;
        usersAjax.appendChild(usersAjax_text);
    }
}

function getUsersAjax(){
    const xhr = new XMLHttpRequest()
    displayLoading();
    xhr.open('GET', url+'users')
    xhr.responseType = 'json'

    xhr.onload = () => {
        if(xhr.status<300){
            hideLoading()
            arrAjax = xhr.response;
            createUsersAjax(arrAjax);
        }else {
            hideLoading()
            alert('Wrong staus');
        }
        
    }
    xhr.send()
}


const state = {
   posts: [],
   newPost: {
      title: ''
   },
   editPost: {}
}

const cleanData = () => {
   state.newPost.title = '';

   postTitle.value = '';
}

const editPost = (index) => {
    chamgeItems[index].classList.remove('hidden');
    const editeblePost = state.posts[index];

    state.editPost = editeblePost;
    
    postTitle[index].value = state.editPost.name;
}

const deletePost = (index) => {
   const editeblePost = state.posts[index];

   removePostRequest(editeblePost.id);

   state.posts.splice(index, 1);

   fillconeinerFetch(state.posts);
}

const changePost = (i) => {
    state.editPost.name = postTitle[i].value;
    return state.editPost.name;
}

const savePost = async () => {
    await updatePostRequest();
    cleanData();
    fillconeinerFetch(state.posts);
}

const createPost = (post, index) => `
   <div class="container-Fetch__item item-fetch">
        <p class="item-fetch__title">${post.name}</p>
        <div class="item-fetch__buttons">
            <button class="fetch-buttons__edit button" onclick="editPost(${index})">Edit</button>
            <button class="fetch-buttons__delete button" onclick="deletePost(${index})">Delete</button>
        </div>
        <div class="item-fetch__change hidden">
            <input type="text" class="item-fetch__input" onchange="changePost(${index})">
            <button class="item-fetch-button__save button" onclick="savePost()">Save</button>
        </div>
   </div>
`
let postTitle = [];

let addNewPost = [];
let chamgeItems = [];


const fillconeinerFetch = (posts) => {
   containerFetch.innerHTML = '';

   if (posts.length) {
      posts.forEach((post, index) => {
        containerFetch.innerHTML += createPost(post, index);
        return containerFetch.innerHTML;
    }
      );
      postTitle = Array.from(document.querySelectorAll('.item-fetch__input'));
      addNewPost = Array.from(document.querySelectorAll('.item-fetch-button__save'));
      chamgeItems = Array.from(document.querySelectorAll('.item-fetch__change'));
   }

}


LoadFetchBtn.addEventListener('click', async () => {
   await getPostsRequest();
   fillconeinerFetch(state.posts);
})



function getPostsRequest() {
    displayLoading();    
    return fetch(url+'users', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
        
    })
    
    .then((res) => res.json())
    .then((posts) => {
        hideLoading();
        state.posts = state.posts.concat(posts)
    })    
}

function updatePostRequest() {
    displayLoading(); 
    return fetch(url+'users/'+ state.editPost.id, {
        method: 'PUT',
        body: JSON.stringify(state.editPost),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        hideLoading();
        data
    })
}

function removePostRequest(id) {
    displayLoading(); 
    return fetch(url+'users/' + id, {
        method: 'DELETE' 
    })   
    .then((res) => {
        hideLoading();
        res.json() 
}) 
}