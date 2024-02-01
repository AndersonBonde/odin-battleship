import './style.css';

const playerTds = document.querySelectorAll('.playerBoard td[data-column]');
const computerTds = document.querySelectorAll('.computerBoard td[data-column]');

computerTds.forEach((el) => {
  el.addEventListener('click', () => {
    const parent = el.parentNode;
    const message = `Column: ${el.dataset.column}, Row: ${parent.dataset.row}`;
    console.log(message);
  });
});
