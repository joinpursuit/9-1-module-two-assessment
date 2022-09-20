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
    optionTag.value = JSON.stringify(film);
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

    // h3-movie tittle
    const h3 = document.createElement("h3");
    movieDescription.appendChild(h3);
    const film = JSON.parse(
      selectMovie.options[selectMovie.selectedIndex].value
    );
    h3.textContent = `${film.title}`;

    // year
    const year = document.createElement("p");
    movieDescription.appendChild(year);
    year.textContent = `${film.release_date}`;

    // description
    const description = document.createElement("p");
    movieDescription.appendChild(description);
    description.textContent = `${film.description}`;
  });
};

// EVENT LISTENER - SUBMIT BUTTON
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  const film = JSON.parse(selectMovie.options[selectMovie.selectedIndex].value);
  e.preventDefault();

  // error
  let errText = document.getElementById("error-text");
  let review = document.getElementById("review");

  if (!film.title) {
    const errP = document.createElement("p");
    errP.innerText = "Please select a movie first";
    errText.appendChild(errP);
  // review content
  } else {
  const ul = document.getElementById("ul");
  const li = document.createElement("li")
  ul.appendChild(li)
  li.textContent = `${film.title}: ${review.value}`
}
errText.innerHTML = ''
});
