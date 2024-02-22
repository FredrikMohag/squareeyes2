async function getProductDetails() {
  try {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const apiUrl = "https://www.haakansson.no/wp-json/wc/store/products/" + id;

    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.style.display = "block";

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data. Network response was not ok");
    }

    const product = await response.json();

    const productTitle = document.querySelector(".product-title");
    const productImage = document.querySelector(".product-image");
    const productDescription = document.querySelector(".product-description");

    productTitle.textContent = product.name;
    productImage.src = product.images[0].src;
    productDescription.textContent = product.description.replace(/<\/?p>/g, "");
  } catch (error) {
    console.error("Error fetching data:", error.message);
  } finally {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }
  }
}

getProductDetails();
