// New Elements
//  const exampleOption = document.querySelector('option')
 
// Query Selectors
const select = document.querySelector('select')
const reviewForm = document.querySelector('form')
const reviews = document.querySelector('.review')

// Listeners
reviewForm.addEventListener('submit', event=> {
    event.preventDefault()
    const reviewInput = document.getElementById("review").value;
    const title = select.options[select.selectedIndex].value
    const review = document.createElement('option')
    review.value = title
    review.textContent = `${title}: ${reviewInput}`
    reviews.append(review)
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

setTimeout(run, 1000);
