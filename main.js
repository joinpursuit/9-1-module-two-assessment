const baseURL = `https://ghibliapi.herokuapp.com`;

let filmData;

const selectTitle = document.querySelector(`select`);
const movieDetails = document.querySelector(`#details`);
const inputReview = document.querySelector(`#review`)

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

selectTitle.addEventListener(`change`, () => {
  const title = document.createElement(`h3`);
  const year = document.createElement(`p`);
  const description = document.createElement(`p`);

  const selectedFilm = filmData.find((el) => el.id === selectTitle.value);
  title.innerText = selectedFilm.title;
  year.innerText = selectedFilm[`release_date`];
  description.innerHTML = selectedFilm.description;

  movieDetails.append(title, year, description);
});
