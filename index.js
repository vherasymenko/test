const place = document.querySelector('#placeForCard');
const firstUser = document.querySelector('#firstCallUser');
const successMessage = document.querySelector('#success-message');
let nodes;
let secondUser;
let getAnotherUser;
let user;

firstUser.addEventListener('click', showUser);

function changeStyle(){
    console.log('successMessage', successMessage);
        successMessage.style.visibility = 'hidden';
}

function getUser(){
    fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((results) => user = results.results[0])
};

function showUser(){
    place.innerHTML = `
        <div class="card"">
            <img class="card-img-top" src="${user.picture.large}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}</h5>
                    <br>
                    <ul>
                    <li><strong>Gender: </strong>${user.gender}</li>
                    <hr>
                    <li><strong>Email: </strong>${user.email}</li>
                    <hr>
                    <li><strong>Phone: </strong>${user.phone}</li>
                    <hr>
                    <li><strong>City: </strong>${user.location.city}</li>
                    <hr>
                    <li><strong>PostCode: </strong>${user.location.postcode}</li>
                    <hr>
                    <li><strong>Street: </strong>${user.location.street}</li>
                    <hr>
                    </ul>
                    <a href="#" id="getAnotherUser" class="btn btn-primary form-control">Get another user</a>
        </div>
    `;
    getUser();
    getAnotherUser = document.querySelector('#getAnotherUser').addEventListener('click', showUser);
    nodes = document.querySelectorAll('li');
    getLi();
}

function getLi(){
    for(let i = 0; i < nodes.length; i++){
        nodes[i].setAttribute('id', i);
        nodes[i].addEventListener('click', copyValue => {
            if(copyValue){
                let newField = document.createElement("textarea");                        
                let copy = nodes[i].innerText.split(":");
                copy = copy[1];
                document.body.appendChild(newField);
                newField.value = copy;
                newField.select();
                if(document.execCommand('copy')){
                    document.querySelector('#success-message').setAttribute("style", "visibility:visible;")
                    setTimeout(changeStyle, 3000);
                }
                document.body.removeChild(newField);
            }
        });
    }
}