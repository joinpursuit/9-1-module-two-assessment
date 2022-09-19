// base_url
const base_url = "https://ghibliapi.herokuapp.com/films";

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  // fetch
  fetch(base_url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      movies(data);
      displayMovie(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

// Select a movie

const selectMovie = document.getElementById("titles");

const movies = (films) => {
  films.forEach((film) => {
    const optionTag = document.createElement("option");
    optionTag.value = JSON.stringify(films);
    optionTag.textContent = film.title;
    selectMovie.appendChild(optionTag);
  });
};

// event listener for dropdown movie option
const displayMovie = (film) => {
  selectMovie.addEventListener("change", (e) => {
    e.preventDefault();

    /*  h3 for movie title, 
    p for movie year, 
    p for movie description */

    const movieDescription = document.getElementById("display-info");

    const h3 = document.createElement("h3");
    movieDescription.appendChild(h3);
    const film = JSON.parse(
      selectMovie.options[selectMovie.selectedIndex].value
    );
    h3.textContent = film.title;
  });
};
