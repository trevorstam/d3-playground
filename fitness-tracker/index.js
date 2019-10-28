//DOM elements
const btns = document.querySelectorAll('button');
const form = document.querySelector('form');
const formActive = document.querySelector('form span');
const input = document.querySelector('input');
const error = document.querySelector('.error');

var activity = 'cycling';

btns.forEach(btn =>{
  btn.addEventListener('click', event =>{
    //get activity
    activity = event.target.dataset.activity;
    //remove and add active class
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    //set id of input
    input.setAttribute('id', activity);
    //set text of form span
    formActive.textContent = activity;
  })
})