//overview div
const overviewDiv = document.querySelector(".overview");
//GitHub name
const username = "AlPoliakow";
//unordered list for repos
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
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

repoList.addEventListener("click", function (e){
  if (e.target.matches("h3")){
    const repoName = e.target.innerText; //to prevent calling a variable from a different function
    getRepoInfo(repoName);
  }
  });

const getRepoInfo = async function (repoName){
  const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); 
  const repoSpecificInfo = await fetchRepoInfo.json();
  console.log(repoSpecificInfo)
  //fetch languages
  const fetchLanguages = await fetch(repoSpecificInfo.languages_url); 
  console.log(fetchLanguages);
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  //add language to empty array
  const languages = [];
  // add each language to the array
  for(const language in languageData){
    languages.push(language);
  }
  console.log(languages);
  displayRepoSpecificInfo(repoSpecificInfo, languages);
};

const displayRepoSpecificInfo = function (repoSpecificInfo, languages){
  //clear and show the section
  repoDataSection.innerHTML="";
  repoDataSection.classList.remove("hide");
  //create div with copied sections
  const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `<h3>Name: ${repoSpecificInfo.name}</h3>
    <p>Description: ${repoSpecificInfo.description}</p>
    <p>Default Branch: ${repoSpecificInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${`https://www.github.com/${username}/${repoSpecificInfo.name}`}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataSection.append(repoDiv);
    //hide the ".repos" section
   repoSection.classList.add("hide");
  };

