// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
const form = document.querySelector("form");
const selectTitles = document.querySelector("#titles");
const url = "https://ghibliapi.herokuapp.com/films/";
const movieDetails = document.querySelector("#display-info");
const people = document.querySelector("#show-people");
const reviews = document.querySelector("#reviews");
const ul = document.querySelector("ul");
const ol = document.querySelector("ol");
const peopleUrl = "https://ghibliapi.herokuapp.com/people";

function run() {
  // Add code you want to run on page load here
  fetch(`${url}`)
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);
      const filmData = resJson;
      filmData.forEach((element) => {
        const option = document.createElement("option");
        const titleNames = element.title;
        // console.log(titleNames);
        // console.log(element.id);
        option.textContent = titleNames;
        option.value = element.id;
        selectTitles.append(option);
      });

      selectTitles.addEventListener("change", (event) => {
        event.preventDefault();
        // console.log(event);
        filmData.forEach((element) => {
          if (selectTitles.value === element.id) {
            document.querySelector("#display-info").innerHTML = `
             <h3>${element.title}</h3> 
             <p>${element.release_date}</p>
             <p>${element.description}</p>`;
          }
          //console.log(element.title);
          //console.log(element.release_date);
          //console.log(element.description);
        });
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const review = document.querySelector("#review");
        if (review === "") {
          alert("Please select a movie first");
        }
        // console.log(filmData);

        const list = document.createElement("li");
        list.innerHTML = `<strong>${element.title}</strong>:${event.target.review.value}`;
        form.reset();
      });

      const resetBtn = document.querySelector("#reset-reviews");
      resetBtn.addEventListener("click", (event) => {
        document.querySelector("ul").remove();
      });
    })
    .catch((error) => console.log(error));

  // fetch(`${peopleUrl}`)
  //     .then((res) => res.json())
  //     .then((resJson2) => {
  //       console.log(resJson2);
  //       const peopleData = resJson2;
  //       people.addEventListener("click", (event) => {
  //         peopleData.forEach((element) => {});
  //       });
  //     })
  //     .catch((error) => console.log(error));
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
