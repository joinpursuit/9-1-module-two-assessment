const BASE_URL = 'https://ghibliapi.herokuapp.com/films'
const selectMenu = document.querySelector('select')
const movieOption = document.querySelector('option')
const displayInfo = document.querySelector('#display-info')

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch(BASE_URL)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            data.forEach((element) => {
                const option = document.createElement('option')
                option.value = element.id
                option.textContent = element.title
                selectMenu.append(option)
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

document.getElementById('titles').addEventListener('change', function() {
    fetch(`${BASE_URL}/${this.value}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)

            displayInfo.innerHTML = `
            <h3>${data.title}</h3>\n
            <p>${data.release_date}</p>\n
            <p>${data.description}</p>`
        })
        .catch((error) => {
            console.log(error)
        })
  });



// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
