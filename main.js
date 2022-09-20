const films_url = "https://ghibliapi.herokuapp.com/films"
const select = document.querySelector('select');
const form = document.querySelector('form');
const body = document.querySelector('body');
let recallData;


// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

 // populates dropdown menu with film names
 fetch(films_url)
    .then((res) => res.json())
    .then((data) => {
        recallData = data
        for(let i = 0; i < data.length; i++){
            const title = data[i].title;
            // console.log(title)
            const option = document.createElement('option');
            option.textContent = title;
            option.value = title;
            select.append(option);
        }
    })
    .catch((err) => console.log(err));


    select.addEventListener('change', (event) => {
        event.preventDefault();
        // dataFind is a variable used to store the films data (recallData) to use later
        const dataFind = recallData.find((el) => el.title === `${select.value}`);
        //  console.log(dataFind)
        const info = document.querySelector('#display-info');
        info.innerHTML = ''
        const h3 = document.createElement('h3')
        const p = document.createElement('p')
        const p2 = document.createElement('p')
        // movie details section gets populated with movie description depending on the film sleected
        h3.textContent = `${dataFind.title}`
        p.textContent = `${dataFind.release_date}`
        p2.innerHTML = `${dataFind.description}`
        info.append(h3, p, p2)
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // add reviews based on the film selected
        const name = `${select.value}`;
        const review = document.querySelector('#review')
        const reviewVal = review.value
        const list = document.createElement('li')
        list.innerHTML = `<strong>${name}: </strong>${reviewVal}`;
        const ul = document.querySelector('ul') 
        ul.append(list);
        // clears input after submission of review
        form.reset();
        
        // resets the reviews (empties the ul content)
        const button = document.querySelector('#reset-reviews')
        button.addEventListener('click', () => {
            ul.innerHTML = ''
        }); 

        // error (alert) if review was submitted WITHOUT selecting a film
        if(select.value === ''){
            window.alert(`Please select a movie first`)
        }; 
    })
};


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
