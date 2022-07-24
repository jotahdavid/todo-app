import { initializeToggleTheme } from './toggleTheme.js';

import TodoItem from './components/TodoItem.js';
import ButtonDelete from './components/ButtonDelete.js';

import LocalStorageHelper from './utils/LocalStorageHelper.js';
import randomId from './utils/randomId.js';

const todoListStorage = new LocalStorageHelper('TODO_LIST');
let todoList = todoListStorage.getAll() ?? [];

const $todoForm = document.querySelector('.todo-form');
const $statusList = document.querySelectorAll('.status-list__item');

$todoForm.addEventListener('submit', handleTodoSubmit);
$todoForm.addEventListener('input', handleInputTyping);
$statusList.forEach($status => {
  $status.addEventListener('click', handleStatusClick);
});

function handleTodoSubmit(event) {
  event.preventDefault();

  const todoDetails = new FormData(this).get('todo-details');
  if (!todoDetails.trim()) return;

  todoList.push({
    id: randomId(),
    details: todoDetails,
    completed: getCurrentStatus() === 'completed'
  });
  todoListStorage.save(todoList);

  $todoForm.querySelector('input').focus();
  $todoForm.reset();
  handleInputTyping.call(this);

  renderTodoList(
    filterTodoListByStatus(getCurrentStatus())
  );
}

function handleInputTyping() {
  const todoDetails = new FormData(this).get('todo-details');
  const $btnSubmit = this.querySelector('button[type="submit"]');

  if (!todoDetails.trim()) {
    $btnSubmit.disabled = true;
    return;
  }

  $btnSubmit.disabled = false;
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

        renderTodoList(
          filterTodoListByStatus(getCurrentStatus())
        );
      },
      handleDeleteIconClick: function() {
        const id = Number(this.closest('.todo-list__item').getAttribute('data-id'));

        todoListStorage.delete(id);
        todoList = todoListStorage.getAll();

        renderTodoList(
          filterTodoListByStatus(getCurrentStatus())
        );
      }
    }))
  );

  $todoList.appendChild($fragment);

  if (getCurrentStatus() !== 'completed' || $todoList.childElementCount === 0) return;
  $todoList.appendChild(
    ButtonDelete({
      title: 'Delete all',
      handleClick: function() {
        todoListStorage.deleteAllMatch(item => item.completed === true);
        todoList = todoListStorage.getAll();

        renderTodoList(
          filterTodoListByStatus(getCurrentStatus())
        );
      }
    })
  );
}

window.addEventListener('load', () => {
  renderTodoList(todoList);
  initializeToggleTheme();
});
