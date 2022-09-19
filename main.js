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

let isSelected = ``
let peopleList = []

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function


function run() {
    fetch (`${BASE_URL}/films`)
    .then(res => res.json())
    .then(res => {
        for (let i=0; i < res.length; i++){
            const title = res[i][`title`]
            const option = document.createElement(`option`)
            option.textContent = `${title}`
            select.append(option)

            // const peopleList = res[i][`people`]

            // for(let num=0; num < peopleList.length; num++){
            //     const personLi = document.createElement(`li`)

            //     personLi.textContent = peopleList[num]
            //     ol.append(personLi)
            // }

            const persons = res[i][`people`]

            for (let num=0; num < res[i][`people`].length; num++){
                const personLi = document.createElement(`li`)

                persons.forEach(person => {
                    fetch(`${person}`)
                    .then(res => res.json())
                    .then(res => {
                        personLi.textContent = `${res[num][`name`]}`
                        ol.append(personLi)
                    })
                    .catch(err => console.log(err))
                })
            }
        }

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

        form.addEventListener(`submit`, (event) => {
            event.preventDefault()

            if (isSelected === `no`){
                window.alert(`Please select a movie first`)
            }

            if (isSelected === `yes`){
                const li = document.createElement(`li`)
                li.innerHTML = 
                `<p><strong>${movieTitle.textContent}:</strong> ${event.target[0].value}</p>`
                ul.append(li)

                form.reset()
            }
        })
        
        reset.addEventListener(`click`, (event) => {
            event.preventDefault()
            ul.innerHTML = `<ul></ul>`
        })

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
