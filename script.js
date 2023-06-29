const userNameInput = document.getElementById("userName");
const showDetailsButton = document.getElementById("showDetails");
const profileInfoDiv = document.getElementById("profileInfo");
const repoInfoDiv = document.getElementById('reposInfo');
const sortContainer = document.querySelector(".sortBox");

showDetailsButton.addEventListener('click', async () => {
    const userName = userNameInput.value;

    //request data from Server : fetch API provides an interface for fetching resources
        const res = await fetch(`https://api.github.com/users/${userName}`)
        const data = await res.json(); 
        //Adding a validation if profile exists or not
        if(res.status == 404) {
            profileInfoDiv.innerHTML = "No profile exists";
            sortContainer.style.display = "none";
            repoInfoDiv.innerHTML = '';
        }
        else {
            sortContainer.style.display = "block";
            showProfile(data);
            showRepoInfo(userName);
        }
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
                <p>${data.followers} followers &nbsp; ${data.following} following </p>
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

        // console.log(projects);
    const sortProjects = projects.sort((a,b) => b.stargazers_count - a.stargazers_count);
    showProjects(sortProjects);

    const options = document.getElementById("options");
    options.addEventListener("change", () => {
        const selectedOption = options.value;
        console.log(selectedOption);
        let sortProjects;
        if(selectedOption === "stars") {
            sortProjects = projects.sort((a,b) => b.stargazers_count - a.stargazers_count);
        }
        else if(selectedOption === "forks") {
            sortProjects = projects.sort((a,b) => b.forks - a.forks);
        }
        else if(selectedOption === "size") {
            sortProjects = projects.sort((a,b) => b.size - a.size);
        }
        showProjects(sortProjects);
    });

    function showProjects(sortProjects) {
        repoInfoDiv.innerHTML = "";

        for(let i=0;i<sortProjects.length;i++) {
            repoInfoDiv.innerHTML += `
            <div class="card">  
            <div class="card-body">
                <div class="card-title">${sortProjects[i].name}</div>
                <div class="card-description">${sortProjects[i].description}</div>
                <div class="card-subHeading"> <span>${
                    sortProjects[i].language
                  }</span>
                  <span> <i class="fa-solid fa-code-fork"></i> ${
                    sortProjects[i].forks
                  }</span>
                  <span> <i class="fa-solid fa-star"></i> ${
                    sortProjects[i].stargazers_count
                  }</span>
                  <span>${sortProjects[i].size} Kb</span>
                  </div>
                
                <div class="card-text">
                    <button>
                        <a href=${sortProjects[i].html_url}>
                            Do checkout the project
                        </a>
                    </button>
                </div>        
            </div>
            </div>        
            `
        }
    }
    showProjects(projects);   
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

