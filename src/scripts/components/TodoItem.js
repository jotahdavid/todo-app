import createElement from '../utils/createElement.js';

export default function TodoItem({ details, completed }) {
  return createElement('li', { className: 'todo-list__item' },
    createElement('span', { className: 'todo-list__checkbox-container' },
      createElement('input', {
        className: 'todo-list__checkbox',
        type: 'checkbox',
        name: 'todo-checkbox',
        checked: completed
      }),
    ),
    createElement('p', { className: 'todo-list__details' }, details),
  );
}
