import '../../assets/css/main.css';

const CALENDAR_HEADER_DATE = document.querySelector('h2.header__date');
const CALENDAR_BODY = document.querySelector('ul.day__group');
const NEXT_MONTH_BUTTON = document.querySelector('button#next-month');
const LAST_MONTH_BUTTON = document.querySelector('button#last-month');

let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentMonthSize = new Date(currentYear, currentMonth + 1, 0).getDate();
let currentMonthStartOffset = new Date(currentYear, currentMonth).getDay();
let currentMonthEndOffset = currentMonthStartOffset + currentMonthSize;
let lastMonthSize = new Date(currentYear, currentMonth, 0).getDate();

const CALENDAR_SIZE = 42;
const TODAY = new Date();

const MONTHS = [
   'Janeiro',
   'Fevereiro',
   'Março',
   'Abril',
   'Maio',
   'Junho',
   'Julho',
   'Agosto',
   'Setembro',
   'Outubro',
   'Novembro',
   'Dezembro'
]

const updateCalendar = (year, month) => {
   currentDate = new Date(year, month);
   currentDay = currentDate.getDate();
   currentYear = currentDate.getFullYear();
   currentMonth = currentDate.getMonth();
   currentMonthSize = new Date(currentYear, currentMonth + 1, 0).getDate();
   currentMonthStartOffset = new Date(currentYear, currentMonth).getDay();
   currentMonthEndOffset = currentMonthStartOffset + currentMonthSize;
   lastMonthSize = new Date(currentYear, currentMonth, 0).getDate();

   renderCalendar();
}

const clearCalendar = () => {
   CALENDAR_BODY.innerHTML = null;
}

const renderCalendar = () => {

   clearCalendar();

   for (let index = lastMonthSize - (currentMonthStartOffset - 1); index <= lastMonthSize; index++) {
      let dayElement = createDayElement(index, false, false);
      CALENDAR_BODY.appendChild(dayElement);
   }

   for (let index = 1; index <= currentMonthSize; index++) {
      let dayElement = createDayElement(index, isCurrentDate(currentYear, currentMonth, index), true);
      CALENDAR_BODY.appendChild(dayElement);
   }

   for (let index = 1; index <= (CALENDAR_SIZE - currentMonthEndOffset); index++) {
      let dayElement = createDayElement(index, false, false);
      CALENDAR_BODY.appendChild(dayElement);
   }

   CALENDAR_HEADER_DATE.innerText = `${MONTHS[currentMonth]} ${currentYear}`;
}

const isCurrentDate = (year, month, day) => {
   if (TODAY.getFullYear() === year && TODAY.getMonth() === month && TODAY.getDate() === day) {
      return true;
   }

   return false;
}

const createDayElement = (dayNumber, isCurrentDate, isCurrentMonth) => {
   let dayElement = document.createElement('li');
   dayElement.classList.add('day__item');

   if (isCurrentDate) {
      dayElement.classList.add('day__item--today');
   }

   if (!isCurrentMonth) {
      dayElement.classList.add('day__item--inactive');
   }

   let dayElementText = document.createElement('span');
   dayElementText.innerText = dayNumber;

   dayElement.appendChild(dayElementText);

   return dayElement;
}

const handleLastMonthButtonClick = (e) => {
   if (currentMonth > 0) {
      updateCalendar(currentYear, currentMonth - 1)
   } else {
      updateCalendar(currentYear - 1, 11);
   }
}

const handleNextMonthButtonClick = (e) => {
   if (currentMonth < 11) {
      updateCalendar(currentYear, currentMonth + 1);
   } else {
      updateCalendar(currentYear + 1, 0);
   }
}

const start = () => {
   renderCalendar();
}

start();

NEXT_MONTH_BUTTON.addEventListener('click', handleNextMonthButtonClick)
LAST_MONTH_BUTTON.addEventListener('click', handleLastMonthButtonClick)