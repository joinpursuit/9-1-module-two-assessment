const selectMovie = document.querySelector('#titles');
let displayInfo = document.querySelector('#display-info');
let reviewsUl = document.querySelector('#reviews-ul');

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
function fetchData(URL) {
    
    //FETCH
    fetch(URL)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);

        //Create an option in dropdown menu for each element -- value = film id, text = film title
        resJson.forEach((film) => {
          const option = document.createElement("option");
          option.value = `${film.id}`;
            option.innerText = `${film.title}`;
            console.log(option.value)
          selectMovie.append(option);
          
          
          
          
          // Adds change event listener to dropdown, and creates an h3 with movie title, p tag with movie release year, and p tag with film description.

           selectMovie.addEventListener("change", (e) => {
            //  e.preventDefault();
             console.log('hey')
             
             let movieDetailsH3 = document.createElement("h3");
             let movieDetailsReleaseYear = document.createElement("p");
             let movieDetailsDescription = document.createElement("p");
             if (selectMovie.value === film.id) {
               movieDetailsH3.innerText = `${film.title}`;
               movieDetailsReleaseYear.innerText = `${film.release_date}`;
               movieDetailsDescription.innerText = `${film.description}`;
               displayInfo.innerHTML = ''
               displayInfo.append(
                 movieDetailsH3,
                 movieDetailsReleaseYear,
                 movieDetailsDescription
               );
             }
           }); // closes selectMovie change event listener
          
          
          
          
          
          
        }); // closes forEach
       
      })
      .catch((err) => {
        console.error(err);
      }); // closes fetch call block
    
    

  

    
} //closes funtion fetchData


function run() {
    const URL = "https://ghibliapi.herokuapp.com/films";
    
    fetchData(URL);



   

   
 // Add code you want to run on page load here
   
   
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
