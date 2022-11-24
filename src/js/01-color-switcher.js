const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

const change = {
  timerId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.timerId = setInterval(() => {
      document.body.style.background = getRandomHexColor();
      console.log('Зміна кольору активована');
    }, 1000);
  },
  stop() {
    clearInterval(this.timerId);
    this.isActive = false;
    console.log('Зупинено зміну кольору');
  },
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  change.start();
});

stopButton.addEventListener('click', () => {
  change.stop();
});
