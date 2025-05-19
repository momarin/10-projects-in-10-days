/* O que nós precisamos:
    ♦ Função async com fetch para "buscar" uma receita aleatória no link especificado para isso na API;
    ♦ Função async com fetch para "buscar" detalhes de uma receita baseada em  sua ID (seu parametro). (poderia ser também por nome ou letra);
    ♦ Função async com fetch para "buscar" por uma receita ao digitar o nome (parametro) em um input de busca;
    ♦ Função para adicionar uma receita favoritada (com parametro 'meal') ao container de "Receitas favoritas" em uma Local Storage;
    ♦ Função para encontrar uma receita favoritada na Local Storage
*/

const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

getRandomMeal();
fetchFavMeals();

// FUNÇÕES
async function getRandomMeal() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const responseData = await response.json();
  const randomMeal = responseData.meals[0];

  //   console.log(randomMeal);

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  // console.log("Buscando ID:", id);
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const responseData = await response.json();
  const meal = responseData.meals[0];
  return meal;
}

async function getMealsBySearch(term) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );

  const responseData = await response.json();
  const meals = responseData.meals;
  //   console.log(meals);
  return meals;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
          <div class="meal-header">
            ${random ? `<span class="random"> Receita Aleatória </span>` : ""}
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
          </div>
          <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
    `;

  const btn = meal.querySelector(".meal-body .fav-btn");

  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("active")) {
      removeMealLocalStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLocalStorage(mealData.idMeal);
      btn.classList.add("active");
    }

    fetchFavMeals();
  });

  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  mealsEl.appendChild(meal);
}

// adicionando receita
function addMealLocalStorage(mealId) {
  const mealIds = getMealsLocalStorage();
  if (!mealIds.includes(mealId)) {
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
  }
}

// removendo receita
function removeMealLocalStorage(mealId) {
  const mealIds = getMealsLocalStorage();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

// pegando receitas da local storage
function getMealsLocalStorage() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

// adicionando a receita ao fav-container através do botão de coração
async function fetchFavMeals() {
  // limpando container
  favoriteContainer.innerHTML = "";

  const mealIds = getMealsLocalStorage();
  //   console.log("IDS no LS:", mealIds);

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    const meal = await getMealById(mealId);

    addMealFav(meal);
    // console.log(meal);
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
                <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
                /><span>${mealData.strMeal}</span>
                <button class="clear"><i class="fa-solid fa-xmark"></i></button>
    `;

  const btn = favMeal.querySelector(".clear");

  btn.addEventListener("click", () => {
    removeMealLocalStorage(mealData.idMeal);

    fetchFavMeals();
  });

  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  favoriteContainer.appendChild(favMeal);
}

// POP UP
function showMealInfo(mealData) {
  //limpando o anterior
  mealInfoEl.innerHTML = "";

  // atualizando as informações do meal-info
  const mealEl = document.createElement("div");

  // ingredientes e medidas
  // o número 20 é por conta da API. a listagem de ingredientes deles não é feita por array, e sim por 20 possíveis ingredientes listados separadamente. Esse "PARA" serve para checar os 20 possíveis ingredientes e armazenar os que existem, na respectiva Meal, num array para daí exibir no Pop UP
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
    />
    <p>
      ${mealData.strInstructions}
    </p>
    <h3>Ingredientes:</h3>
    <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join("")} 
    </ul>
  `;

  mealInfoEl.appendChild(mealEl);

  // mostrando o popup
  mealPopup.classList.remove("hidden");
}

searchBtn.addEventListener("click", async () => {
  // limpando as receitas anteriores
  mealsEl.innerHTML = "";
  const search = searchTerm.value;

  const meals = await getMealsBySearch(search);
  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
