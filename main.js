// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    // Add code you want to run on page load here
    const url = 'https://ghibliapi.herokuapp.com/films'
    const menu = document.querySelector("#titles")
    const reviewsList = document.querySelector('ul')
    const value = document.querySelector('form')
    const displayInfo = document.querySelector('div')
    const userInput = document.querySelector("#review")
    const resetReview = document.querySelector('#reset-reviews')
    let dropDownValue = ''
    let allData = []

    // find the option value 
    fetch(url)
        .then(response => response.json())
        .then(data => {
            allData = data
                // console.log(data)
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement("option")
                option.value = data[i].title
                option.innerHTML = data[i].title
                    // add a value for the option and give it the title
                    // option.innerHTML = data[i].title
                menu.append(option)

            }


            const movieInfo = document.createElement('h3')
            const release = document.createElement("p")
            const movieDescription = document.createElement("p")

            menu.addEventListener("change", (event) => {

                console.log('change')
                event.preventDefault()
                    // find the movie in the data 
                    // based on the title
                    // compare the value thats in the option block 
                    // and the value thats in the array to the title 
                    // console.log(event)
                    // console.log(event.target.value)

                // try find method
                // dot into the object 
                let movie = data.find(item => {
                    return item.title === event.target.value
                })

                movieInfo.innerHTML = movie.title
                dropDownValue = movie.title
                release.innerHTML = movie.release_date
                movieDescription.innerHTML = movie.description

                console.log(movie)



                displayInfo.append(movieInfo, release, movieDescription)



                // }

            })

            value.addEventListener("submit", (event) => {
                event.preventDefault()
                const list = document.createElement('li')
                console.log("submit")

                if (dropDownValue === "") {
                    alert('Please select a movie first')
                } else if (userInput.value === "") {
                    alert("you're missing a comment")
                }

                list.innerHTML = `<strong>${movieInfo.innerHTML}:${userInput.value}</strong>`
                userInput.value = ""
                reviewsList.append(list)



                // what information goes in the LI
                //how do I add it to the ul (append it)

            })

            // A button with an id of reset-reviews, when clicked, should empty the ul where the reviews were being populated.

            resetReview.addEventListener("click", (event) => {
                    reviewsList.remove()
                })
                // value.addEventListener("dblclick", (event) => {
                //     console.log("dblclick")
                //     resetReview.remove()

            // })

        })


    .catch(console.error())

}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);