// API URL for fetching the list of top movies
const apiUrl = "https://www.haakansson.no/wp-json/wc/store/products";

// Selects the element where the top movie selection will be displayed
const topClothing = document.querySelector(".topclothing");

// Displays a loading indicator while fetching the list of top movies
const loadingIndicatorClothing = document.getElementById("loading-indicator");

// Asynchronous function to fetch and display the list of top movies
async function getTopClothing() {
  try {
    // Displays the loading indicator before making the API call
    loadingIndicatorClothing.style.display = "block";

    // Fetches the list of top movies from the API
    const response = await fetch(apiUrl);

    // Checks if the API response is successful (HTTP status code 2xx)
    if (!response.ok) {
      // Throws an error if the API response is not successful
      throw new Error(
        "Failed to fetch top clothing. Network response was not ok"
      );
    }

    // Parses the JSON response
    const results = await response.json();

    // Extracts the list of movies from the API response
    const clothing = results;

    // Clears existing content
    topClothing.innerHTML = "";

    // Loop through each clothing item and create an element
    for (let i = 0; i < clothing.length; i++) {
      topClothing.innerHTML += `<a href="clothing.html?id=${clothing[i].id}"
        ><img class="clothing" src="${clothing[i].images[0].src}" alt="${clothing[i].name}"
     /></a>`;
    }
  } catch (error) {
    // Logs an error message if there is an issue fetching the list of top movies
    console.error("Error fetching top clothing:", error.message);
  } finally {
    // Hides the loading indicator regardless of success or failure
    loadingIndicatorClothing.style.display = "none";
  }
}

// Calls the function to fetch and display the list of top movies when the page loads
getTopClothing();
