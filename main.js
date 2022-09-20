





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

 const baseAPI = 'https://ghibliapi.herokuapp.com/Films'
 const dropDownMenu = document.querySelector('select')
 const reviewSection = document.querySelector('#reviews')
 const reviewInput = document.querySelectorAll('#review')

 fetch(baseAPI)
 .then(response => response.json())
 .then(data => {
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        let newOption = document.createElement('option')
        newOption.innerHTML = data[i].title
        dropDownMenu.append(newOption)
    }

    const filmTitle = document.querySelector("#movieTitle")
    const filmYear = document.querySelector("#filmYear")
    const filmDescription = document.querySelector("#filmDescription")
    const movieDetails = document.querySelector("#display-info")

    dropDownMenu.addEventListener("change", (event) => {
        // console.log("change") // Test to check change event listener.

        event.preventDefault()

        for (let i = 0; i < data.length; i++) {
            if (data[i].title === event.target.value) {
                filmTitle.innerHTML = `${data[i].title}`
                filmYear.innerHTML = `${data[i].release_date}`
                filmDescription.innerHTML = `${data[i].description}`
            }
        }
        movieDetails.append(filmTitle, filmYear, filmDescription)
    }) // End of change event listener.

   // Stuck on review part. Trying to query select the text input with the id "review" but it's not working for some reason. (Ask for help here.)
   // Once the text input has been selected, I'm trying to grab the value that was inputted into the text input and display it on the site.
   // Once that's displayed, I want it to be saved to an unordered list of list elements with the movie title in <strong> and the text review after. 
   // I can do let writtenReview = document.createElement("li") and append that to a ul variable like let reviewList = document.querySelector("ul").
   // The text input box should be reset after hitting submit (.reset() will likely be used using the variable assigned to the text box input query selector once I figure that out.)
   // The reviews should not go away when a different movie is selected. (Google how to make stuff on the page not go away after a different thing is selected.)
   // Error message of "Please select a movie" should come up when a user tries to leave a review without selecting a movie. 
   // This can be something like "if (the value of the movie in the dropdown menu !== or equal to nothing, then display error." Something like that.)

    const getPeopleButton = document.querySelector("#show-people")
    
    getPeopleButton.addEventListener("click", (event) => {
        let listOfPeople = document.createElement("ol")
        
        for (i = 0; i < data.length; i++) {
            if (data[i].title === event.target.value) {
                let peopleNames = data[i].people

                listOfPeople.append(peopleNames)
            }
        } // Trying to make it so whatever movie you click, if whatever title you click equals to that index in the data, take the names of the people
        // And append them to the ol element. Still confused idk, I need sleep.
    })
 }) // End of .then with data in it.
} // End of function. Do not go past this.

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
