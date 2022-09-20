





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
// Add code you want to run on page load here
const dropDownSection = document.querySelector('.dropDownSection')
const dropDownList = document.querySelector('.dropDownList')
const dropDownOption = document.querySelector('.dropDownOption')
const displayMovieInfo = document.querySelector('#display-info')
const reviewForm = document.querySelector('.reviewForm')
let reviewInputBox = document.querySelector('#review')

const enteredReviews = document.querySelector('#enteredReviews')



    const getMovies = (movieParam) => {
        const url = 'https://ghibliapi.herokuapp.com/films'

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log("data = ", data)

              
                const displayMovieHeader = document.createElement('h3')
                const displayMoviePara1 = document.createElement('p')
                const displayMoviePara2 = document.createElement('p')

               
            
                //loop through fetched movie api data to assign title info to drop down list option elements
                for(movieInfo of data) {
                    let option = document.createElement('option')
                    option.textContent = movieInfo.title
                    option.value = movieInfo.title
                    dropDownList.append(option)
                }

                //** Event Listener for Drop Down List **
                dropDownList.addEventListener(("change"), (event) =>{
                    const selectedMovie = `${dropDownList.value}`
                    let index = data.findIndex(movie => movie.title === selectedMovie)
                    // API data tests
                    // console.log("selected movie = ", selectedMovie)
                    // console.log("selected movie title = ", data[index].title)
                    // console.log("selected movie rel date= ", data[index].release_date)
                    // console.log("selected movie description = ", data[index].description)
                    // console.log('index = ', index)
                    displayMovieHeader.textContent = data[index].title
                    displayMoviePara1.textContent = data[index].release_date
                    displayMoviePara2.textContent = data[index].description

                    displayMovieInfo.append(displayMovieHeader)
                    displayMovieInfo.append(displayMoviePara1)
                    displayMovieInfo.append(displayMoviePara2)

                })  //end of Select event listener
                   

                // ** Event Listener for Review Form **

                reviewForm.addEventListener("submit", (event) =>{
                    event.preventDefault()
                    const alertMsg = () => {alert("Please select a movie first")}
                    const reviewItem = document.createElement('li')
        
                    let reviewText = event.target.review.value
                    reviewItem.innerHTML = `<strong>${dropDownList.value}: </strong>${reviewText}`  
                    if(dropDownList.value === "") {
                       
                        alert("Please select a movie first")
                        // alertMsg()
                        // let msgNoMovie = document.createElement('p')
                        // msgNoMovie.innerHTML = "Please select a movie first"
                        // msgNoMovie.setAttribute("style","font-size: 15px; color: red")
                        // msgNoMovie.classList.add('error')
                        // dropDownSection.append(msgNoMovie)
                    } else {
                  
                    //console.log('reviewText=', reviewText)
                   
                 //display movie title & review
                    enteredReviews.append(reviewItem)   //attach review to ordered list element
                    reviewInputBox.value = ""    //clear input field
                    }
                })  // end of Review Form event listener



            
                    const reviewResetButton = document.querySelector('#reset-reviews')
                    reviewResetButton.type = "submit"

                // ** Event Listener for Review Reset Button **
                reviewResetButton.addEventListener(("click"), (event) =>{
                    event.preventDefault()
                    // reviewItem.remove()      //remove line items (reviews) from the review section - this method was not accepted by Cypress
                    enteredReviews.innerHTML =""
                })  // end of Review Form event listener
                 

                
                    const showPeopleButton = document.querySelector('#show-people')
                    const showPeopleList = document.querySelector('.showPeopleList')
                    showPeopleButton.type = "submit"

                // ** Event Listener for Show People Button **
                showPeopleButton.addEventListener(("click"), (event) =>{
                    event.preventDefault()
                    if(document.querySelector(".personListItem")){
                        document.querySelector(".personListItem").remove() 
                       }
                    let index = data.findIndex(movie => movie.title === dropDownList.value)
                    let totalPersons = data.length
                   
                        for (let i = 0; i < totalPersons; i++){
                       // console.log(data[index].people[i])
                        let url2 =`${data[index].people[i]}`
                        fetch(url2)
                            .then((response) => response.json())
                            .then((personData) => {
                            let personName = document.createElement('li')
                            personName.classList.add("personListItem")
                            console.log("person data = ", personData.name)
                            personName.textContent = personData.name
                            showPeopleList.append(personName)
                            })
                        }
                       // .catch((error) => console.log(error))  //this caused error in closing brackets of main fetch, so had to commment out -as a result it creats a console error but the fetch still works - I tried to find out how to resolve the error, but do not know yet. Thanks,
                    }) // end of Show People Button event listener

                   
                    
               
                 



        }) //end of fetch call


        .catch((error) => console.log(error))


    } //end of function "getMovies"


     

   getMovies()






 }  // end of  special preset run function

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);


//notes
                // const reviewResetButton  = document.createElement('reviewResetButton')
                // reviewResetButton.classList.add('reset-reviews')
                // enteredReviews.after(reviewResetButton)
