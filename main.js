const header = document.querySelector("header");
const form = document.querySelector("form");
const selectTitles = document.querySelector("#title");
const display = document.querySelector("#display-info");
console.log(display);
const reviewInput = document.querySelector("#reviews");
const details = document.querySelector("#movie-details");
const ul = document.querySelector("ul");
const input = document.querySelector("#review");
console.log(input);
const revDisplay = document.querySelector("#reviews ul");
selectInfo = document.querySelector("#select-info");
const reset = document.querySelector("#reset-reviews");
// const form = document.querySelector("form")
// const form = document.querySelector("form")

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
let apiResult;
const URL = "https://ghibliapi.herokuapp.com/films";
function run() {
  //*Select a Movie Section
  fetch(URL)
    .then((result) => result.json())
    .then((resJson) => {
      apiResult = resJson;
      console.log(apiResult);

      apiResult.forEach((film) => {
        let selectOpt = document.createElement("option");
        selectOpt.innerHTML = film.title;
        //! add Id value in the dom
        selectOpt.value = film.id;
        // selectOpt.setAttribute("value", film.id)
        selectTitles.append(selectOpt);
      });
    })
    .catch((error) => console.log(error));
  //* Movie Description
  let title;
  selectTitles.addEventListener("change", () => {
    //! remember to clear secstion after seleting another movie
    display.innerHTML = "";
    fetch(`https://ghibliapi.herokuapp.com/films/${selectTitles.value}`)
      .then((res) => res.json())
      .then((resJson) => {
        title = resJson.title;
        //! fix, find method not working
        // const desc = apiResult.find((info) => info.title === selectTitles.value);
        const titleH3 = document.createElement("h3");
        titleH3.innerHTML = `${resJson.title}`;

        const year = document.createElement("p");
        year.innerHTML = resJson.release_date;

        const description = document.createElement("p");
        description.innerHTML = resJson.description;
        console.log(description);

        display.append(titleH3, year, description);
      })
      .catch((err) => console.log(err));
  });

  //* Add Reviews
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!selectTitles.value) {
      alert("Please select a movie first");
    } else {
      const reviews = document.createElement("li");
      ul.append(reviews);
      reviews.innerHTML = `<strong>${title}:</strong> ${input.value}`;
      form.reset();
    }
  });

  //* Reset button
  reset.addEventListener("click", () => {
    revDisplay.innerHTML = "";
  });

  //* Generate an ordered List of people's name
  // const orderedl
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
