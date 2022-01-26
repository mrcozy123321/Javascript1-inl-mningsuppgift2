const form = document.querySelector('#form');
const input = document.querySelector('#todoInput');
const cardCheck = document.querySelector('.item-check');
const addBtn = document.querySelector('#btn-add');
const output = document.querySelector('#output');
const counter = document.querySelector('#list-counter');
const invalidInput = document.querySelector('.invalid-input')


let todos = [];

const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const data = await res.json();
  todos = data;

  listTodos();
}

fetchTodos();

const listTodos = () => {
  output.innerHTML = ''

  todos.forEach(todo => {
    counter.innerText = todos.length + '/10';
    output.appendChild(createTodoElement(todo));
  })
}

const createTodoElement = todo => {

  let card = document.createElement('div');
  card.classList.add('item-card');

  let title = document.createElement('h2');
  title.innerText = todo.title;

  let checkContainer = document.createElement('div');
  checkContainer.classList.add('check-container');

  let checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('item-check');

  let button = document.createElement('button');
  button.classList.add('btn', 'btn-primary', 'btn-list');
  button.innerText = 'Remove';

  card.appendChild(title);
  card.appendChild(checkContainer);
  checkContainer.appendChild(checkbox);
  checkContainer.appendChild(button);


  checkbox.addEventListener('click', () => {
    if(checkbox.checked === true) {
      card.classList.add('item-card-finished');
      button.classList.add('checkbox-checked');
    }
    else {
      card.classList.remove('item-card-finished');
      button.classList.remove('checkbox-checked');
    }
  })

  button.addEventListener('click', () => removeTodo(todo.id, card))
  return card;
}

function removeTodo(id, todo) {
  todos = todos.filter(todo => todo.id !== id)
  todo.remove()
  counter.innerText = todos.length + '/10';
  console.log(todos);
}

const createNewTodo = title => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      id: Date.now().toString(),
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    todos.unshift(data);
    output.prepend(createTodoElement(data));
    counter.innerText = todos.length + '/10';
  })
}

const validateInput = () => {
  if(input.value === '') {
    addTodoTitle.classList.add()
  }
}


form.addEventListener('submit', e => {
  e.preventDefault();
  if(input.value.trim() === '') {
    invalidInput.classList.add('is-invalid');
    invalidInput.innerText = 'You have to enter a title';

  }
  else if(input.value.trim() !== '' && todos.length === 10) {
    invalidInput.classList.add('is-invalid');
    invalidInput.innerText = 'Remove a todo first';
  }
  else {
    createNewTodo(input.value);
    input.value = '';
    input.focus();
    invalidInput.classList.remove('is-invalid');
  }
})