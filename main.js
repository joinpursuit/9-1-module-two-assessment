const BASE_URL = `https://ghibliapi.herokuapp.com`
const select = document.querySelector(`#titles`)
const details = document.querySelector(`#display-info`)
const movieTitle = document.createElement(`h3`)
const year = document.createElement(`p`)
const description = document.createElement(`p`)
const form = document.querySelector(`form`)
const ul = document.querySelector(`ul`)
const reset = document.querySelector(`#reset-reviews`)

let isSelected = ``

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

        const alert = document.createElement(`p`)
        select.after(alert)

        form.addEventListener(`submit`, (event) => {
            event.preventDefault()

            if (isSelected === `no`){
                alert.textContent = `Please select a movie first`
            }

            if (isSelected === `yes`){
                alert.textContent = ``

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
    })
    .catch(err => console.log(err))
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
