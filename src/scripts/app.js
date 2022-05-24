import TodoItem from './components/TodoItem.js';
import LocalStorageHelper from './utils/LocalStorageHelper.js';

const todoListStorage = new LocalStorageHelper('TODO_LIST');
let todoList = todoListStorage.getAll() ?? [];

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
    id: Math.floor(new Date().getTime() * Math.random()),
    details: newTodo,
    completed: getCurrentStatus() === 'completed'
  });
  todoListStorage.save(todoList);

  $todoForm.reset();

  renderTodoList(
    filterTodoListByStatus(getCurrentStatus())
  );
}

function handleStatusClick(event) {
  event.preventDefault();

  if (this.classList.contains('--active')) return;

  $statusList.forEach($status => {
    $status.classList.remove('--active');
  });
  this.classList.add('--active');

  renderTodoList(
    filterTodoListByStatus(getCurrentStatus())
  );
}

function getCurrentStatus() {
  const $statusActive = Array.from($statusList)
    .find($status => $status.classList.contains('--active'));

  return $statusActive.getAttribute('data-status');
}

function filterTodoListByStatus(status) {
  if (status === 'pending') {
    return todoList.filter(todo => todo.completed === false);
  }
  if (status === 'completed') {
    return todoList.filter(todo => todo.completed === true);
  }
  return todoList;
}

function renderTodoList(todoListToRender) {
  const $todoList = document.querySelector('.todo-list');
  $todoList.textContent = null;

  const $fragment = document.createDocumentFragment();
  $fragment.append(
    ...todoListToRender.map(todo => TodoItem({
      id: todo.id,
      details: todo.details,
      completed: todo.completed,
      handleCheckboxClick: function() {
        const id = Number(this.closest('.todo-list__item').getAttribute('data-id'));

        const todoToUpdate = todoListStorage.getById(id);
        if (!todoToUpdate) return;
        todoToUpdate.completed = this.checked;

        todoListStorage.update(id, todoToUpdate);
        todoList = todoListStorage.getAll();
      }
    }))
  );

  $todoList.appendChild($fragment);
}

window.addEventListener('load', () => {
  renderTodoList(todoList);
});
