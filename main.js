





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

 const baseAPI = 'https://ghibliapi.herokuapp.com/films'
 const dropDownMenu = document.querySelector('select')
 const form = document.querySelector('form')

 fetch(baseAPI)
 .then(response => response.json())
 .then(data => {
    // console.log(data)

    for (let i = 0; i < data.length; i++) {
        let newOption = document.createElement('option')
        let movieIdValue = data[i].title
        newOption.setAttribute('value', movieIdValue)
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

    const reviewSection = document.querySelector('#reviews') // Variable for the actual part of the page where the reviews show up.
    const submitButton = document.getElementsByName("submitButton") // Variable for the actual submit button.
    // console.log(submitButton)

    const reviewList = document.querySelector("#reviews ul")

    form.addEventListener("submit", (event) => {
        event.preventDefault()

        
        let reviewInput = event.target.reviewText.value
        const reviewList = document.createElement("li")
        reviewList.innerHTML = `${reviewInput}`
        
        form.append(reviewList)
        
        // for (let i = 0; i < data.length; i++) {
        //     let movieName = document.getElementById('titles')
        //     // let movieTitleName = movieName.options[movieName[i]].value
        //     console.log(movieTitleName)
        // }

        // Use value in option to get movie name to display next to review. If option value = "" then display alert error.
        form.reset()
    })

    const resetButton = document.querySelector('#reset-reviews')
    const reviewList2 = document.querySelector("form ul") // Selects the list of reviews. Need to find a way to make this reset in the event listener.

    console.log(reviewList2)
    // console.log(resetButton)

    resetButton.addEventListener("click", (event) => {
        event.preventDefault()
        console.log("test") // Testing event listener.
        form.reset()
    })
    
   // Once that's displayed, I want it to be saved to an unordered list of list elements with the movie title in <strong> and the text review after. 
   // I can do let writtenReview = document.createElement("li") and append that to a ul variable like let reviewList = document.querySelector("ul").
   // Error message of "Please select a movie" should come up when a user tries to leave a review without selecting a movie. 
   // This can be something like "if (the value of the movie in the dropdown menu !== or equal to nothing, then display error." Something like that.)

    // const getPeopleButton = document.querySelector("#show-people")
    
    // getPeopleButton.addEventListener("click", (event) => {
    //     let listOfPeople = document.createElement("ol")
        
    //     for (i = 0; i < data.length; i++) {
    //         if (data[i].title === event.target.show-people.value) {
    //             let peopleNames = data[i].people

    //             listOfPeople.append(peopleNames)
    //         }
    //     } // Trying to make it so whatever movie you click, if whatever title you click equals to that index in the data, take the names of the people
    //     // And append them to the ol element. Still confused idk, I need sleep.
    // })

 }) // End of .then with data in it.
} // End of function. Do not go past this.

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
