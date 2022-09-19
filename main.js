





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
// Add code you want to run on page load here



    const getMovies = (movieParam) => {
        const url = 'https://ghibliapi.herokuapp.com/films'
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log("data = ", data)

                const dropDownSection = document.querySelector('.dropDownSection')
                const dropDownList = document.querySelector('.dropDownList')
                const dropDownOption = document.querySelector('.dropDownOption')
                const displayMovieInfo = document.querySelector('#display-info')
                const displayMovieHeader = document.createElement('h3')
                const displayMoviePara1 = document.createElement('p')
                const displayMoviePara2 = document.createElement('p')
            
                for(movieInfo of data) {
                    let option = document.createElement('option')
                    option.textContent = movieInfo.title
                    option.value = movieInfo.title
                    dropDownList.append(option)
                }

                dropDownList.addEventListener(("change"), (event) =>{
                    const selectedMovie = `${dropDownList.value}`
                    let index = data.findIndex(movie => movie.title === selectedMovie)

                    // console.log("selected movie = ", selectedMovie)
                    // console.log("selected movie title = ", data[index].title)
                    // console.log("selected movie rel date= ", data[index].release_date)
                    // console.log("selected movie description = ", data[index].description)
                    // console.log('index = ', index)
                    displayMovieHeader.textContent = data[index].title
                    displayMoviePara1.textContent = data[index].release_date
                    displayMoviePara2.textContent = data[index].description

                    displayMovieInfo.append(displayMovieHeader)
                    displayMovieHeader.after(displayMoviePara1)
                    displayMoviePara1.after(displayMoviePara2)
               })
               
               
       


//An `h3` with the movie's title appear in the display-info section of the page.
// A `p` with the movie's release year.
// A `p` with the description of the movie.







        }) //end of fetch call


        .catch((error) => console.log(error))


    } //end of my anonymous function "getMovies"


     

   getMovies()






 }  // end of  special preset run function

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
