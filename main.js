//Declaring constant variables
const BASE_URL = `https://ghibliapi.herokuapp.com`
const select = document.querySelector(`#titles`)
const details = document.querySelector(`#display-info`)
const movieTitle = document.createElement(`h3`)
const year = document.createElement(`p`)
const description = document.createElement(`p`)
const form = document.querySelector(`form`)
const ul = document.querySelector(`ul`)
const reset = document.querySelector(`#reset-reviews`)
const people = document.querySelector(`.people`)
const button = document.querySelector(`#show-people`)
const ol = document.querySelector(`ol`)

//Declaring variables that an be re-assigned values
let isSelected = ``

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    //Fetch API data for films
    fetch (`${BASE_URL}/films`)
    .then(res => res.json())
    .then(res => {

        //Adding API data to text content in HTML elements
        for (let i=0; i < res.length; i++){
            const title = res[i][`title`]
            const option = document.createElement(`option`)
            option.textContent = `${title}`
            select.append(option)

            const persons = res[i][`people`]

            //For loop to add API data to People section
            for (let num=0; num < persons.length; num++){
                const personLi = document.createElement(`li`)

                //Fetching API data for people and adding to ol element
                fetch (`${persons[num]}`)
                .then (res => res.json())
                .then (res => {
                    personLi.textContent = res[`name`]
                    ol.append(personLi)
                })
                .catch (err => console.log(err))
            }
        }

        //Event listener for select element
        select.addEventListener(`change`, (event) => {
            event.preventDefault()

            const index = event.path[0].selectedIndex

            if(index > 0){
                details.append(movieTitle, year, description)
                movieTitle.textContent = `${res[index-1][`title`]}`
                year.textContent = `${res[index-1][`release_date`]}`
                description.textContent = `${res[index-1][`description`]}`
                isSelected = `yes`
            } else {
                isSelected = `no`
            }
        })

        //Event listener for adding a review
        form.addEventListener(`submit`, (event) => {
            event.preventDefault()

            //Creating alert message if no movie selected
            if (isSelected === `no`){
                window.alert(`Please select a movie first`)
            }

            //Adds reviews to ul element
            if (isSelected === `yes`){
                const li = document.createElement(`li`)
                li.innerHTML = 
                `<p><strong>${movieTitle.textContent}:</strong> ${event.target[0].value}</p>`
                ul.append(li)

                form.reset()
            }
        })
        
        //Adding event listener to reset reviews list
        reset.addEventListener(`click`, (event) => {
            event.preventDefault()
            ul.innerHTML = `<ul></ul>`
        })

        //Adding event listener to Show People button
        button.addEventListener(`click`, (event) => {
            event.preventDefault()
            ol.classList.toggle(`hidden`)
        })         
    })
    .catch(err => console.log(err))
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
