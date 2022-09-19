const baseURL = `https://ghibliapi.herokuapp.com`;

let filmData;
let film;
let peopleData;

const selectTitle = document.querySelector(`select`);
const movieDetails = document.querySelector(`#display-info`);
const inputReview = document.querySelector(`#review`);
const form = document.querySelector(`form`);
const reviewList = document.querySelector(`ul`);
const reset = document.querySelector(`#reset-reviews`);
const showPeople = document.querySelector(`#show-people`);
const peopleList = document.querySelector(`ol`);

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
  const titleFilm = document.createElement(`h3`);
  const year = document.createElement(`p`);
  const description = document.createElement(`p`);

  findFilm();
  titleFilm.innerText = film[`title`];
  year.innerText = film[`release_date`];
  description.innerHTML = film.description;

  movieDetails.append(titleFilm, year, description);
  peopleList.innerHTML = ``;
});

form.addEventListener(`submit`, (event) => {
  event.preventDefault();
  if (!selectTitle.value) {
    alert(`Please select a movie first`);
    // other way to display error message
    // const noFilm = document.createElement(`p`);
    // noFilm.innerHTML = `<strong>Please select a movie fist</strong>`;
    // form.after(noFilm);
    // const removeErrMess = () => noFilm.remove();
    // setTimeout(removeErrMess, 4000);

    // could add another error message
    //   } else if (!inputReview.value) {
    // const noReview = document.createElement(`p`);
    // noReview.innerHTML = `<strong>Please add a review</strong>`;
    // form.after(noReview);
    // const removeErrMess = () => noReview.remove();
    // setTimeout(removeErrMess, 4000);
  } else {
    const reviewItem = document.createElement(`li`);
    reviewItem.innerHTML = `<strong>${film[`title`]}: </strong>${
      inputReview.value
    }`;
    reviewList.append(reviewItem);
    form.reset();
  }
});

reset.addEventListener(`click`, () => {
  reviewList.innerHTML = ``;
});

fetch(baseURL + `/people`)
  .then((res) => res.json())
  .then((resJson) => {
    peopleData = resJson;
  })
  .catch((err) => console.log(err));

showPeople.addEventListener(`click`, () => {
  peopleList.innerHTML = ``;
  if (selectTitle.value) {
    // console.log(selectTitle.value);
    peopleData.forEach((person) => {
      person.films.forEach((film) => {
        if (film.includes(selectTitle.value)) {
          const character = document.createElement(`li`);
          character.innerText = person.name;
          peopleList.append(character);
        }
      });
    });

    // fetch(baseURL + `/items` + `?films=${baseURL}/films/${selectTitle.value}`)
    //   .then((res) => res.json())
    //   .then((resJson) => console.log(resJson))
    //   .catch((err) => console.log(err));
  }
});
