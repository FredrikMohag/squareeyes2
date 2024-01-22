// Constructs the URL for fetching data from the API
const url = "https://www.haakansson.no/wp-json/wc/store/products";

// Displays a loading indicator while fetching data
const loadingIndicator = document.getElementById("loading-indicator");
loadingIndicator.style.display = "block";

// Selects the element where the items will be displayed
const itemsDiv = document.querySelector(".cloths-content");

// Asynchronous function to fetch and display items
async function getCloths() {
  try {
    // Fetches data from the API
    const response = await fetch(url);

    // Checks if the response is successful (HTTP status code 2xx)
    if (!response.ok) {
      // Throws an error if the response is not successful
      throw new Error("Failed to fetch data. Network response was not ok");
    }

    // Parses the JSON response
    const items = await response.json();

    // Clear the existing content
    itemsDiv.innerHTML = "";

    // Iterates over each item and appends it to the itemsDiv
    items.forEach((item) => {
      itemsDiv.innerHTML += `
        <div class="cloths-item">
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <div class="item-image">
      <img src="${item.images[0].src}" alt="${item.name}">
    </div>
          <p>Price: ${item.prices.price}</p>
        </div>
      `;
    });
  } catch (error) {
    // Logs an error message if there is an issue fetching data
    console.error("Error fetching data:", error.message);
    itemsDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
  } finally {
    // Hides the loading indicator regardless of success or failure
    loadingIndicator.style.display = "none";
  }
}

// Calls the function to fetch and display items when the page loads
getCloths();
