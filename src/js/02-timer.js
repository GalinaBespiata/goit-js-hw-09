import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('button[data-start]');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');
const clock = document.querySelector('.timer');
const delimiters = document.querySelectorAll('.label');

clock.style.display = 'flex';
clock.style.fontSize = '35px';
clock.style.fontWeight = '700';
clock.style.color = '#017e37';
clock.style.marginTop = '10px';

for (const delimiter of delimiters) {
  delimiter.textContent = ':';
}
clock.lastElementChild.lastElementChild.innerHTML = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    btnStart.removeAttribute('disabled');
    choosenDate = selectedDates[0];

    if (choosenDate <= Date.now()) {
      btnStart.setAttribute('disabled', true);

      alert('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);
let choosenDate = null;
btnStart.setAttribute('disabled', true);

btnStart.addEventListener('click', onBtnStart);

const timer = {
  timerId: null,
start() {
    this.timerId = setInterval(() => {
      const deltaTime = choosenDate.getTime() - Date.now();

      if (deltaTime <= 0) {
        this.stop();
        return;
      }
      
      const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
      //  console.log(days)
      day.textContent = this.pad(days);
      hour.textContent = this.pad(hours);
      minute.textContent = this.pad(minutes);
      second.textContent = this.pad(seconds);
    }, 1000);
  },
  stop() {
    clearInterval(this.timerId);
  },
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },
  pad(value) {
    return String(value).padStart(2, '0');
  },
};

function onBtnStart(evt) {
  timer.start();
}
