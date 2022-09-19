//people are array of links -> fetch again -> object -> 'name' key

// url : https://ghibliapi.herokuapp.com/films

// CREATE MAIN ELEMENT VARIABLES, FORM, SELECT, UL, OL
const dropdown = document.getElementById(`titles`)
const form = document.querySelector(`form`)
const peopleList = document.querySelector(`ol`)
const reviewList = document.querySelector(`ul`)
const resetButton = document.getElementById(`reset-reviews`)

//CREATE FETCH FUNCTION
const fetchInfo = () => {
    fetch(`https://ghibliapi.herokuapp.com/films`)
    .then(res => res.json())
    .then(respJson => {
        
        respJson.forEach(({id, title, description, release_date, people}) => {
            const titleClass = title.split(` `).join(``)
            const option = document.createElement(`option`)
            option.value = id
            // option.setAttribute(`name`, `${title}`)
            option.innerText = title
            dropdown.append(option)

            const summary = document.createElement(`article`)
            summary.innerHTML = `
            <h3>${title}</h3>
            <p>${release_date}</p>
            <p>${description}</p>
            `
            summary.classList.add(`hiddenDescription`)
            summary.id = id
            document.getElementById(`display-info`).append(summary)

            people.forEach(p => {
                fetch(`${p}`)
                .then(res2 => res2.json())
                .then(respJson2 => {
                    const person = document.createElement(`li`)
                    person.classList.add(`${titleClass}`)
                    person.classList.add(`hiddenPerson`)
                    person.innerText = respJson2.name
                    peopleList.append(person)
                })
                .catch(err => console.log(err))
                
            })

        })
    })
    .catch(error => console.log(error))
    
}

// ADD EVENT LISTENERS 
dropdown.addEventListener(`change`, (e) => {

    if(document.querySelector(`.show`)){
        document.querySelector(`.show`).classList.toggle("hiddenDescription");
        document.querySelector(`.show`).classList.remove("show");
    }

    document.getElementById(`${dropdown.value}`).classList.toggle(`hiddenDescription`)
    document.getElementById(`${dropdown.value}`).classList.add(`show`)
})

form.addEventListener(`submit`, (event) => {
    event.preventDefault()
    // console.log(dropdown.value,form.review.value)
    if(dropdown.value === ``){
        window.alert(`Please select a movie first`)
    }
    else{
        const reviewItem = document.createElement(`li`)
        reviewItem.innerHTML = `
        <strong>${document.getElementById(`${dropdown.value}`).innerText.split(`\n`)[0]}</strong>: ${form.review.value}`
        reviewList.append(reviewItem)
    }
   
    form.reset()
})

resetButton.addEventListener(`click`, (events) => {
    events.preventDefault()
    reviewList.innerHTML = ``
})



// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetchInfo()
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
