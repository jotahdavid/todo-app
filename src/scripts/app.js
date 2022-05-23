import TodoItem from './components/TodoItem.js';

const todoList = [
  {
    details: 'Do coding challenges',
    completed: false
  },
  {
    details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos alias soluta optio nulla officia corporis inventore esse expedita in rem saepe quis laborum ex similique unde, aliquam vero quae corrupti',
    completed: true
  }
];

const $todoForm = document.querySelector('.todo-form');
$todoForm.addEventListener('submit', handleTodoSubmit);

function handleTodoSubmit(event) {
  event.preventDefault();

  const newTodo = new FormData(this).get('todo-details');
  if (!newTodo) return;

  todoList.push({
    details: newTodo,
    completed: false
  });
  $todoForm.reset();

  renderTodoList(todoList);
}

function renderTodoList(todoList) {
  const $todoList = document.querySelector('.todo-list');
  $todoList.textContent = null;

  const $fragment = document.createDocumentFragment();
  $fragment.append(
    ...todoList.map(todo => TodoItem(todo))
  );

  $todoList.appendChild($fragment);
}

renderTodoList(todoList);
