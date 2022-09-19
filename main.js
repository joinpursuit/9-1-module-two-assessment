





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run(){
fetch ('https://ghibliapi.herokuapp.com/films')
.then((res) => res.json())
.then((movie) => {
    // console.log(movie)
    const select = document.querySelector('#titles')
    for (const titles of movie) {
        const optionTitles = document.createElement('option')
        optionTitles.innerText = titles.title
        // console.log(optionTitles)
        select.append(optionTitles)   
    }
    const displayInfo = document.querySelector('#display-info')
    const movieTitle = document.createElement('h3')
    const movieRelease = document.createElement('p')
    const description = document.createElement('p')
    
    select.addEventListener('change', (e) => {
        e.preventDefault()
        
        
        for (let i = 0; i < movie.length; i++) {
            if(movie[i].title === e.target.value){
                movieTitle.innerText = movie[i].title
                movieRelease.innerText = movie[i].release_date
                description.innerText = movie[i].description
            }
        }
        displayInfo.append(movieTitle,movieRelease, description)
    })
    const form = document.querySelector('form')
    const user = document.querySelector('#review')
    // // console.log(user)
    const ul = document.querySelector('ul')
    let err = document.createElement('p')
    err.setAttribute('id','err')
    form.append(err)
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        
        if (!select.value){
            alert('Please select a movie first')  
            return user.value.disable = true
        }
        if (select && user.value) {
            const shoutout = document.createElement('li')
            shoutout.innerHTML = `<strong>${select.value}:</strong> ${user.value}` 
            ul.append(shoutout)  
        }
        form.reset()
    })   
    const resetReveiw = document.querySelector('#reset-reviews')
    // removeList = document.querySelectorAll('li')
    // console.log(resetReveiw)
    resetReveiw.addEventListener('click',() => {
        ul.remove()
    })

    const showPeople = document.querySelector('#show-people')
     const peopleList = document.querySelector('ol')
        showPeople.addEventListener('click', () => {
        for (const titles of movie) {
            if(select.value === titles.title){
                   console.log(titles.people)
             for (const person of titles.people) {
                   fetch(person)
                   .then((res) => res.json())
                   .then((person) =>{
                    console.log(person)
                    const list = document.createElement('li')
                   list.innerText = person.name
                    peopleList.append(list)
                   })
                }  
            }
        }
        
        })
    })
.catch((err) => {
    console.log(err)
}) 
// Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);