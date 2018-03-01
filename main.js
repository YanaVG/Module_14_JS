// Создать две кнопки в TML: start и stop.
// Реализовать функционал таймера отсчета старта печати через функцию-конструктор со свойсвами startTime, stopTime и interval. Добавить в prototype методы start и stop.
// При нажатии на кнопку start, функция сохраняет момент нажатия в свойство startTime.
// При нажатии на кнопку stop, функция сохраняет значение текущего момента времени в stopTime и записывает разницу между startTime и stopTime в interval.
// При нажатии на stop, значение interval выводится в консоль.
// const timer = document.querySelector("#timer");
// const start = document.querySelector("#start");
// const stop = document.querySelector("#stop");
const clockface = document.querySelector(".clock__time");
const startBtn = document.querySelector("#start");
const controls = document.querySelector(".lang-ctrls__body");
const buttons = Array.from(document.querySelectorAll(".lang-ctrls__btn"));
const stopBtn = document.querySelector("#stop");

function Timer() {
  this.startTime = 0,
  this.stopTime = 0,
  this.Interval = 0
};

Timer.prototype.start = function() {
  this.Interval = 0;
  updateClockface(this.Interval);
  this.startTime = new Date();
};

Timer.prototype.stop = function() {
  this.stopTime = new Date();
  this.Interval = this.stopTime - this.startTime;
  updateClockface(this.Interval);

  console.log(`Пройшло ${this.Interval} ms`)
};

const timer = new Timer();

function startTimer(){
  if(!startBtn.classList.contains("lang-ctrls__btn--active")){
    timer.start();
  }
}
function stopTimer(){
  if(!startBtn.classList.contains("lang-ctrls__btn--active")){
    timer.stop();
  }
}

controls.addEventListener('click', setActiveBtn);
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

function setActiveBtn(e){
  Array.from(buttons, elem => elem.classList.remove("lang-ctrls__btn--active"));
  let elem = e.target;
  if(e.target.classList.contains("material-icons")){
   elem =  elem.parentNode;
  }
  if(!elem.classList.contains("lang-ctrls__btn")){
    return false;
  }
  elem.classList.add("lang-ctrls__btn--active");
  }

function getFormattedTime(time) {
  const date = new Date(time);
  const mt =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  const sc =
    date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
  const ms =
    date.getMilliseconds() < 10
      ? "00" + date.getMilliseconds()
      : date.getMilliseconds() < 100
        ? "0" + date.getMilliseconds()
        : date.getMilliseconds();

  return `${mt}:${sc}:${ms}`;
}

  function updateClockface(time) {
  clockface.textContent = getFormattedTime(time);
}



/*
* Вспомогательные функции
* setActiveBtn - Подсветка активной кнопки
* getFormattedTime - возвращает форматированое время
* updateClockface - обновляет поле счетчика новым значением при вызове
*/