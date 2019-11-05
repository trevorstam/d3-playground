const modal = document.querySelector('.modal');
M.Modal.init(modal); //this is syntax from Materialize library

const form = document.querySelector('form');
const name = document.querySelector('#name');
const parent = document.querySelector('#parent');
const department = document.querySelector('#department');

form.addEventListener('submit', event =>{
  event.preventDefault();
  db.collection('employees').add({
    name: name.value,
    parent: parent.value,
    department: department.value
  });
  //close modal
  var instance = M.Modal.getInstance(modal);
  instance.close();

  form.reset();

})