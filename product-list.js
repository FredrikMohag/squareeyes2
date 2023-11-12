// API URL for fetching the list of top movies
const apiUrl = "https://api.noroff.dev/api/v1/square-eyes";

// Selects the element where the top movie selection will be displayed
const topSelection = document.querySelector(".topselection");

// Displays a loading indicator while fetching the list of top movies
const loadingIndicatorTopSelection =
  document.getElementById("loading-indicator");

// Asynchronous function to fetch and display the list of top movies
async function getTopMovies() {
  try {
    // Displays the loading indicator before making the API call
    loadingIndicatorTopSelection.style.display = "block";

    // Fetches the list of top movies from the API
    const response = await fetch(apiUrl);

    // Checks if the API response is successful (HTTP status code 2xx)
    if (!response.ok) {
      // Throws an error if the API response is not successful
      throw new Error(
        "Failed to fetch top movies. Network response was not ok"
      );
    }

    // Parses the JSON response
    const results = await response.json();

    // Extracts the list of movies from the API response
    const movies = results;

    // Iterates over the list of movies to display each movie in the top selection
    for (let i = 0; i < movies.length; i++) {
      // Updates the topSelection element with a link and image for each movie
      topSelection.innerHTML += `<a href="lobster.html?id=${movies[i].id}"
        ><img class="lobster" src="${movies[i].image}" alt="${movies[i].title}"
     /></a>`;
    }
  } catch (error) {
    // Logs an error message if there is an issue fetching the list of top movies
    console.error("Error fetching top movies:", error.message);
  } finally {
    // Hides the loading indicator regardless of success or failure
    loadingIndicatorTopSelection.style.display = "none";
  }
}

// Calls the function to fetch and display the list of top movies when the page loads
getTopMovies();
