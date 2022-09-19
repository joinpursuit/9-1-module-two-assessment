





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch("https://ghibliapi.herokuapp.com/films")
    .then((res)=>res.json())
    .then((res)=>{
       console.log(res)
       
       
       let i  = 0
       res.forEach(element => {
           
           const opt = document.createElement("option")
           opt.setAttribute("value",`${element.title}`)
           opt.innerText=`${element.title}`
           
   
           movies.append(opt)
   
          
           i++ 
       });
   
       window.localStorage.setItem('person',JSON.stringify(res))
       
   })
    .catch((error) => console.log(error))
 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
