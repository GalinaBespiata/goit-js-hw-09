import { Notify } from 'notiflix/build/notiflix-notify-aio';
let firstDelay = 0;
let step = 0;
let amount = 0;

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  firstDelay = Number(event.currentTarget.elements.delay.value);
  step = Number(event.currentTarget.elements.step.value);
  amount = Number(event.currentTarget.elements.amount.value);

  for (
    let position = 1, delay = firstDelay;
    position <= amount;
    position += 1, delay += step
  ) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Rejected promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
