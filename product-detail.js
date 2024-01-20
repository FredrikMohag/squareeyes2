// Extracts the query string parameters from the URL
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

// Retrieves the 'id' parameter from the query string
const id = params.get("id");

// Constructs the URL for fetching data from the API using the extracted 'id'
const url = "https://api.noroff.dev/api/v1/square-eyes/" + id;

// Displays a loading indicator while fetching data
const loadingIndicator = document.getElementById("loading-indicator");
loadingIndicator.style.display = "block";

// Selects the element where the movie title will be displayed
const titleDiv = document.querySelector(".lobster-content");

// Asynchronous function to fetch and display movie details
async function getMovies() {
  try {
    // Fetches data from the API
    const response = await fetch(url);

    // Checks if the response is successful (HTTP status code 2xx)
    if (!response.ok) {
      // Throws an error if the response is not successful
      throw new Error("Failed to fetch data. Network response was not ok");
    }

    // Parses the JSON response
    const results = await response.json();

    // Updates the movie title on the page
    titleDiv.innerHTML = results.title;

    // Selects the element where additional movie information will be displayed
    const infoDiv = document.querySelector(".-info");

    // Updates additional movie information on the page
    infoDiv.innerHTML = `<div>
      <p class="lobster-info">RATING</p>
      <p class="lobster-info">${results.rating}</p>
    </div>
    <div>
      <p class="lobster-info">RELEASED</p>
      <p class="lobster-info">${results.released}</p>
    </div>
    <div>
      <p class="lobster-info">PRICE</p>
      <p class="lobster-info">${results.price}</p>
    </div>
    <div>
      <p class="lobster-info">GENRE</p>
      <p class="lobster-info">${results.genre}</p>
    </div>
    <div>
      
      <p class="lobster-plot">${results.description}"</p>
    </div>`;

    // Selects the element where the movie poster image will be displayed
    const imageDiv = document.querySelector(".images-lobster");

    // Updates the movie poster image on the page
    imageDiv.innerHTML = `
      <div class="images-lobster">
        <img src="${results.image}" alt="Movie Poster" class="movielob">
      </div>
    `;
  } catch (error) {
    // Logs an error message if there is an issue fetching data
    console.error("Error fetching data:", error.message);
  } finally {
    // Hides the loading indicator regardless of success or failure
    loadingIndicator.style.display = "none";
  }
}

// Calls the function to fetch and display movie details when the page loads
getMovies();
