
const info = document.querySelector("#display-info")
const movie = document.querySelector("#movie")
const people = document.querySelector("ol")
const show = document.querySelector("#show-people")
const reset = document.querySelector("#reset-reviews")
const form = document.querySelector("form")
const reviewList = document.querySelector("ul")
const review = document.querySelector("#review")

let arrayLength = 0

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch("https://ghibliapi.herokuapp.com/films")
    .then((res)=>res.json())
    .then((res)=>{
       console.log(res)
       
       
      
       res.forEach(element =>
         {
           const opt = document.createElement("option")
           opt.setAttribute("value",`${element.title}`)
           opt.innerText=`${element.title}`
           
   
             movie.appendChild(opt)
            
             
           arrayLength++
       });
   
       window.localStorage.setItem('all',JSON.stringify(res))
      
   })
    .catch((error) => console.log(error))
 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);


function addMovie(){

// console.log(arrayLength)
   
for (let w = 0;w<arrayLength;w++){
// console.log(JSON.parse(window.localStorage.getItem("all"))[1]["title"])

        if(movie["value"] === JSON.parse(window.localStorage.getItem("all"))[w]["title"]){
            // console.log(movie.innerText)
        
            const title = document.createElement("h3")
            title.innerText = JSON.parse(window.localStorage.getItem("all"))[w]["title"]
            
            const year = document.createElement("p")
            year.innerText = JSON.parse(window.localStorage.getItem("all"))[w]["release_date"]

            const desc = document.createElement("p")
            desc.innerText = JSON.parse(window.localStorage.getItem("all"))[w]["description"]
            
            info.innerHTML = ""

        info.append(title,year,desc)
        }
    }

        
}

show.addEventListener("click",(event)=>{
event.preventDefault()

    for (let w = 0;w<arrayLength;w++){

        if(movie["value"] === JSON.parse(window.localStorage.getItem("all"))[w]["title"]){

            fetch(`https://ghibliapi.herokuapp.com/film/${JSON.parse(window.localStorage.getItem("all"))[w]["id"]}/people/`)
                .then((res)=>res.json())
                .then((res)=>{
                    console.log(res)
                    
                    res.forEach(element=>{

                        let person = document.createElement("li")
                        person.innerText = element["name"]

                        people.append(person)
                    })
                })
            }
    }
})

form.addEventListener("submit",(event)=>{
    event.preventDefault()
if(movie.value===""){
    alert("Please select a movie to review")
    
}else{
    const rev = document.createElement("li")
    rev.innerHTML = `<strong>${movie["value"]}</strong>: ${review.value}`

    reviewList.append(rev)
    review.value = ""
}
})


reset.addEventListener("click",(event)=>{
    event.preventDefault()

    reviewList.innerHTML = ""
})