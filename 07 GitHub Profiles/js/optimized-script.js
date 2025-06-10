/* ----------------------------------------------------------------------- */
// API CONFIGURATION
const GITHUB_API_URL = "https://api.github.com/users/";

/* ----------------------------------------------------------------------- */
// DOM ELEMENTS
const appContainer = document.getElementById("main");
const searchForm = document.getElementById("form");
const searchInput = document.getElementById("search");

/* ----------------------------------------------------------------------- */
// INITIALIZATION
fetchUserProfile("momarin");

/* ----------------------------------------------------------------------- */
// API FUNCTIONS
async function fetchUserProfile(username) {
  try {
    const userResponse = await fetch(`${GITHUB_API_URL}${username}`);
    const userData = await userResponse.json();
    
    if (!userResponse.ok) throw new Error(userData.message || "User not found");
    
    renderUserProfile(userData);
    fetchUserRepositories(username);
  } catch (error) {
    renderErrorMessage(error.message);
  }
}

async function fetchUserRepositories(username) {
  try {
    const reposResponse = await fetch(`${GITHUB_API_URL}${username}/repos`);
    const reposData = await reposResponse.json();
    
    if (reposData.length > 0) {
      renderUserRepositories(reposData);
    }
  } catch (error) {
    console.error("Failed to load repositories:", error);
  }
}

/* ----------------------------------------------------------------------- */
// RENDER FUNCTIONS
function renderUserProfile(user) {
  const profileCardHTML = `
    <div class="card">
      <div class="avatar-container">
        <img class="avatar" src="${user.avatar_url}" alt="${user.name || username}'s profile picture" />
      </div>
      <div class="user-info">
        <h2>${user.name || 'No name provided'}</h2>
        <p>${user.bio || 'No bio available'}</p>
        <ul class="user-stats">
          <li><i class="fa-regular fa-eye"></i> ${user.followers} followers</li>
          <li><i class="fa-solid fa-heart"></i> ${user.following} following</li>
          <li><i class="fa-solid fa-code-commit"></i> ${user.public_repos} repositories</li>
        </ul>
        <div id="repositories-container"></div>
      </div>
    </div>
  `;
  
  appContainer.innerHTML = profileCardHTML;
}

function renderUserRepositories(repositories) {
  const reposContainer = document.getElementById("repositories-container");
  
  repositories
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach(repo => {
      const repoLink = document.createElement("a");
      repoLink.className = "repository-link";
      repoLink.href = repo.html_url;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.textContent = repo.name;
      
      reposContainer.appendChild(repoLink);
    });
}

function renderErrorMessage(message) {
  appContainer.innerHTML = `
    <div class="error-card">
      <h2>Error</h2>
      <p>${message}</p>
    </div>
  `;
}

/* ----------------------------------------------------------------------- */
// EVENT LISTENERS
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = searchInput.value.trim();
  
  if (username) {
    fetchUserProfile(username);
    searchInput.value = "";
    searchInput.focus();
  }
});