const selecting = document.querySelector(`#titles`)
const form=document.querySelector('form')
const movieTitle=document.querySelector('.name')
const info=document.querySelector('.description')
const date=document.querySelector('.date')
const URL = `https://ghibliapi.herokuapp.com/films`



    fetch(`${URL}`)
    .then((res) => res.json())
    .then((resJson)=>{
        
        resJson.forEach(({id,title})=> {
            const option=document.createElement('option')
            x=title
            option.innerText=`${title}`
            option.value=`${id}`
            selecting.append(option)
            
        });

    })
    .catch(error=>console.log(error))

    selecting.addEventListener('change',()=>{
        fetch(`${URL}/${selecting.value}`)
        .then((res)=>res.json())
        .then((resJson)=> {
            // const movie= resJson.title
            movieTitle.innerHTML=`${resJson.title}`
            info.innerHTML=`${resJson.description}`
            date.innerHTML=`${resJson.release_date}`
    })
        .catch(error=>console.log(error))
    })

    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        fetch(`${URL}/${selecting.value}`)
        .then((res)=>res.json())
        .then((resJson)=>{
            const revTitle= resJson.title
            const rev=e.target.review.value
            list(revTitle, rev)
            form.reset()
        })
        

    })







// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run(titles) {

 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
