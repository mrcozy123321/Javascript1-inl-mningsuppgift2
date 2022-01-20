const form = document.querySelector('#form');
const addTodoTitle = document.querySelector('#addTodo-title');
const addTodoText = document.querySelector('#addTodo-body');
const cardCheck = document.querySelector('#item-check');
const removeBtn = document.querySelector('#btn-remove');
const addBtn = document.querySelector('#btn-add');
const output = document.querySelector('#item-container');
const counter = document.querySelector('list-counter');

let todos = [];

const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();
  todos = data;

  listTodos();
}

fetchTodos();

const listTodos = () => {
  output.innerHTML = ''
  todos.forEach(todo => {
    output.appendChild(createTodoElement(todo));
  })
}

const createTodoElement = todo => {
  output.innerHTML += `
  <div id="${todo.id}" class="item-card">
    <div>
      <h2>${todo.title}</h2>
      <p>${todo.body}</p>
    </div>
    <div class="check-container">
      <input type="checkbox" id="item-check">
      <button class="btn btn-primary btn-list" id="btn-remove">Remove</button>
    </div>
  </div>
  `
}

function removeTodo(id, todo) {
  todos = todos.filter(todo => todo.id !== id)
  todo.remove()
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
      body,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    todos.unshift(data);
    output.prepend(createTodoElement(data));
  })
}

form.addEventListener('submit', e => {
  e.preventDefault();
  validateInput();
})