// Select main DOM elements
let box = document.querySelector(".box");
let visor = document.querySelector(".screen");
let clock = document.getElementById("clock") // could be used in future

// Clock buttons
let btnAlarm = document.getElementById("alarmButton");
let btnHour = document.getElementById("hourButton");
let btnMin = document.getElementById("minButton");
let btnClear = document.getElementById("clearButton");

// Theme change button
let change = document.getElementById("change");

// Time display
const timer = document.getElementById("time");

// Add click event listeners to buttons
btnAlarm.addEventListener("click", () => {
  playClickSound();
  alarmActive();
});

btnHour.addEventListener("click", () => {
  playClickSound();
  addHour();
});

btnMin.addEventListener("click", () => {
  playClickSound();
  addMin();
});

btnClear.addEventListener("click", () => {
  playClickSound();
  clear();
});

// Plays a simple click sound
function playClickSound() {
  const clickSound = new Audio("assets/sounds/clickSound.mp3");
  clickSound.play();
}

// Plays the alarm sound
function playAlarmSound() {
  const alarmSound = new Audio("assets/sounds/alarmSound.mp3");
  alarmSound.play();
}

// Initialize alarm time
let initialTimeMin = 0;
let initialTimeHour = 0;

// Increases minute by 1 (up to 59)
function addMin() {
  if (initialTimeMin < 59) {
    initialTimeMin++;
  }

  // Format and display time
  const formattedMin = String(initialTimeMin).padStart(2, "0");
  const formattedHour = String(initialTimeHour).padStart(2, "0");
  timer.innerHTML = `${formattedHour}:${formattedMin}`;
}

// Increases hour by 1 (up to 23)
function addHour() {
  if (initialTimeHour < 23) {
    initialTimeHour++;
  }

  // Format and display time
  const formattedMin = String(initialTimeMin).padStart(2, "0");
  const formattedHour = String(initialTimeHour).padStart(2, "0");
  timer.innerHTML = `${formattedHour}:${formattedMin}`;
}

let timeoutId; // Store the timeout so we can clear it later

// Clears the timer and resets values
function clear() {
  timer.innerHTML = "00:00";
  clearTimeout(timeoutId);
  timer.style.color = "#BBBBBB";
  initialTimeHour = 0;
  initialTimeMin = 0;
}

// Activates the countdown
function alarmActive() {
  timer.style.color = "#00E676"; // Green to indicate countdown

  function tick() {
    if (initialTimeMin > 0 || initialTimeHour > 0) {
      timeoutId = setTimeout(() => {
        initialTimeMin--;
        if (initialTimeMin < 0) {
          initialTimeMin = 59;
          initialTimeHour--;
        }
        // Update display
        timer.innerHTML = `${String(initialTimeHour).padStart(2, "0")}:${String(
          initialTimeMin
        ).padStart(2, "0")}`;
        tick(); // Continue countdown
      }, 60000); // 1 minute
    } else {
      playAlarmSound(); // Play alarm when time is up
      timer.innerHTML = "00:00";
      clearTimeout(timeoutId);
      timer.style.color = "#EF5350"; // Red color
      initialTimeHour = 0;
      initialTimeMin = 0;
    }
  }
  tick();
}

// Theme toggle control
let isMoon = true;

change.addEventListener('click', () => {
  if (isMoon) {
    // Switch to dark mode
    change.innerHTML = "<i class='fa fa-sun'></i>";
    change.style.color = "#00E676";
    document.body.style.backgroundColor = "#121212";
    box.classList.add("boxDark");
    visor.classList.add("screenDark");
    btnAlarm.classList.add("btnAlarmDark");
    btnClear.classList.add("btnClearDark");
    btnHour.classList.add("btnHourDark");
    btnMin.classList.add("btnMinDark");
  } else {
    // Switch to light mode
    change.innerHTML = "<i class='fa fa-moon'></i>";
    change.style.color = "#F50057";
    document.body.style.backgroundColor = "#FFF8E1";
    box.classList.remove("boxDark");
    box.classList.add("box");
    visor.classList.remove("screenDark");
    visor.classList.add("screen");
    btnAlarm.classList.remove("btnAlarmDark");
    btnAlarm.classList.add("btnAlarm");
    btnClear.classList.remove("btnClearDark");
    btnClear.classList.add("btnClear");
    btnHour.classList.remove("btnHourDark");
    btnHour.classList.add("btnHour");
    btnMin.classList.remove("btnMinDark");
    btnMin.classList.add("btnMin");
  }

  isMoon = !isMoon; // Toggle state
});
























// Some music personalization in the future