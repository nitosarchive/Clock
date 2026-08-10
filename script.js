const clock = document.getElementById("time");
const format = document.getElementById("format-switch");
const day = document.getElementById("date");
const switchBtn = document.getElementById("switch");
const analogContainer = document.querySelector(".analog-container");
const digitalContainer = document.querySelector(".digital-container");

switchBtn.addEventListener("click", () => {
  if (switchBtn.textContent === "Analog") {
    analogContainer.classList.remove("hidden");
    digitalContainer.classList.add("hidden");
    switchBtn.textContent = "Digital";
  } else if (switchBtn.textContent === "Digital") {
    analogContainer.classList.add("hidden");
    digitalContainer.classList.remove("hidden");
    switchBtn.textContent = "Analog";
  }
  return;
});

const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();

let fetchCivil = true;

let fetchMilitary = false;

let miitary;

let civil = true;

function currentTimeCivil() {
  if (!fetchCivil) return;

  civil = setInterval(() => {
    date = new Date();
    dateString = date.toLocaleTimeString();
    clock.textContent = dateString;
  }, 100);
}

function currentTimeMilitary() {
  if (!fetchMilitary) return;

  military = setInterval(() => {
    date = new Date();

    let ampm;

    if (date.getHours() >= 12) {
      ampm = "PM";
    } else {
      ampm = "AM";
    }

    dateTimeMilitary =
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      " " +
      ampm;
    clock.textContent = dateTimeMilitary;
  }, 100);
}

function switchTime() {
  if (fetchCivil) {
    fetchCivil = false;
    fetchMilitary = true;
    clearInterval(civil);
    currentTimeMilitary();
    format.innerText = "12HR";
  } else if (fetchMilitary) {
    fetchMilitary = false;
    fetchCivil = true;
    clearInterval(military);
    currentTimeCivil();
    format.innerText = "24HR";
  }
}

function fetchDay() {
  setInterval(() => {
    day.textContent =
      dayList[date.getDay()] +
      ", " +
      months[date.getMonth()] +
      " " +
      date.getDate();
  }, 1000);
}

format.addEventListener("click", switchTime);

currentTimeCivil();
fetchDay();

const secondHand = document.querySelector("#second-hand");
const secondDeg = new Date().getSeconds() * (360 / 60);
let secondRotation = secondDeg;
secondHand.style.rotate = `${secondRotation}deg`;

const minuteHand = document.querySelector("#minute-hand");
const minutedDeg = new Date().getMinutes() * (360 / 60);
let minuteRotation = minutedDeg;
minuteHand.style.rotate = `${minuteRotation}deg`;
const minDec = new Date().getMinutes() / 60;
const hourHand = document.querySelector("#hour-hand");
const hourDeg = 360 * ((new Date().getHours() + minDec) / 12);

let hourRotation = hourDeg;
hourHand.style.rotate = `${hourRotation}deg`;
setInterval(() => {
  secondRotation = secondRotation + 6;
  minuteRotation = minuteRotation + 360 / 3600;
  hourRotation = hourRotation + 30 / 3600;
  hourHand.style.rotate = `${hourRotation}deg`;
  secondHand.style.rotate = `${secondRotation}deg`;
  minuteHand.style.rotate = `${minuteRotation}deg`;

  secondRotation === 360 ? (secondRotation = 0) : null;
  minuteRotation === 360 ? (minuteRotation = 0) : null;
  hourRotation === 720 ? (hourRotation = 0) : null;
}, 1000);
