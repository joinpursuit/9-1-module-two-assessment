const selectMovie = document.querySelector('#titles');
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

            
        });
      })
      .catch((err) => {
        console.error(err);
      });
    
    

  

    
}


function run() {
    const URL = "https://ghibliapi.herokuapp.com/films";
    
    fetchData(URL);



   

   
 // Add code you want to run on page load here
   
   
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
