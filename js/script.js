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
};

getGitHubData();