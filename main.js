// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

const select = document.querySelector("select");
const displayInfo = document.querySelector("#display-info");
const form = document.querySelector("form");
const ul = document.querySelector("ul");
const textInput = document.querySelector(".textInput");
const reviews = document.querySelector("#reviews");
const reset = document.querySelector("#reset-reviews");

const URL = "https://ghibliapi.herokuapp.com/films";
let filmData;

fetch(URL)
  .then((data) => data.json())
  .then((data) => {
    filmData = data;
    data.forEach((film) => {
      const option = document.createElement("option");
      option.value = film.id;
      option.innerText = film.title;
      select.append(option);
    });
  })
  .catch((err) => console.log(err));

let film;

select.addEventListener("change", () => {
  displayInfo.innerHTML = "";

  const findFilm = filmData.find((film) => film.id === select.value);

  film = findFilm.title;

  const h3 = document.createElement("h3");
  h3.innerText = findFilm.title;
  displayInfo.append(h3);

  const pYear = document.createElement("p");
  pYear.innerText = findFilm.release_date;

  const pDescription = document.createElement("p");
  pDescription.innerText = findFilm.description;

  displayInfo.append(pYear, pDescription);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (select.value === "") {
    const error = document.createElement("p");
    error.innerHTML = "Please select a movie first";
    error.style.color = "red";
    error.style.fontSize = "14px";
    form.append(error);
    select.addEventListener("change", () => {
      error.innerHTML = "";
    });
  } else {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${film}: </strong>${textInput.value}`;
    ul.append(li);
    console.log(filmData.title);
  }
  form.reset();
});

reset.addEventListener("click", () => {
  ul.innerHTML = "";
});
