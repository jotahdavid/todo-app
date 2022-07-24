const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let theme = localStorage.getItem('THEME') ?? prefersColorScheme;

const $toggleTheme = document.querySelector('.toggle-theme');

function handleChangeTheme() {
  theme = theme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('THEME', theme);
}

export function initializeToggleTheme() {
  document.body.setAttribute('data-theme', theme);
  $toggleTheme.addEventListener('click', handleChangeTheme);
}
