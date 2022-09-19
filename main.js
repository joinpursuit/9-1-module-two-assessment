let url = `https://ghibliapi.herokuapp.com/films`;
const select = document.querySelector('select');
const info = document.querySelector('#display-info');
const form = document.querySelector(`form`);
const review = document.querySelector('#review');
const ul = document.querySelector('ul');
const button = document.querySelector('#reset-reviews');

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
        createOpt.value = name;
        select.append(createOpt);
      }
    })
    .catch((err) => console.log(err));

  //! select add event listener

  select.addEventListener('change', (e) => {
    e.preventDefault();
    const callBack = fetchCall.find((e) => e.title === `${select.value}`);
    // console.log(callBack);

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

    const name = `${select.value}`;
    console.log(name);
    const myReview = `${review.value}`;
    console.log(myReview);
    const li = document.createElement('li');
    li.innerHTML = `<strong><b>${select.value}:</strong></b> ${myReview}`;
    // console.log;
    ul.append(li);

    //! Select a movie error message

    function movie() {
      alert(`Please select a Movie`);
    }

    function error() {
      alert(`review field cannot be empty`);
    }

    if (!myReview) {
      review.addEventListener('input', (e) => {
        e.preventDefault();
        error();
      });
    }
    if (!name) {
      select.addEventListener('input', () => {
        movie();
      });
      return;
    }

    form.reset();
  });
  button.addEventListener('click', () => {
    ul.innerHTML = '';
  });
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
