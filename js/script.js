//overview div
const overviewDiv = document.querySelector(".overview");
//GitHub name
const username = "AlPoliakow";
//unordered list for repos
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector("#filter-repos");

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
  filterInput.classList.remove("hide");
  for (const repo of repos){
    const repoInfo = document.createElement("li");
    repoInfo.classList.add("repo");
    repoInfo.innerHTML=`<h3>${repo.name}</h3>`;
    repoList.append(repoInfo);
  }
};

//click event for repo list
repoList.addEventListener("click", function (e){
  if (e.target.matches("h3")){
    const repoName = e.target.innerText; 
    getRepoInfo(repoName);
  }
  });

// fetch repo data to allow for isolating properties
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

//display the specific repo data on the webpage
const displayRepoSpecificInfo = function (repoSpecificInfo, languages){
  repoDataSection.innerHTML="";
  repoDataSection.classList.remove("hide");

  const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `<h3>Name: ${repoSpecificInfo.name}</h3>
    <p>Description: ${repoSpecificInfo.description}</p>
    <p>Default Branch: ${repoSpecificInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${`https://www.github.com/${username}/${repoSpecificInfo.name}`}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  
    repoDataSection.append(repoDiv);
   repoSection.classList.add("hide");
   //show the view-repos button
   viewReposButton.classList.remove("hide");
  };

  viewReposButton.addEventListener("click", function (){
    repoSection.classList.remove("hide");
    repoDataSection.classList.add("hide");
    viewReposButton.classList.add("hide");
  });

  filterInput.addEventListener("input",function(e){
    //select entered text
    const inputText= e.target.value;
    // log it in the console
    console.log(inputText);
    //select all elements with the class of repo
    const repos = document.querySelectorAll(".repo");
    //convert input to lower case
    const lowerCaseInput = inputText.toLowerCase();
    // loop each repo through repo element
    for (const repo of repos){
      const repoLowerText = repo.innerText.toLowerCase();
      //Check to see if the lowercase repo text includes the lowercase search text.
      if (repoLowerText.includes(lowerCaseInput)){
        // If the repo contains the text, show it.
        repo.classList.remove("hide");
      } else {
        //If it doesn’t contain the text, hide the repo.
        repo.classList.add("hide");
      }
    }
  });