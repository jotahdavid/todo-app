import createElement from '../utils/createElement.js';

export default function ButtonDelete({ title, handleClick }) {
  return createElement('button', { className: 'button-delete', onClick: handleClick },
    createElement('i', { className: 'button-delete__icon fa-solid fa-trash-can' }),
    title
  );
}
