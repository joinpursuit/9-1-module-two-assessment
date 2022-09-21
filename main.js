// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  //! This is the BASE URL + ENDPOINT /films. This will give me all the films
  const MOVIES_URL = `https://ghibliapi.herokuapp.com/films`;
  //! This the BASE URL + ENDPOINT /people. This will give me all the people
  const PEOPLE_URL = `https://ghibliapi.herokuapp.com/people`;

  let movies;
  let filmId;
  const div = document.querySelector("#display-info");
  const select = document.querySelector("#titles");

  fetch(`${MOVIES_URL}`)
    .then((res) => res.json())
    .then((resJson) => {
      movies = resJson;
      for (let i = 0; i < resJson.length; i++) {
        const movie = resJson[i].title;
        // const id = resJson[i].id;
        const option = document.createElement("option");
        option.innerHTML = movie;
        option.value = resJson[i].id;
        select.append(option);
        for (let j = 0; j < resJson[i].people.length; j++) {
          // console.log(resJson[i].people[j].slice(-36));
          filmId = resJson[i].people[j].slice(-36);
        }
      }
    })
    .catch((err) => console.log(err));

  //toDO: show people in the movie
  const peopleButton = document.querySelector("#show-people");
  const ol = document.querySelector("ol");
  ol.innerHTML = "";
  peopleButton.addEventListener("click", () => {
    fetch(`${PEOPLE_URL}`)
      .then((res) => res.json())
      .then((resJson) => {
        // console.log(resJson);
        // people = resJson;
        for (let k = 0; k < resJson.length; k++) {
          const element = resJson[k].id;
          const characters = resJson[k].name;
          //   console.log(element);
          //   console.log(characters);
          console.log(filmId);
          const liPeople = document.createElement("li");
          if (element === filmId) {
            liPeople.innerHTML = characters;
            ol.append(liPeople);
          }
        }
        // console.log(ol);
      })
      .catch((err) => console.log(err));
  });

  //! This will give a single film
  //toDO: BASE_URL + /{id}
  //! Each time a user select a movie title, the page should display these info in div

  let title;
  select.addEventListener("change", () => {
    const callMovies = movies.find(
      (element) => element.id === `${select.value}`
    );
    title = callMovies.title;
    div.innerHTML = "";

    // h3 with value of "movie's title"
    const movieTitle = document.createElement("h3");
    movieTitle.innerHTML = `${callMovies.title}`;
    div.append(movieTitle);

    // "p" tag for release year
    const year = document.createElement("p");
    year.innerHTML = `${callMovies.release_date}`;
    div.append(year);

    // "p" tag for description
    const movieDescription = document.createElement("p");
    movieDescription.innerHTML = `${callMovies.description}`;
    div.append(movieDescription);
  });

  //toDO: Add Review
  const reviewInput = document.querySelector("#review");
  const form = document.querySelector("form");
  const ul = document.querySelector("ul");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let review = reviewInput.value;
    let selectedMovie = `${select.value}`;

    //toDO: ERROR MESSAGE
    if (!selectedMovie) {
      alert(`Please select a movie first`);
      select.addEventListener("click", () => {
        error.innerHTML = "";
      });
    } else {
      // li reviews
      const liReview = document.createElement("li");
      liReview.innerHTML = `<strong>${title}: </strong>${review}`;
      ul.append(liReview);
      form.reset();
    }

    //toDO: reset button
    const reviewButton = document.querySelector("#reset-reviews");
    reviewButton.addEventListener("click", () => {
      ul.innerHTML = "";
    });
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
