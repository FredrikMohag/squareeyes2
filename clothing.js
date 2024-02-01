// API URL for fetching the list of top clothing
const apiUrl = "https://www.haakansson.no/wp-json/wc/store/products";

// Selects the element where the top clothing selection will be displayed
const topClothing = document.querySelector(".topclothing");

// Displays a loading indicator while fetching the list of top clothing
const loadingIndicatorClothing = document.getElementById("loading-indicator");

// Asynchronous function to fetch and display the list of top clothing
async function getTopClothing() {
  try {
    loadingIndicatorClothing.style.display = "block";

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        "Oops! We're having trouble reaching our servers. Please try again later."
      );
    }

    const clothing = await response.json();

    // Clear the existing content
    topClothing.textContent = "";

    // Loop through each clothing item and create elements
    clothing.forEach((item) => {
      const link = document.createElement("a");
      link.href = `clothing.html?id=${item.id}`;

      const img = document.createElement("img");
      img.src = item.images[0].src;
      img.alt = item.name;
      img.classList.add("clothing");

      link.appendChild(img);
      topClothing.appendChild(link);
    });
  } catch (error) {
    console.error("Error fetching top clothing:", error);
    topClothing.textContent = "";

    const errorMessage = document.createElement("p");
    errorMessage.textContent = error.message;

    const retryButton = document.createElement("button");
    retryButton.textContent = "Try Again";
    retryButton.onclick = getTopClothing;

    topClothing.appendChild(errorMessage);
    topClothing.appendChild(retryButton);
  } finally {
    loadingIndicatorClothing.style.display = "none";
  }
}

// Calls the function to fetch and display the list of top clothing when the page loads
getTopClothing();
