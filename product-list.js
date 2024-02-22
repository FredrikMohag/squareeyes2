async function getTopProducts() {
  const apiUrl = "https://www.haakansson.no/wp-json/wc/store/products";
  const topSelection = document.querySelector(".topselection");
  const loadingIndicatorTopSelection =
    document.getElementById("loading-indicator");

  try {
    loadingIndicatorTopSelection.style.display = "block";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch data. Network response was not ok");
    }

    const products = await response.json();

    products.forEach((product) => {
      const productLink = document.createElement("a");
      productLink.href = `product-detail.html?id=${product.id}`;
      productLink.classList.add("product-link");

      const productContainer = document.createElement("div");
      productContainer.classList.add("product-container");

      const titleElement = document.createElement("h2");
      titleElement.textContent = product.name;
      const titleLink = productLink.cloneNode();
      titleLink.appendChild(titleElement);

      const imageElement = document.createElement("img");
      imageElement.src = product.images[0]?.src || "";
      imageElement.alt = product.name;
      imageElement.classList.add("product-image");
      const imageLink = productLink.cloneNode();
      imageLink.appendChild(imageElement);

      productContainer.appendChild(titleLink);
      productContainer.appendChild(imageLink);
      topSelection.appendChild(productContainer);
    });

    console.log("Top products fetched successfully:", products);
  } catch (error) {
    console.error("Error fetching top products:", error.message);
  } finally {
    loadingIndicatorTopSelection.style.display = "none";
  }
}

getTopProducts();
