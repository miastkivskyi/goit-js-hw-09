import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const formIndicators = { delay: 0, step: 0, amount: 0 };

form.addEventListener('input', onInputNumber);
form.addEventListener('submit', onFormSubmit);

function onInputNumber(e) {
  formIndicators[e.target.name] = Number(e.target.value);
}

function onFormSubmit(ev) {
  ev.preventDefault();
  for (let i = 1; i <= formIndicators.amount; i += 1) {
    createPromise(i, formIndicators.delay)
      .then(succes => Notiflix.Notify.success(succes))
      .catch(error => Notiflix.Notify.failure(error));

    formIndicators.delay += formIndicators.step;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
