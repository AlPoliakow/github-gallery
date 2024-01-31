//overview div
const overviewDiv = document.querySelector(".overview");
//GitHub name
const username = "AlPoliakow";
//unordered list for repos
const repoList = document.querySelector(".repo-list");
const filterRepos = document.querySelector("#filter-repos");

//function to fetch user data from GitHub
const getUserData = async function (){
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    console.log(data);
    displayUserInformation(data);
};

getUserData();


//display the fetched user information
const displayUserInformation = function (data){
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url}/>
    </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overviewDiv.append(userInfo); 
    getRepoData(username);
};

//function to fetch repo data from GitHub
const getRepoData = async function (username) {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`); 
  const repoData = await fetchRepos.json();
  console.log(repoData);
  displayRepoData(repoData);
};


// display the fetched repo data
const displayRepoData = function(repos){ 
  for (const repo of repos){
    const repoInfo = document.createElement("li");
    repoInfo.classList.add("repo");
    repoInfo.innerHTML=`<h3>${repo.name}</h3>`;
    repoList.append(repoInfo);
  }
};