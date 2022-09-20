let counter = 0
let resz = null
let detailsCounter = 0

// New Elements
//  const exampleOption = document.querySelector('option')
 
// Query Selectors
const select = document.querySelector('select')
const reviewForm = document.querySelector('form')
const reviews = document.querySelector('.review')
const button = document.querySelector('.reset') // reset views button
const details = document.querySelector('div')
// Listeners
reviewForm.addEventListener('submit', event=> {
    event.preventDefault()
    const reviewInput = document.getElementById("review").value;
    const title = select.options[select.selectedIndex].value
    const review = document.createElement('li')
    
    //checking for a value selected
    if(!select.options[select.selectedIndex].value){
        alert('Please select a movie first')
    }

    review.value = title
    review.innerHTML = `<strong>${title}:</strong> ${reviewInput}`
    reviews.append(review)
    reviewForm.reset()
    counter += 1
})

button.addEventListener('click', event => {
    const remItem = document.querySelector('li')
    const remItemNum = document.querySelectorAll('li')
    console.log(remItemNum.length)
    for (let index = 0; index < counter; index++) {
        remItem.remove()
    }
})


// Appends
//  select.append(exampleOption)

// Content | Attributes
//  exampleOption.textContent = 'Test'




// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 const baseURL = 'https://ghibliapi.herokuapp.com'
 const peopleURL = '/people'
 const filmURL = '/films'


 fetch(`${baseURL}${filmURL}`)
 .then((res) => res.json())
 .then((res) => {
    people = res
    console.log(`Response:`,res,'End of Response')

    // populating our select
    for (let i = 0; i < res.length; i++) {
        const title = document.createElement('option')
        title.value = `${res[i].title}`
        title.textContent = `${res[i].title}`
        select.append(title)
    }

 })



 // Add code you want to run on page load here { API CALL }
 


}


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

// movie details 
const baseURL = 'https://ghibliapi.herokuapp.com'
const peopleURL = '/people'
const filmURL = '/films'
select.addEventListener('change', function handleChange(event) {
    // console.log(event.target.value)
    const selected = event.target.value

 fetch(`${baseURL}${filmURL}`)
 .then((res) => res.json())
 .then((res) => {
    if (document.querySelector('h3')){
        document.querySelector('p').remove()
        // document.querySelector('p').remove()
        document.querySelector('p').remove()
        document.querySelector('h3').remove()
    }
    people = res

    for (var i = 0; i < res.length; i++) {
    // console.log(`Response:`,res,'End of Response')
    if (res[i].title === event.target.value) {
        detailsCounter += 1
        const movieDetails = document.createElement('h3')
        const movieDetailsP = document.createElement('p')
        const movieDetailsP2 = document.createElement('p')
        movieDetails.textContent = res[i].title
        movieDetailsP.textContent = res[i].release_date
        movieDetailsP2.textContent = res[i].description
        movieDetails.classList.add('rem')
        movieDetailsP.classList.add('rem')
        movieDetailsP2.classList.add('rem')
        details.append(movieDetails,movieDetailsP,movieDetailsP2)
    }}
})
}) 


setTimeout(run, 1000);