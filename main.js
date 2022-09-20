





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function


function myFunction() {
    console.log("I am running");
}
    function run (){
        myFunction();
        console.log("This is my code");
    
 // Add code you want to run on page load here
    }
    let dropdown= document.getElementById('title')
    let BASE_URL= 'https://ghibliapi.herokuapp.com/films'
fetch(BASE_URL)
.then((response)=>response.json())
.then((json)=>{
    for(let e of json){
        const option = new Option(e.title, e.title);
        option.textContent = e.title;
        option.value = e.id;
        dropdown.append(option);
    }
})
.catch((error) => {
console.log(error);
});
const displayData = (data) => {
    console.log(data);
}
const displayError =(error) =>{
    console.log(error)
}


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
