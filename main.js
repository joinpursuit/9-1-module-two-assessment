const form = document.querySelector('form')
const option = document.querySelector('option')
const title = document.getElementById('title')
const select = document.querySelector('select')
const div = document.querySelector('div')
const reviews = document.querySelector('ul')
const button = document.querySelector('button')
let info = ``

form.addEventListener('submit', (event) => {
    event.preventDefault()
})

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    // Add code you want to run on page load here
    fetch('https://ghibliapi.herokuapp.com/films')
    .then((res) => res.json())
    .then((resJson) => {
        info = resJson
        resJson.forEach((films) => {
            // select feature
            const nOption = document.createElement('option')
            nOption.value = films.title
            nOption.innerText = films.title
            select.append(nOption)   
        });
        // movie description
        select.addEventListener('change', () => {
            // console.log(info)
            // console.log(select.value)
            div.innerHTML = ``
            info.forEach((movie) => {
                if(select.value === movie.title){
                    const movies = document.createElement('h3')
                    movies.innerText = movie.title
                    const year = document.createElement('p')
                    year.innerText = movie.release_date
                    const about = document.createElement('p')
                    about.innerText = movie.description
                    div.append(movies, year, about)
                }
            })
            //
            // adding reviews.
    
            const li = document.createElement('li')
            const ul = document.querySelector('ul')
            ul.append(li)
            let input = document.createElement('a')
            form.reset()
            
            input.innerHTML = ``
            li.textContent = ``
            input.append(li)
            console.log(li)
        })
    })
    .catch((err) => console.log(err))
}
    
    // This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
    // So that testing can work as expected for now
    // A non-hacky solution is being researched

setTimeout(run, 1000);
