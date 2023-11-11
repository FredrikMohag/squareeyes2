const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://api.noroff.dev/api/v1/square-eyes/" + id;
console.log(url);

const loadingIndicator = document.getElementById("loading-indicator");
loadingIndicator.style.display = "block";

const titleDiv = document.querySelector(".lobster-content");

async function getMovies() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const results = await response.json();
    console.log(results.title);
    titleDiv.innerHTML = results.title;

    const infoDiv = document.querySelector(".-info");
    infoDiv.innerHTML = `<div>
      <h2 class="lobster-info">RATING</h2>
      <p class="lobster-info">${results.rating}</p>
    </div>
    <div>
      <h2 class="lobster-info">RELEASED</h2>
      <p class="lobster-info">${results.released}</p>
    </div>
    <div>
      <h2 class="lobster-info">PRICE</h2>
      <p class="lobster-info">${results.price}</p>
    </div>
    <div>
      <h2 class="lobster-info">GENRE</h2>
      <p class="lobster-info">${results.genre}</p>
    </div>
    <div>
      <h2 class="lobster-info">DESCRIPTION</h2>
      <p class="lobster-plot">${results.description}"</p>
    </div>`;

    const imageDiv = document.querySelector(".images-lobster");
    imageDiv.innerHTML = `
      <div class="images-lobster">
        <img src="${results.image}" alt="Movie Poster" class="movielob">
      </div>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loadingIndicator.style.display = "none";
  }
}

getMovies();
