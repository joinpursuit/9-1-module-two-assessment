const url = "https://ghibliapi.herokuapp.com/films"
const peopleList = document.querySelector("ol")
const reviewList = document.querySelector("ul")
const reviewSection = document.querySelector("#reviews")
const titleOptions = document.querySelector("#titles")
const infoSection = document.querySelector("#display-info")
const selectTitle = document.querySelector("#titles")
const reviewForm = document.querySelector("form")
const resetButton = document.querySelector("#reset-reviews")
const peopleButton = document.querySelector("#show-people")
const apiResults = []

function renderTitles(results) {
    for(const movie of results) {
        const movieSelect = document.createElement("option")

        movieSelect.innerHTML = `${movie.title}`
        titleOptions.append(movieSelect)
    }
}

function renderInfo(movie) {
    const movieTitle = document.createElement("h3")
    const movieYear = document.createElement("p")
    const movieDescription = document.createElement("p")

    movieTitle.innerHTML = `${movie.title}`
    infoSection.append(movieTitle)

    movieYear.innerHTML = `${movie.release_date}`
    infoSection.append(movieYear)

    movieDescription.innerHTML = `${movie.description}`
    infoSection.append(movieDescription)
}

selectTitle.addEventListener("change", (event) => {
    event.preventDefault()
    
    if(event.target.value === "") {
        alert("Please select a movie first")
    } else {

    const submitQuery = document.querySelector("#titles").value

    const submitMovie = apiResults.find(movie => movie.title === submitQuery)
    while(infoSection.firstChild) {
        infoSection.children[0].remove()
    }

    renderInfo(submitMovie)
}
})

function addReview(review) {
    const newReview = document.createElement("li")
    const submitQuery = document.querySelector("#titles").value
    const strongTitle = document.createElement("strong")
    const submitMovie = apiResults.find(movie => movie.title === submitQuery)
    
    strongTitle.innerHTML = `${submitMovie.title}: `
    newReview.innerHTML = `${review}`
    newReview.prepend(strongTitle)

    reviewList.append(newReview)
    
}

function resetReviews() {
    while(reviewList.firstChild) {
        reviewList.children[0].remove()
    }
}

reviewForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const userReview = document.querySelector("#review").value

    if(selectTitle.value === "") {
        alert("Please select a movie first")
    } else {

    addReview(userReview)
    reviewForm.reset()
    }
})

resetButton.addEventListener("click", (event) => {
    event.preventDefault()

    resetReviews()
})

function fetchPeople() {
    fetch("https://ghibliapi.herokuapp.com/people")
    .then((res) => res.json())
    .then((people) => {
        for(const person of people) {
            const name = document.createElement("li")
            name.innerHTML = person.name
            peopleList.append(name)
        }
    })
} 

peopleButton.addEventListener("click", (event) => {
    event.preventDefault()

    fetchPeople()
})

function makeFetchCall() {
    fetch(url)
    .then((res) => res.json())
    .then((movies) => {
        renderTitles(movies)
        for (const movie of movies) {
            apiResults.push(movie)
        }
    })
}

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    makeFetchCall()
 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
