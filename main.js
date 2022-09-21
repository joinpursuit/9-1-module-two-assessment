let url = `https://ghibliapi.herokuapp.com/films`;
const select = document.querySelector('#title');
const info = document.querySelector('#display-info');
const form = document.querySelector(`form`);
const review = document.querySelector('#review');
const ul = document.querySelector('ul');
const button = document.querySelector('#reset-reviews');
const people = document.querySelector(`#show-people`);
const ol = document.querySelector('ol');

//! initialize fetchCall var to store the data of the initial fetch to easily access later on for other event listeners
let fetchCall;

//! initialize movie variable to retain the value of the find method
let movie;

//! initialize id var to retain the value of the id to use later in people event listener
let id;

// To ensure Cypress tests work as expected, add any code/functions that you would like to run on page load inside this function
function run() {
  // Add code you want to run on page load here

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      fetchCall = data;

      for (let i = 0; i < data.length; i++) {
        const name = data[i].title;
        // console.log(name);
        id = data[i].id;
        console.log(id);
        const createOpt = document.createElement('option');
        createOpt.textContent = name;
        createOpt.value = id;
        select.append(createOpt);
      }
    })
    .catch((err) => console.log(err));

  //! select add event listener
  select.addEventListener('change', (e) => {
    e.preventDefault();
    const container1 = fetchCall.find((e) => e.id === `${select.value}`);
    // console.log(container1);

    //! grab the value of callback.title and store it in movie var
    movie = `${container1.title}`;
    release_date = `${container1.release_date}`;
    description = `${container1.description}`;
    // console.log(movie);
    info.innerHTML = '';
    const h3 = document.createElement('h3');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    h3.textContent = `${movie}`;
    p1.textContent = `${release_date}`;
    p2.innerHTML = `${description}`;
    info.append(h3, p1, p2);
  });

  //! form event listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    //! Select a movie error message
    function error() {
      alert(`Please select a movie first`);
    }

    if (!`${select.value}`) {
      error();
    } else {
      const name = `${movie}`;
      const myReview = `${review.value}`;
      //   console.log(name);
      //   console.log(myReview);
      const list = document.createElement('li');
      ul.append(list);
      list.innerHTML = `<strong><b>${name}:</b></strong> ${myReview}`;
      form.reset();
    }
  });

  button.addEventListener('click', () => {
    ul.innerHTML = '';
  });

  //! attempted people event listener, couldn't get it to work
  // people.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   const container2 = fetchCall.find((e) => e.id === `${select.value}`);
  //   console.log(container2);

  //   people.innerHTML = '';

  //   const characters = container2.people;
  // const characters = container2.url;
  // const characters = second.people[0];
  // console.log(characters);

  // for (let i = 0; i < characters.length; i++) {
  //   fetch(characters)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         const orderedList = document.createElement('ol');

  //         const showPeopleInFilm = characters.find(
  //           (el) => el.id === `${select.value}`
  //         );
  //         console.log(showPeopleInFilm);
  //         orderedList.innerHTML = people[i].films.value;
  //         console.log(orderedList);
  //         people.append(orderedList);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // });

  //! Carlos'review answer
  people.addEventListener('click', (e) => {
    ol.innerHTML = '';
    fetch(`https://ghibliapi.herokuapp.com/people`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((person) => {
          if (
            person.films[0] === `https://ghibliapi.herokuapp.com/films/${id}`
          ) {
            // if(person.films.includes(`https://ghibliapi.herokuapp.com/films/${id}`))
            const li = document.createElement('li');
            li.innerText = person.name;
            console.log(person.name);
            ol.append(li);
          }
        });
      })
      .catch((err) => console.log(err));
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
