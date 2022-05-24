import createElement from '../utils/createElement.js';

export default function TodoItem({ id, details, completed, handleCheckboxClick }) {
  return createElement('li', { className: 'todo-list__item', 'data-id': id },
    createElement('span', { className: 'todo-list__checkbox-container' },
      createElement('input', {
        className: 'todo-list__checkbox',
        type: 'checkbox',
        name: 'todo-checkbox',
        checked: completed,
        onClick: handleCheckboxClick
      }),
    ),
    createElement('p', { className: 'todo-list__details' }, details),
  );
}
