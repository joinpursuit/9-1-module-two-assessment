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
const showPeople = document.querySelector("#show-people");

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

  film = findFilm;

  const h3 = document.createElement("h3");
  h3.innerText = findFilm.title;
  title = findFilm.title;
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
    alert("Please select a movie first");
  } else {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${film.title}: </strong>${textInput.value}`;
    ul.append(li);
    form.reset();
  }
});

reset.addEventListener("click", () => {
  ul.innerHTML = "";
});

// showPeople.addEventListener("click", () => {
//   const people = "https://ghibliapi.herokuapp.com/people";
//   fetch(people)
//     .then((data) => data.json())
//     .then((data) => {
//       let filtered = film.people.forEach((mov) => {
//         data.filter((matched) => {
//           if (mov.people === matched.url) {
//             const list = document.querySelector("ol");
//             const person = document.createElement("li");
//             person.innerText = filtered.name;
//             ol.append(person);
//           }
//         });
//       });

//       console.log(film.people);
//   forEach((film, i) => {
//     // for (let p = 0; p < data.length; p++) {
//     if (film.people === data[p].url) {
//       console.log(data[p].url);
//       const list = document.querySelector("ol");
//       const person = document.createElement("li");
//       person.innerText = data[p].name;
//       //   console.log(person);
//       list.append(person);
//     }
//     // }
//   });
//     })
//     .catch((err) => console.log(err));
// });
// });

//   for (let i = 0; i < film.people; i++) {
//     for (let p = 0; p < allPeople.length; i++) {
//       console.log(film.people[i]);
//       if (film[i].people === allPeople[p].url) {
//         const list = document.querySelector("ol");
//         const person = document.createElement("li");
//         person.innerText = allPeople[p].name;
//         console.log(person);
//         list.append(person);
//       }
//     }
//   }
// })
