//overview div
const overviewDiv = document.querySelector(".overview");
//GitHub name
const username = "AlPoliakow";
// create an async function to fetch information from GitHub
const getGitHubData = async function (){
    const request = await fetch(`https://api.github.com/users/${username}`);
    //resolve JSON response
    const data = await request.json();
    //log out the response to the console
    console.log(data);
    displayUserInformation(data);
};

getGitHubData();

//function to display the fetched user information; should accept the JSON data as a parameter
const displayUserInformation = function (data){
    //create a new div and give it a class of "user-info";
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    //populate the div with the listed elements then use the JSON data to grab the relevant propertires to display
    userInfo.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url}/>
    </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    //append the div to the Overview div
    overviewDiv.append(userInfo); // no quotation marks
};