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
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Oops! We're having trouble reaching our servers. Please try again later.`
      );
    }

    let items;
    try {
      items = await response.json();
    } catch (e) {
      throw new Error(
        "We're having trouble processing the information. Please try again."
      );
    }

    // Clear the existing content
    itemsDiv.textContent = "";

    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cloths-item";

      const title = document.createElement("h2");
      title.textContent = item.name;
      itemDiv.appendChild(title);

      const description = document.createElement("p");
      description.textContent = item.description;
      itemDiv.appendChild(description);

      const imageDiv = document.createElement("div");
      imageDiv.className = "item-image";
      const image = document.createElement("img");
      image.src = item.images[0].src;
      image.alt = item.name;
      imageDiv.appendChild(image);
      itemDiv.appendChild(imageDiv);

      const price = document.createElement("p");
      price.textContent = `Price: ${item.prices.price}`;
      itemDiv.appendChild(price);

      itemsDiv.appendChild(itemDiv);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    itemsDiv.textContent = "";

    const errorMessage = document.createElement("p");
    errorMessage.textContent = error.message;

    const retryButton = document.createElement("button");
    retryButton.textContent = "Try Again";
    retryButton.onclick = getCloths;

    itemsDiv.appendChild(errorMessage);
    itemsDiv.appendChild(retryButton);
  } finally {
    loadingIndicator.style.display = "none";
  }
}

// Calls the function to fetch and display items when the page loads
getCloths();
