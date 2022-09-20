const url = "https://ghibliapi.herokuapp.com/films"
const URL = "https://ghibliapi.herokuapp.com/people"
const select = document.querySelector('select')
const ul = document.querySelector('ul')
const display = document.querySelector('#display-info')
const review = document.querySelector('#review')
const button = document.querySelector('#reset-reviews')
const form = document.querySelector('form')
const showPeople = document.querySelector('#show-people')
const ol = document.querySelector('ol')

function run() {
 fetch(url)
 .then((res) => res.json())
 .then((data) => {
    data.forEach((movie) =>{
        let option = document.createElement('option')
        option.value = movie.title
        option.innerHTML = movie.title
        select.append(option)

        select.addEventListener('change', (event) =>{
            if(event.target.value === option.value){
                display.innerHTML =''
                const title = document.createElement('h3')
                const date = document.createElement('p')
                const description = document.createElement('p')

                title.textContent = `${movie.title}`
                date.textContent = `${movie.release_date}`
                description.textContent = `${movie.description}`

                display.append(title, date, description)
            }
        })
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const input = event.target.review.value
        const li = document.createElement('li')
        let movies = select.value
        if(movies === ""){
            alert('Please select a movie first')
        }else{
            li.innerHTML = `<strong><b>${movies}</b></strong>: ${input}`
                ul.append(li)
                event.target.reset()
        }
    });
 })
   
 .catch(error =>{
    console.log(error)
 });

    button.addEventListener('click', (event) => {
        event.preventDefault()
         ul.innerHTML = '';
      });
}

function getPeople(){
fetch(URL)
 .then(response => response.json())
 .then(peopleData => {

    for(i = 0; peopleData.length; i++){
        const people = document.createElement('li')
        people.innerHTML = peopleData[i].name
        ol.append(people)
    }   
 })
   
 .catch(error =>{
    console.log(error)
 });
} 
showPeople.addEventListener('click', (event) =>{
    event.preventDefault()
    getPeople()
})

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
