const url = "https://api.noroff.dev/api/v1/square-eyes";
const topSelection = document.querySelector(".topselection");
const loadingIndicator = document.getElementById("loading-indicator");

async function getMovies() {
  try {
    loadingIndicator.style.display = "block";

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const results = await response.json();

    const movies = results;
    console.log(results);

    for (let i = 0; i < movies.length; i++) {
      console.log(movies[i].title);

      topSelection.innerHTML += `<a href="lobster.html?id=${movies[i].id}"
        ><img class="lobster" src="${movies[i].image}" alt="${movies[i].title}"
     /></a>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loadingIndicator.style.display = "none";
  }
}

getMovies();
