let url = `https://ghibliapi.herokuapp.com/films`;
const select = document.querySelector('#title');
const info = document.querySelector('#display-info');
const form = document.querySelector(`form`);
const review = document.querySelector('#review');
const ul = document.querySelector('ul');
const button = document.querySelector('#reset-reviews');
const people = document.querySelector(`#show-people`);

let fetchCall;
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
        const id = data[i].id;
        // console.log(id);
        const createOpt = document.createElement('option');
        createOpt.textContent = name;
        createOpt.value = id;
        select.append(createOpt);
      }
    })
    .catch((err) => console.log(err));

  //! initialize movie variable to retain the value of the find method
  let movie;

  //! select add event listener
  select.addEventListener('change', (e) => {
    e.preventDefault();
    const callBack = fetchCall.find((e) => e.id === `${select.value}`);
    // console.log(callBack);

    //! grab the value of callback.title and store it in movie
    movie = `${callBack.title}`;
    // console.log(movie);
    info.innerHTML = '';
    const h3 = document.createElement('h3');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    h3.textContent = `${callBack.title}`;
    p1.textContent = `${callBack.release_date}`;
    p2.innerHTML = `${callBack.description}`;
    info.append(h3, p1, p2);
  });

  //! form event listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(!`${select.value}`);
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

  //! people event listener
  people.addEventListener('click', (e) => {
    e.preventDefault();
    const second = fetchCall.find((e) => e.id === `${select.value}`);
    // console.log(second);

    people.innerHTML = '';

    const characters = second.people;
    // const characters = second.people[0];
    console.log(characters);

    for (let i = 0; i < characters.length; i++) {
      const orderedList = document.createElement('ol');
      orderedList.innerHTML = characters[i].name.value;
      console.log(orderedList);
      people.append(orderedList);
    }
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
