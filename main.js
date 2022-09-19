const selectMovie = document.querySelector('#titles');
let displayInfo = document.querySelector('#display-info');
let reviewsUl = document.querySelector('#reviews-ul');
addReviewForm = document.querySelector('#add-review-form');
reviewTextBox = document.querySelector('#review');
const resetReviewsBtn = document.querySelector("#reset-reviews");

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
function fetchData(URL) {
    
    //FETCH
    fetch(URL)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);

        //Create an option in dropdown menu for each element -- value = film id, text = film title
        resJson.forEach(film => {
          const option = document.createElement("option");
          option.value = `${film.id}`;
          option.innerText = `${film.title}`;
          selectMovie.append(option);
          

          // Adds change event listener to dropdown, and creates an h3 with movie title, p tag with movie release year, and p tag with film description.

          selectMovie.addEventListener("change", (e) => {
            //  e.preventDefault();

            let movieDetailsH3 = document.createElement("h3");
            let movieDetailsReleaseYear = document.createElement("p");
            let movieDetailsDescription = document.createElement("p");
            if (selectMovie.value === film.id) {
              movieDetailsH3.innerText = `${film.title}`;
              movieDetailsReleaseYear.innerText = `${film.release_date}`;
              movieDetailsDescription.innerText = `${film.description}`;
              displayInfo.innerHTML = "";
              displayInfo.append(
                movieDetailsH3,
                movieDetailsReleaseYear,
                movieDetailsDescription
              );
            } // closes movie details IF
          }); // closes selectMovie change event listener

          
        }); // closes forEach

        addReviewForm.addEventListener("submit", (e) => {
          e.preventDefault();

          if (selectMovie.value === '') {
            alert('Please select a movie first');
          } else {
            reviewListItem = document.createElement("li");
            reviewListItem.innerText = `: ${reviewTextBox.value}`;
            reviewsUl.append(reviewListItem);
            reviewListItemStrong = document.createElement("strong");
            reviewListItem.prepend(reviewListItemStrong);
          }
          resJson.forEach((film) => {
            if (selectMovie.value === film.id) {
              reviewListItemStrong.innerText = `${film.title}.`;
            }
          }); // closes forEach to find title by id (from dropdown.value)
          // reviewsUl.remove(reviewListItem);
          reviewTextBox.value = '';
        }); //closes reviewForm submit event listener
        


        //reset reviews button event listener
        resetReviewsBtn.addEventListener('click', (e) => {
          reviewsUl.innerHTML = '';
          
        })//closes resetReviewsBtn click event listener




      })
      .catch((err) => {
        console.error(err);
      }); // closes fetch call block
    
    

  

    
} //closes funtion fetchData


function run() {
    const URL = "https://ghibliapi.herokuapp.com/films";
    
    fetchData(URL);



   

   
 // Add code you want to run on page load here
   
   
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
