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

function renderTodoList(todoList) {
  const $todoList = document.querySelector('.todo-list');
  const $fragment = document.createDocumentFragment();

  $fragment.append(
    ...todoList.map(todo => TodoItem(todo))
  );

  $todoList.appendChild($fragment);
}

renderTodoList(todoList);
