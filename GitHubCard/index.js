/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
const entryPoint = document.querySelector('.cards');

// const followersArray = ["CameronAlvarado", "jonyonson", "allisonkydy", "jeffreywhitaker", "JulieGumerman", "BrityHemming", "RealWillBrooks"];

  // followersArray.forEach(username => {
  //   axios.get([`https://api.github.com/users/${username}`])
  //   .then( (response) => {
  //     console.log(response.data);
  //     entryPoint.appendChild(gitCard(response.data))
  //   })
  
// ------------------- stretch goal 1 success! --------------------------

// this creates a new array from my followers.
const URL = "https://api.github.com/users/CameronAlvarado/followers";
  axios.get(URL)
  .then( (response) => {
    console.log(response.data);
    response.data.forEach( (element) => {
      let newArray =[];
      newArray.push(element.login);
      // this loops through the new array and plugs the logins into the url.
      newArray.forEach(username => {
          axios.get([`https://api.github.com/users/${username}`])
          .then( (response) => {
            console.log(response.data);
            entryPoint.appendChild(gitCard(response.data))
          })
          .catch( (err) => {
            console.log(err);
          });
      });
    });
  })
  .catch( (err) => {
    console.log(err);
  })
  // this slices off "/followers" from the original URL;
  let newURL = URL.slice(0, -10);
  console.log(newURL);
  // this appends my card onto the page
  axios.get(newURL)
  .then( (response) => {
    console.log(response.data);
    entryPoint.appendChild(gitCard(response.data))
  })
  .catch( (err) => {
    console.log(err);
  });
// ---------------------------------------------------------------------
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function gitCard(obj) {

  // create elements
  let newCard = document.createElement('div');
  let newImg = document.createElement('img');
  let cardInfo = document.createElement('div');
  let name = document.createElement('h3');
  let username = document.createElement('p');
  let location = document.createElement('p');
  let profile = document.createElement('p');
  let profileLink = document.createElement('a');
  let followers = document.createElement('p');
  let following = document.createElement('p');
  let bio = document.createElement('p');
  
  // apply classes
  newCard.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');
  newImg.classList.add('cardImg');


  // sources
  newImg.src = obj.avatar_url;
  name.textContent = obj.name;
  username.textContent = [`Username: ${obj.login}`];
  location.textContent = obj.location;
  profile.textContent = "Profile: ";
  profileLink.href = obj.html_url;
  profileLink.textContent = profileLink;
  followers.textContent = [`Followers: ${obj.followers}`];
  following.textContent = [`Following: ${obj.following}`];
  bio.textContent = obj.bio;

  // append elements
  newCard.appendChild(newImg);
  newCard.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(profileLink);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  
  return newCard;
};

// let entryPoint = document.querySelector('.entry')

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

