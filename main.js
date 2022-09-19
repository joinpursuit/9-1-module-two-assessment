//people are array of links -> fetch again -> object -> 'name' key

// url : https://ghibliapi.herokuapp.com/films

// CREATE MAIN ELEMENT VARIABLES, FORM, SELECT, UL, OL
const dropdown = document.getElementById(`titles`);
const form = document.querySelector(`form`);
const peopleList = document.querySelector(`ol`);
const reviewList = document.querySelector(`ul`);
const resetButton = document.getElementById(`reset-reviews`);
const peopleButton = document.getElementById(`show-people`);

//CREATE FETCH FUNCTION
const fetchInfo = (index, plot) => {
  fetch(`https://ghibliapi.herokuapp.com/films`)
    .then((res) => res.json())
    .then((respJson) => {
      respJson.forEach(({ id, title, description, release_date, people }) => {
        if (!index && !plot) {
          const titleClass = title.split(` `).join(``);
          const option = document.createElement(`option`);
          option.value = id;
          option.innerText = title;
          dropdown.append(option);
        }

        if (plot) {
          if (plot === id) {
            document.getElementById(
              `display-info`
            ).innerHTML = `<h3>${title}</h3><p>${release_date}</p><p>${description}</p>
                    `;
          }
        }

        if (index) {
          if (index === id)
            people.forEach((p) => {
              fetch(`${p}`)
                .then((res2) => res2.json())
                .then((respJson2) => {
                  const person = document.createElement(`li`);
                  person.innerText = respJson2.name;
                  peopleList.append(person);
                })
                .catch((err) => console.log(err));
            });
        }
      });
    })
    .catch((error) => console.log(error));
};

// ADD EVENT LISTENERS
dropdown.addEventListener(`change`, (e) => {
  peopleList.innerHTML = ``;
  const character = dropdown.value;
  fetchInfo(false, character);
});

form.addEventListener(`submit`, (event) => {
  event.preventDefault();
  if (dropdown.value === ``) {
    window.alert(`Please select a movie first`);
  } else {
    const reviewItem = document.createElement(`li`);
    const movieTitle = document.querySelector(`#display-info h3`).innerText;
    reviewItem.innerHTML = `<strong>${movieTitle}</strong>: ${form.review.value}`;
    reviewList.append(reviewItem);
    form.reset();
  }
});

resetButton.addEventListener(`click`, (events) => {
  events.preventDefault();
  reviewList.innerHTML = ``;
});

peopleButton.addEventListener(`click`, (e2) => {
  e2.preventDefault();
  peopleList.innerHTML = ``;
  const movie = dropdown.value;
  fetchInfo(movie);
});

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  fetchInfo();
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
