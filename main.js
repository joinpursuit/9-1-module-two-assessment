





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function


function myFunction() {
    console.log("I am running");
}
    function run (){
        myFunction();
        console.log("This is my code");
    
 // Add code you want to run on page load here
    }
    let reviewForm=document.querySelector('form')
    let dropdown= document.getElementById('title')
    let BASE_URL= 'https://ghibliapi.herokuapp.com/films'
fetch(BASE_URL)
.then((res)=>res.json())
.then((json)=>{
    for(let e of json){
        const option = new Option(e.title, e.title);
        option.textContent = e.title;
        option.value = e.id;
        dropdown.append(option);
        dropdown.addEventListener('change', (event)=>{
            event.preventDefault();
            const pickedID =event.target.value
            let info =document.getElementById('display-info')
    
            for(let movie of json){
                if (pickedID === movie.id){
                    info.textContent = ''
                    const h3 =document.createElement('h3');
                    info.prepend(h3);
                    h3.textContent = movie.title;
                    const p1 =document.createElement('p');
                    info.append(p1);
                    p1.textContent=movie.release_date;
                    const p2 =document.createElement('p');
                    p2.textContent=movie.description;
                    info.append(p2)
                    
                }
            }
            let peopleButton=document.getElementById('show-people')

            let PEOPLE_URL ='https://ghibliapi.herokuapp.com/people'
            
            let peopleNames=document.querySelector('ol')
            let ul =document.querySelector('ul')
            
            peopleButton.addEventListener('click', (event)=> {
                event.preventDefault()
                fetch(PEOPLE_URL)
                .then((res)=> res.json())
                .then((people)=>{
                    people.innerHTML = ' ';
                    for(let person of people){
                        for (let film of person.films){

                        
                        if(film === `${BASE_URL}${pickedID}`){
                            let personList =document.createElement('li')
                            personList.textContent = person.name
                            peopleNames.append(personList)
                     }
                    }
                    }
                })   
             })

        })     
     }
        
    })
  

.catch((error)=>{
console.log(error);  


    let reviewForm=document.querySelector('form') 
    
    getReviews(json);

function getReviews(json){




    reviewForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        let reviewInput =document.getElementById('review').value;
        if(dropdown.value ===' '){
            alert(`Please select a movie first`);
        }
        else
        {

        let movie=json.find((movie)=> movie.id === dropdown.value)
        let li = document.createElement('li')
           li.innerHTML= `<strong>${movie.title}:</strong>${reviewInput}`
          ul.append(li)
        }


       reviewForm.reset()
    })

}
const displayData = (data) => {
    console.log(data);
}
const displayError =(error) =>{
    console.log(error)
}
})

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
