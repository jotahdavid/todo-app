import TodoItem from './components/TodoItem.js';
import LocalStorageHelper from './utils/LocalStorageHelper.js';

const todoListStorage = new LocalStorageHelper('TODO_LIST');
const todoList = todoListStorage.getAll() ?? [];

const $todoForm = document.querySelector('.todo-form');
const $statusList = document.querySelectorAll('.status-list__item');

$todoForm.addEventListener('submit', handleTodoSubmit);
$statusList.forEach($status => {
  $status.addEventListener('click', handleStatusClick);
});

function handleTodoSubmit(event) {
  event.preventDefault();

  const newTodo = new FormData(this).get('todo-details');
  if (!newTodo) return;

  todoList.push({
    details: newTodo,
    completed: false
  });
  todoListStorage.save(todoList);

  $todoForm.reset();

  renderTodoList(todoList);
}

function handleStatusClick(event) {
  event.preventDefault();

  if (this.classList.contains('--active')) return;

  $statusList.forEach($status => {
    if ($status === this) {
      this.classList.add('--active');
      return;
    }
    $status.classList.remove('--active');
  });
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

window.addEventListener('load', () => {
  renderTodoList(todoList);
});
