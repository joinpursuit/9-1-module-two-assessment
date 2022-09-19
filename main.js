const url = "https://ghibliapi.herokuapp.com/films"





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 fetch(url)
    .then((res) => res.json())
    .then((data) => {
        for(let i = 0; i < data.length; i++){
            const title = data[i].title;
            // console.log(title)
            const option = document.createElement('option');
            option.textContent = title;
            option.value = title;
            const select = document.querySelector('select');
            select.append(option);
        }
    })
    .catch((err) => console.log(err))
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
