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
    if (typeof film === "object") {
      optionTag.value = JSON.stringify(film);
    } else {
      optionTag.value = film;
    }
    optionTag.textContent = film.title;
    selectMovie.appendChild(optionTag);
  });
};

// event listener for dropdown movie option
const displayMovie = (film) => {
  selectMovie.addEventListener("change", (e) => {
    e.preventDefault();

    const movieDescription = document.getElementById("display-info");
    movieDescription.innerHTML = "";

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
  e.preventDefault();

  if (selectMovie.options[selectMovie.selectedIndex].value === "") {
    alert("Please select a movie");
    return false;
  }

  const film = JSON.parse(selectMovie.options[selectMovie.selectedIndex].value);

  // reset Review section and people section
  const resetButton = document.getElementById("reset-reviews");
  resetButton.addEventListener("click", (e) => {
    ul.innerHTML = "";
    ol.innerHTML= ''
  });

  // ul li review
  const review = document.getElementById("review");
  const ul = document.getElementById("ul");
  const li = document.createElement("li");

  li.innerHTML = `<strong>${film.title}</strong>: ${review.value}`;
  ul.appendChild(li);

  //li.textContent = ;
  review.value = "";
});


const peopleButton = document.getElementById("show-people");
  peopleButton.addEventListener("click", (e) => {

    const ol = document.getElementById("ol")
    const li = document.createElement("li")
    ol.appendChild(li)
    li.textContent = `Too hard`;
   
  });