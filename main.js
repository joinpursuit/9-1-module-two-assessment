





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

 const baseAPI = 'https://ghibliapi.herokuapp.com/Films'
 const dropDownMenu = document.querySelector('select')

 fetch(baseAPI)
 .then(response => response.json())
 .then(data => {
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        let newOption = document.createElement('option')
        newOption.innerHTML = data[i].title
        dropDownMenu.append(newOption)
    }

    const filmYear = document.querySelector(".filmYear")
    const filmDescription = document.querySelector(".filmDescription")
    const movieDetails = document.querySelector(".details")

    dropDownMenu.addEventListener("change", (event) => {
        console.log("change") // Test to check change event listener.

        event.preventDefault()

        for (let i = 0; i < data.length; i++) {
            if (data[i].title === event.target.value) {
                filmYear.innerHTML = `${data[i].release_date}`
                filmDescription.innerHTML = `${data[i].description}`
            }
        }
        movieDetails.append(filmYear, filmDescription)
    })
 })
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
