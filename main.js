const url = "https://ghibliapi.herokuapp.com/films"
const select = document.querySelector('select')
//this might be dropdown if it doesn't work
const ul = document.querySelector('ul')
const display = document.querySelector('#display-info')
const review = document.querySelector('#review')
const button = document.querySelector('#reset-reviews')
const form = document.querySelector('form')

let allow
//Save in case doing carlos call back thingy
let reviews = review.value


function run() {
 fetch(url)
 .then((res) => res.json())
 .then((data) => {
    // allow = data
    //erase if anything
    data.forEach((movie) =>{
        let option = document.createElement('option')
        option.value = movie.title
        option.innerHTML = movie.title
        select.append(option)

        select.addEventListener('change', (event) =>{
            if(event.target.value === option.value){
                display.innerHTML =''
                const title = document.createElement('h3')
                const date = document.createElement('p')
                const description = document.createElement('p')

                title.textContent = `${movie.title}`
                date.textContent = `${movie.release_date}`
                description.textContent = `${movie.description}`

                display.append(title, date, description)
            }
        })
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const input = event.target.review.value
        const li = document.createElement('li')
        let movies = select.value

        if(movies === ""){
            event.preventDefault()
            alert('Please select a movie first')
        }else{
            data.find(name =>{
                return name.id === movies
            })
            li.innerHTML = `<strong><b>${movies}</b></strong>: ${input}`
                ul.append(li)
                event.target.reset()
        }
    
        form.reset();
    });
    
    
 })
 .catch(error =>{
    console.log(error)
 });
 
 //EVENT LISTENERS MIGHT HAVE TO BE OUTSIDE CODE
   
    

    // select.addEventListener('change', (event) =>{
    //     event(preventDefault)()
       
    // })
    
    button.addEventListener('click', () => {
         ul.innerHTML = '';
      });
}

 




// CODE NOT WORKING. WHEN SOMETHING IS POPULATED TRY TO REVAMP. IF Not Working Keep to ask why. 


// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
