





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
// Add code you want to run on page load here

const url = 'https://ghibliapi.herokuapp.com/films'
const url2 = 'https://ghibliapi.herokuapp.com/people'

const dropDownSection = document.querySelector('.dropDownSection')
const dropDownList = document.querySelector('.dropDownList')
const dropDownOption = document.querySelector('.dropDownOption')

const displayMovieInfo = document.querySelector('#display-info')
const reviewForm = document.querySelector('.reviewForm')
let reviewInputBox = document.querySelector('#review')
const enteredReviews = document.querySelector('#enteredReviews')

const showPeopleButton = document.querySelector('#show-people')
const showPeopleList = document.querySelector('.showPeopleList')


    const getMovies = (peopleObj) => {

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log("film data = ", data)
    
                //create heading and 2 paragraph elements for movie information
                const displayMovieHeader = document.createElement('h3')
                const displayMoviePara1 = document.createElement('p')
                const displayMoviePara2 = document.createElement('p')

                //loop through fetched movie api data to assign title info to drop down list option elements
                let movieIDs =[]
                let movieNamesIDs =[]
                let oneMovieID = {}
                let movTitle
                for(movieInfo of data) {
                    let option = document.createElement('option')
                    option.textContent = movieInfo.title
                    option.value = movieInfo.title
                    dropDownList.append(option)
                    movTitle = `"${movieInfo.title}",`
                    oneMovieID[movTitle] = movieInfo.id
                }

                let oneID, oneTitle
                for(i=0; i < data.length; i++) {
                    oneID = data[i].id
                    oneTitle = data[i].title
                    movieNamesIDs.push(oneID)
                    movieNamesIDs.push(oneTitle)
                    // console.log(  'movieNameIDs =' ,movieNameIDs)
                }
                //console.log(  'moviesNamesIDs =' ,movieNamesIDs)


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
                    
                    //add movie data to appropriate elements
                    displayMovieHeader.textContent = data[index].title
                    displayMoviePara1.textContent = data[index].release_date
                    displayMoviePara2.textContent = data[index].description

                    //attach elements to the div in HTML - display-info
                    displayMovieInfo.append(displayMovieHeader)
                    displayMovieInfo.append(displayMoviePara1)
                    displayMovieInfo.append(displayMoviePara2)

                })  //end of Select event listener
                   

                // ** Event Listener for Review Form **
                reviewForm.addEventListener("submit", (event) =>{
                    event.preventDefault()
                    // const alertMsg = () => {alert("Please select a movie first")}
                    const reviewItem = document.createElement('li')
                    let reviewText = event.target.review.value
                    reviewItem.innerHTML = `<strong>${dropDownList.value}: </strong>${reviewText}`  
                    
                    //check if movie title input is blank; if so, display alert box
                    if(dropDownList.value === "") {
                        alert("Please select a movie first")
                    } else {
                     
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
                 

    
                   showPeopleButton.type = "submit"

                // ** Event Listener for Show People Button **
                showPeopleButton.addEventListener(("click"), (event) =>{
                   event.preventDefault()
  
                   // When Show People button is clicked, remove old list
                   if(document.querySelector(".personListItem")){
                    document.querySelector(".personListItem").remove() 
                    }

                    // Get selected movie title //
                   
                    console.log( "dropDownList.value = ", dropDownList.value)

                    // <----- *** GET PEOPLE DATA *** -------> //

                    fetch(url2)  //from people endpoint
                    .then((response) => response.json())
                    .then((data2) => {
                    console.log('People Data =', data2)


                    let totalPersons = data2.length
                        // for (let i = 0; i < totalPersons; i++){}
                        //using destructuring to extract
                        // let [{id: nameID,name, films}] = data[i]
                        //console.log('person name =', name,  'person id =', nameID, 'movie id =', films)

                        // for(let thisData of data){
                        //     if (data.films === movie.id){
                                // let personName = document.createElement('li')
                                // personName.classList.add("personListItem")
                                // console.log("person data = ", data.name)
                                // personName.textContent = data.name
                                // showPeopleList.append(personName)  
                        //    }
                        // }
                        // let index = data.findIndex(movie => movie.title === dropDownList.value)
                        let thisMovieID


                        let personID, personName
                        let peopleNames =[]
                        let selectedName =[]
   
                   for(thisMovie of data){
                        for(onePerson of data2){

                            if(thisMovie.id == onePerson.films){
                                personName = onePerson.name
                                peopleNames.push(personName)
                                console.log('personName',  personName)
                            }
                            // console.log( 'onePerson Film',onePerson.films[0])
                        }
                     }
                    
                //    let counter =0
                //         for(let thisData of data2){
                //             [{name, films}] = thisData
                //             console.log('thisData name and film id =', name, films, counter)
                //             for(let thisMovie of data){
                //                 console.log("thisMovie =",thisMovie, counter)
                //                 if ((films == (thisMovie.id))){
                //                     selectedName.push(name)
                //                 }
                //                 counter++
                //             }
                //         }
                        // console.log("movieNamesIDs = ",movieNamesIDs)
                        console.log('selectedName', selectedName)
                        
                    }) //ed od 2nd .then promise statement for 2nd Fetch (People  endpoint)

                    .catch(error => console.log(error))  
    
                   // end of getPeople fetch
                
            }) //end of Show People Button event listener
                    
                    //INSTRUCTIONS - You want to select the people who have the same movie `id` as the selected `movie`.
                    //console.log(a[0].includes(b))
                    //using destructuring to extract
                    // const [{id: nameID,name, films}] = data
                    // console.log(nameID,name, films)
                            // getMovies(peopleObj)
                  
        }) //ed od 2nd .then promise statement for 1st fetch (with Films endpoint)

        .catch((error) => console.log(error))  //end of  1st fetch call


                

    } //end of function "getMovies"

    getMovies()

}  // end of  special preset run function

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);


        //NOTES
              // <-------- FETCH as a Variable for an ANONYMOUS FUNCTION----->
                //  const functionVarName = () => {
                //     let url = 'https://url address'
                //     fetch(url)
                //     .then((response) => response.json())
                //     .then((data) => {
                //      console.log('data =', data)

                //   })  // end of 2nd .then promise statement for 2nd Fetch (People  endpoint)
                //    .catch(error => console.log(error))  
                //  end of fetch
             
                //functionVarName()  // call function to activate

                //INSTRUCTIONS- You want to select the people who have the same movie `id` as the selected `movie`.
                //console.log(a[0].includes(b))
                //using destructuring to extract
                // const [{id: nameID,name, films}] = data
                // console.log(nameID,name, films)
        
                    
  
                // <--------SHOW PEOPLE CODE ----------->
                // let personName = document.createElement('li')
                //  personName.classList.add("personListItem")
                //  console.log("person data = ", personData.name)
                //  personName.textContent = personData.name
                //  showPeopleList.append(personName)  

                // ** Event Listener for Show People Button **
                //  showPeopleButton.addEventListener(("click"), (event) =>{
                //  event.preventDefault()
                //   })
                //  if(document.querySelector(".personListItem")){
                //     document.querySelector(".personListItem").remove() 
                //  }
                // let index = data.findIndex(movie => movie.title === dropDownList.value)
                // let totalPersons = data.length

       
                // GETTING PEOPLE DATA FROM FIRST FETCH WITH FILM ENDPOINT
                //for (let i = 0; i < totalPersons; i++){
                // console.log(data[index].people[i])
                // let url2 =`${data[index].people[i]}`
                 //}
              
                //  end of Show People Button event listener
                  
