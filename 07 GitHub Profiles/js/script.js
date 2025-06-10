const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("momarin");

async function getUser(username) {
  const response = await fetch(API_URL + username);
  const responseData = await response.json();

  createUserCard(responseData);
  getRepos(username);
}

async function getRepos(username) {
  const response = await fetch(API_URL + username + "/repos");
  const responseData = await response.json();

  addReposToCard(responseData);
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul class="info">
                <li><i class="fa-regular fa-eye"></i> ${user.followers}</li>
                <li><i class="fa-solid fa-heart"></i> ${user.following}</li>
                <li><i class="fa-solid fa-comment"></i> ${user.public_repos}</li>
            </ul>

            <div id="repos"></div>
        </div>
    </div>
  `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;
      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
