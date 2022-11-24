// Описаний в документації
import flatpickr from 'flatpickr';
require('flatpickr/dist/themes/confetti.css');
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const myInput = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const elements = document.querySelectorAll('.value');
let TodayDate = new Date().getTime();
let clockFace = 0;
let selectedTime = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    if (selectedTime < TodayDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
      return selectedTime;
    }
    console.log(selectedDates[0]);
  },
};
startButton.disabled = true;

startButton.addEventListener('click', onStartTimerBtnClick);

function onStartTimerBtnClick() {
  startButton.disabled = true;
  timerId = setInterval(() => {
    if (clockFace < 0) {
      console.log('Час вийшов');
      clearInterval(timerId);
      return;
    }
    clock();
  }, 1000);
}

function clock() {
  TodayDate = new Date().getTime();
  clockFace = selectedTime - TodayDate;
  if (clockFace < 0) {
    return clockFace;
  }
  const timmerArray = Object.values(convertMs(clockFace));
  console.log(timmerArray);

  for (let i = 0; i < 4; i += 1) {
    elements[i].textContent = addLeadingZero(timmerArray)[i];
  }
}
flatpickr(myInput, options);

function convertMs(ms) {
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
}

function addLeadingZero(array) {
  return array.map(value =>
    value.toString().length < 2 ? value.toString().padStart(2, '0') : value
  );
}
