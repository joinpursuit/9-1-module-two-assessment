





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

 const baseAPI = 'https://ghibliapi.herokuapp.com/films'
 const dropDownMenu = document.querySelector('select')
 const form = document.querySelector('form')

 fetch(baseAPI)
 .then(response => response.json())
 .then(data => {

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

    const reviewList = document.querySelector("#reviews ul")

    form.addEventListener("submit", (event) => {
        event.preventDefault()

        let movieName = document.getElementById('titles')
        let movieTitleName = movieName.options[movieName.selectedIndex].value
        
        
        console.log(movieTitleName)
        let reviewInput = event.target.reviewText.value
        const reviewList = document.createElement("li")
        reviewList.innerHTML = `<strong>${movieTitleName}</strong>: ${reviewInput}`
        form.append(reviewList)
        
        form.reset()
        
        // Use value in option to get movie name to display next to review. If option value = "" then display alert error.
        if (movieTitleName === "") {
            alert(`Please select a movie first`)

        }
    })
    
    const resetButton = document.querySelector('#reset-reviews')
    let form2 = document.querySelector("form ul") // Selects the list of reviews. Need to find a way to make this reset in the event listener.

    resetButton.addEventListener("click", (event) => {
        reviewList.remove()
        event.preventDefault()
        console.log("reset test") // Testing event listener.
    })
 }) // End of .then with data in it.
} // End of function. Do not go past this.

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
