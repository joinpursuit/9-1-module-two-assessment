





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here

const url = "https://ghibliapi.herokuapp.com/films"
const url2 = "https://ghibliapi.herokuapp.com/people"

const section = document.querySelector("#titles")

const h3 = document.querySelector(".name")
const p1 = document.querySelector(".date")
const p2 = document.querySelector(".description")

const review = document.querySelector("#review")
const form = document.querySelector("form")
const reset = document.querySelector("#reset-reviews")

const error = document.querySelector(".error")

const show = document.querySelector("#show-people")


fetch(url)
.then((res) => res.json())
.then((resJson) => {
   
    for(let i = 0; i < resJson.length; i++){
        const filmTitle = resJson[i].title
        const option = document.createElement("option")
        option.innerHTML = filmTitle
        option.value = resJson[i].id
        section.append(option)
        option.textContent = filmTitle
        
    }
     
})
.catch((error) => console.log(error))


section.addEventListener("change", () => {
    fetch(`${url}/${section.value}`)
    .then((res) => res.json())
    .then((resJson) => {
        const title = resJson.title
        
        h3.innerHTML = title
        
        const date = resJson.release_date
        
        p1.innerHTML = date
        
        const detail = resJson.description
        
        p2.innerHTML = detail
        
        const value = section.value
        show.addEventListener("click", () => {
            const ol = document.querySelector("ol")
            ol.innerHTML = ""
            fetch(url2)
            .then((res) => res.json())
            .then((resJson) => {
                resJson.forEach((res) => {
                    const name = res.name
                    if(res.films.includes(`${url}/${section.value}`)){
                        makeList(name)
                    }
                })
            })
            .catch((error) => console.log(error))
        })
    })
    .catch((error) => console.log(error))
})



form.addEventListener("submit", (event) => {
    event.preventDefault()
   if(section.value === ""){
    error.classList.remove("hidden")
    alert(`Please select a movie first`)
   }
   else{
    error.classList.add("hidden")
    fetch(`${url}/${section.value}`)
    .then((res) => res.json())
    .then((resJson) => {
        const title = resJson.title
        
        const reviews = event.target.review.value
        
        generateList(reviews, title)
        
        form.reset()
    })
    .catch((error) => console.log(error))
    
}
})

function addList(reviews, title){
    const li = document.createElement("li")
    li.setAttribute("class", "unorder")
    const strong = document.createElement("strong")
        
        if(title){
            strong.textContent = `${title}: `
            li.textContent =reviews
            li.prepend(strong)
        }
        return li
    }
    
    
    function generateList(reviews, title){
        const li = addList(reviews, title);
        const ul = document.querySelector("ul");
        
        ul.append(li)
    }

    reset.addEventListener("click", () => {
        const unorder = document.querySelector("ul")
    const list = document.querySelectorAll(".unorder")
    list.forEach((li) => {
        
        unorder.removeChild(li)
    })
})

function getList(name){
    const li = document.createElement("li")
       
        if(name){
           
            li.innerHTML = name
        }
        return li
    }

    function makeList(name){
        const li = getList(name);
        const ol = document.querySelector("ol");

        ol.append(li)
    }


}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
