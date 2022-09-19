const baseURL = `https://ghibliapi.herokuapp.com`;

let filmData;
let film;

const selectTitle = document.querySelector(`select`);
const movieDetails = document.querySelector(`#display-info`);
const inputReview = document.querySelector(`#review`);
const form = document.querySelector(`form`);
const reviewList = document.querySelector(`ul`);
const reset = document.querySelector(`#reset-reviews`);

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  fetch(baseURL + `/films`)
    .then((res) => res.json())
    .then((resJson) => {
      filmData = resJson;
      resJson.forEach((el) => {
        const titleOption = document.createElement(`option`);
        titleOption.innerText = el.title;
        titleOption.setAttribute(`value`, el.id);
        selectTitle.append(titleOption);
      });
    })
    .catch((err) => console.log(err));
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

const findFilm = () => {
  film = filmData.find((el) => el.id === selectTitle.value);
};

selectTitle.addEventListener(`change`, () => {
  movieDetails.innerHTML = ``;
  const title = document.createElement(`h3`);
  const year = document.createElement(`p`);
  const description = document.createElement(`p`);

  findFilm();
  title.innerText = film.title;
  year.innerText = film[`release_date`];
  description.innerHTML = film.description;

  movieDetails.append(title, year, description);
});

form.addEventListener(`submit`, (event) => {
  event.preventDefault();
  if (!selectTitle.value) {
    const noFilm = document.createElement(`p`);
    noFilm.innerHTML = `<strong>Please select a movie fist</strong>`;
    form.after(noFilm);
    const removeErrMess = () => noFilm.remove();
    setTimeout(removeErrMess, 4000);
  } else if (!inputReview.value) {
    const noReview = document.createElement(`p`);
    noReview.innerHTML = `<strong>Please add a review</strong>`;
    form.after(noReview);
    const removeErrMess = () => noReview.remove();
    setTimeout(removeErrMess, 4000);
  } else {
    const reviewItem = document.createElement(`li`);
    console.log(selectTitle.target);
    reviewItem.innerHTML =
      `<strong>${film.title}: </strong>` + inputReview.value;
    reviewList.append(reviewItem);
    form.reset();
  }
});

reset.addEventListener(`click`, () => {
  reviewList.innerHTML = ``;
});
