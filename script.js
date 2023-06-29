const userNameInput = document.getElementById("userName");
const showDetailsButton = document.getElementById("showDetails");
const profileInfoDiv = document.getElementById("profileInfo");
const repoInfoDiv = document.getElementById('reposInfo');

showDetailsButton.addEventListener('click', async () => {
    const userName = userNameInput.value;

    //request data from Server : fetch API provides an interface for fetching resources
    const res = await fetch(`https://api.github.com/users/${userName}`)
        const data = await res.json(); 
        showProfile(data);
        showRepoInfo(userName);
})

function showProfile(data) {
        // console.log(data);
        profileInfoDiv.innerHTML = `<div class="card">
        <div class="card-img">
            <img src=${data.avatar_url} alt=${data.name}>
        </div>
        <div class="card-body">
            <div class="card-title">${data.name}</div>
            <div class="card-subHeading">${data.login}</div>
            <div class="card-text">
                <p>${data.bio}</p>
                <p>${data.followers} followers &nbsp; ${data.following} following
            </div>        
        </div>
        </div>
        
        <button>
                        <a href=${data.html_url}>
                        Do checkout Profile
                    </a>
                </button>
        `
}

async function showRepoInfo(userName) {
    const res = await fetch(`https://api.github.com/users/${userName}/repos`)
    const projects = await res.json();

        console.log(projects);
        for(let i=0;i<projects.length;i++) {
            repoInfoDiv.innerHTML += `
            <div class="card">  
            <div class="card-body">
                <div class="card-title">${projects[i].name}</div>
                <div class="card-subHeading">${projects[i].language}</div>
                <div class="card-text">
                    <button>
                        <a href=${projects[i].html_url}>
                            Do checkout the project
                        </a>
                    </button>
                </div>        
            </div>
            </div>        
            `
        } 
}






// function showRepoInfo(userName) {
//     fetch(`https://api.github.com/users/${userName}/repos`)
//     .then(res => res.json())
//     .then(projects => {
//         console.log(projects);
//         for(let i=0;i<projects.length;i++) {
//             repoInfoDiv.innerHTML += `
//             <div class="card">  
//             <div class="card-body">
//                 <div class="card-title">${projects[i].name}</div>
//                 <div class="card-subHeading">${projects[i].language}</div>
//                 <div class="card-text">
//                     <button>
//                         <a href=${projects[i].html_url}>
//                             Do checkout The project
//                         </a>
//                     </button>
//                 </div>        
//             </div>
//             </div>        
//             `
//         } 
//     })
// }

// showDetailsButton.addEventListener('click', () => {
//     const userName = userNameInput.value;

//     //request data from Server : fetch API provides an interface for fetching resources
//     fetch(`https://api.github.com/users/${userName}`)
//         .then((res) => res.json())
//         .then((data) => {
//             // console.log(data);
//             profileInfoDiv.innerHTML = `<div class="card">
//             <div class="card-img">
//                 <img src=${data.avatar_url} alt=${data.name}>
//             </div>
//             <div class="card-body">
//                 <div class="card-title">${data.name}</div>
//                 <div class="card-subHeading">${data.login}</div>
//                 <div class="card-text">
//                     <p>${data.bio}</p>
//                     <p>${data.followers} followers &nbsp; ${data.following} following
//                 </div>        
//             </div>
//             </div>
            
//             <button>
//                             <a href=${data.html_url}>
//                             Do checkout Profile
//                         </a>
//                     </button>
//             `

//             showRepoInfo(userName);
//         })
// })

