const state = {};
const carouselList = document.querySelector('.carousel__list');
const carouselItems = document.querySelectorAll('.carousel__item');
const carouselLeftButton = document.querySelector('.carousel__left-button');
const carouselRightButton = document.querySelector('.carousel__right-button');
const elems = Array.from(carouselItems);

carouselList.addEventListener('click', function (event) {
  var newActive = event.target;
  var isItem = newActive.closest('.carousel__item');

  if (!isItem || newActive.classList.contains('carousel__item_active')) {
    return;
  };
  
  update(newActive);
});

const update = function(newActive) {
  const newActivePos = newActive.dataset.pos;

  const current = elems.find((elem) => elem.dataset.pos == 0);
  const prev = elems.find((elem) => elem.dataset.pos == -1);
  const next = elems.find((elem) => elem.dataset.pos == 1);
  const first = elems.find((elem) => elem.dataset.pos == -2);
  const last = elems.find((elem) => elem.dataset.pos == 2);
  
  current.classList.remove('carousel__item_active');
  
  [current, prev, next, first, last].forEach(item => {
    var itemPos = item.dataset.pos;

    item.dataset.pos = getPos(itemPos, newActivePos)
  });
};

const getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) > 2) {
    return -current
  }

  return diff;
}

carouselLeftButton.addEventListener('click', ()=>{
    const newActive = document.querySelector('[data-pos="-1"]')
    update(newActive)
})

carouselRightButton.addEventListener('click', ()=>{
    const newActive = document.querySelector('[data-pos="1"]')
    update(newActive)
})


// TIMER
const timerDigits = document.querySelectorAll('.timer__digits');
const minutesElement = timerDigits[0];
const secondsElement = timerDigits[1];

// Устанавливаем начальное время таймера (4 минуты 28 секунд)
let minutes = 4;
let seconds = 28;

// Функция для обновления значений таймера на странице
function updateTimer() {
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Функция для запуска и обновления таймера
function startTimer() {
    updateTimer(); // Обновляем значения таймера при запуске
    const timerInterval = setInterval(function() {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                // Если время вышло, сбрасываем минуты и секунды к начальным значениям
                minutes = 4;
                seconds = 28;
            }
        }
        updateTimer(); // Обновляем значения таймера после уменьшения времени
    }, 1000); // Обновляем таймер каждую секунду

    return timerInterval; // Возвращаем интервал, чтобы можно было его остановить позже
}

window.onload = function() {
    let timerInterval = startTimer(); 
};

// DATES
const months = [
  'січня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
]
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const day = tomorrow.getDate(); 
const month = tomorrow.getMonth() + 1; 
const formattedDay = day < 10 ? '0' + day : day.toString();
const formattedMonth = month < 10 ? '0' + month : month.toString();
const tomorrowDate = formattedDay + ' ' + months[parseInt(formattedMonth)];

document.querySelector('.header__secondary-title span').innerHTML = tomorrowDate;
document.querySelector('.footer__title span').innerHTML = "#" + tomorrowDate;

//FORM

const showForm = (event) => {
  event.preventDefault()
  document.querySelector('.overlay').style.display = 'block';
}

const closeForm = (event) => {
  event.preventDefault()
  document.querySelector('.overlay').style.display = 'none';
}


document.querySelector('.header__participate-button').addEventListener('click', (event)=>showForm(event))
document.querySelector('.get-to-masterclass-button').addEventListener('click', (event)=>showForm(event))
document.querySelector('.footer__button').addEventListener('click', (event)=>showForm(event))
document.querySelector('.close-icon').addEventListener('click', (event)=>closeForm(event))

const form = document.querySelector('#form');
form.addEventListener('submit', (event)=>{
  event.preventDefault();
  window.location.href = "./after-registration.html"
})
