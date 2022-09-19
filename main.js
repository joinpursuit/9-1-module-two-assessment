const form = document.querySelector("form")
const selectTitles = document.querySelector("#titles")
const reviewInput = document.querySelector("#reviews")
const display= document.querySelector("#display-info")
// const form = document.querySelector("form")
// const form = document.querySelector("form")
// const form = document.querySelector("form")
// const form = document.querySelector("form")
// const form = document.querySelector("form")





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
let apiResult;
const URL = 'https://ghibliapi.herokuapp.com/films'
function run() {
    fetch(URL)
    .then((result)=> result.json())
    .then((resJson)=>{
      apiResult = resJson
      console.log(apiResult)
apiResult.forEach((film) => {
 let selectOpt = document.createElement("option") 
 selectOpt.innerHTML= film.title
 selectOpt.value= film.id
 selectTitles.append(selectOpt)
})
    })
.catch((error)=> console.log(error))


selectTitles.addEventListener("change", ()=>{
    //! remember to clear secstion after seleting another movie 
fetch(`https://ghibliapi.herokuapp.com/films/${selectTitles.value}`)
 .then((res)=> res.json()) 
 .then((resJson)=>{
    // console.log(resJson)
const titleH3 = document.createElement('h3')
titleH3.innerHTML= resJson.title

const year = document.createElement('p')
year.innerHTML= resJson.release_date

const description = document.createElement('p')
description.innerHTML=resJson.description
console.log(description)

display.append(titleH3, year, description)
 })
.catch((err)=> console.log(err))

})
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
