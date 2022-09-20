const BASE_URL = 'https://ghibliapi.herokuapp.com/films'
const selectMenu = document.querySelector('select')
const movieOption = document.querySelector('option')
const displayInfo = document.querySelector('#display-info')
const submitButton = document.getElementById('submit')
const peopleButton = document.getElementById('show-people')
const peopleList = document.querySelector('ol')
const reviewList = document.getElementById('review-list')
const input = document.getElementById('review')
const resetReviews = document.getElementById('reset-reviews')
const form = document.querySelector('form')

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch(BASE_URL)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((element) => {
                const option = document.createElement('option')
                option.value = element.id
                option.textContent = element.title
                selectMenu.append(option)
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

document.getElementById('titles').addEventListener('change', function() {
    fetch(`${BASE_URL}/${this.value}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            // console.log(this)

            displayInfo.innerHTML = `
            <h3>${data.title}</h3>\n
            <p>${data.release_date}</p>\n
            <p>${data.description}</p>`
        })
        .catch((error) => {
            console.log(error)
        })
})

submitButton.addEventListener('click', (event) => {
    event.preventDefault()
    let e = document.getElementById("titles");
    let text = e.options[e.selectedIndex].text;

    if (text === '') {
        alert('Please select a movie first')
    } else {

    const reviewListItem = document.createElement('li')
    reviewListItem.innerHTML = `<strong>${text}:</strong> ${input.value}`
    reviewList.append(reviewListItem)
    
    input.value = ``
    }
})

peopleButton.addEventListener('click', (event) => {
    event.preventDefault()

    fetch('https://ghibliapi.herokuapp.com/people')
        .then((res)=> res.json())
        .then((data)=> {
            data.forEach((element) => {
                let people = document.createElement('li')
                people.innerHTML = element.name
                peopleList.append(people)
            })
        })
        .catch((error)=> {
            console.log(error)
        })
})

resetReviews.addEventListener('click', (event) => {
    event.preventDefault()

    reviewList.textContent = ''

})



// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
