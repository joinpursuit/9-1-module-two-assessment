// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  const url = "https://ghibliapi.herokuapp.com/films";
  const removeOption = document.querySelector("#jsRemove");
  const reviews = document.querySelector("#new-review");
  const reviewform = document.querySelector("form");
  const reviewDelete = document.querySelector("#reset-reviews");
  const dropDown = document.querySelector("#titles");
  const optionMovieDetails = document.querySelector("option");
  const titleNames = document.createElement("option");
  const disInfo = document.querySelector("#display-info");
  const inputReview = document.querySelector("#review");
  let titleNamesH3 = document.createElement("h3");
  let titleYear = document.createElement("p");
  let TitleDesc = document.createElement("p");
  disInfo.append(titleNamesH3);
  disInfo.append(titleYear);
  disInfo.append(TitleDesc);
  let movieTitle = "";

  //   dropDown.removeChild(removeOption); Array lenght 22 or 23?

  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((res) =>
      res.forEach((element) => {
        let titleNames = document.createElement("option");
        // console.log(element.title);
        // create a tag:option att :innertext value:
        titleNames.innerText = `${element.title}`;
        titleNames.value = `${element.title}`;
        // console.log(titleNames);  << option tag info

        //append to #titles which is the id for select
        dropDown.append(titleNames);
        //
      })
    )
    .catch((err) => console.log("no movie available"));

  dropDown.addEventListener("change", (eve) => {
    eve.preventDefault();
    console.log(dropDown.value);
    if (dropDown.value) {
      console.log(true);
      fetch(url)
        .then((res) => res.json())
        .then((res) =>
          res.filter((element) => {
            if (dropDown.value === element.title) {
              // create a tag:option att :innertext value:
              titleNamesH3.innerText = `${dropDown.value}`;
              titleYear.innerText = `${element.release_date}`;
              TitleDesc.innerText = `${element.description}`;
              // titleNames.H3value = `${element.title}`;
              // console.log(titleNames);  << option tag info
              //append to #titles which is the id for select
              movieTitle = dropDown.value;
            }
          })
        );
    } else if (!dropDown.value) {
      console.log(false);
      titleNamesH3.innerHTML = ``;
      titleYear.innerHTML = ``;
      TitleDesc.innerHTML = ``;
    }
  });

  reviewform.addEventListener("submit", (eve) => {
    eve.preventDefault();
    console.log("submit button", inputReview);
    if (inputReview.value && movieTitle && dropDown.value) {
      const reviewList = document.createElement("li");
      reviewList.innerHTML = `<strong>${movieTitle}</strong>: ${inputReview.value}`;
      reviews.append(reviewList);
    }
    if (!(inputReview.value && movieTitle && dropDown.value)) {
      console.error("Movie selection and review is required");
      alert("Movie selection and review is required");
    }
    inputReview.value = "";
  });

  reviewDelete.addEventListener("click", (eve) => {
    console.log("working");
    eve.preventDefault();
    // const reviewClass = document.querySelectorAll(".singleReview");
    reviews.innerHTML = ``;
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);

// declared variables can be read on global scope
// new variable can be read inside of other scopes
