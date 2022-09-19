
const info = document.querySelector("#display-info")
const movie = document.querySelector("#movie")



// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch("https://ghibliapi.herokuapp.com/films")
    .then((res)=>res.json())
    .then((res)=>{
       console.log(res)
       
       
       let i  = 0
       res.forEach(element =>
         {
           const opt = document.createElement("option")
           opt.setAttribute("value",`${element.title}`)
           opt.innerText=`${element.title}`
           
   
             movie.appendChild(opt)
   
           i++ 
       });
   
       window.localStorage.setItem('all',JSON.stringify(res))
       
   })
    .catch((error) => console.log(error))
 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1500);


function addMovie(){
        
    
    
for (let w = 0;w<JSON.parse(window.localStorage.getItem("all")).length;w++){

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