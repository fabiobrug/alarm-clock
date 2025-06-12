let box = document.querySelector(".box")
let visor = document.querySelector(".screen")

// Clock buttons
let btnAlarm = document.getElementById("alarmButton");
let btnHour = document.getElementById("hourButton");
let btnMin = document.getElementById("minButton");
let btnClear = document.getElementById("clearButton");

// Change mode
let change = document.getElementById("change")

// Screen
const timer = document.getElementById("time");

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

function playClickSound() {
  const clickSound = new Audio("assets/sounds/clickSound.mp3");
  clickSound.play();
}

function playAlarmSound() {
  const alarmSound = new Audio("assets/sounds/alarmSound.mp3")
  alarmSound.play();
}

let initialTimeMin = 0;
let initialTimeHour = 0;

function addMin() {
  if (initialTimeMin < 59) {
    initialTimeMin++;
  }

  // Formata com dois dígitos
  const formattedMin = String(initialTimeMin).padStart(2, "0");
  const formattedHour = String(initialTimeHour).padStart(2, "0");

  timer.innerHTML = `${formattedHour}:${formattedMin}`;
}

function addHour() {
  if (initialTimeHour < 23) {
    initialTimeHour++;
  }

  // Formata com dois dígitos
  const formattedMin = String(initialTimeMin).padStart(2, "0");
  const formattedHour = String(initialTimeHour).padStart(2, "0");

  timer.innerHTML = `${formattedHour}:${formattedMin}`;
}

let timeoutId;

function clear() {
  timer.innerHTML = "00:00";
  clearTimeout(timeoutId);
  timer.style.color = " #BBBBBB";
  initialTimeHour = 0;
  initialTimeMin = 0;
}

function alarmActive() {
  timer.style.color = " #00E676";

  function tick() {
    if (initialTimeMin > 0 || initialTimeHour > 0) {
      timeoutId = setTimeout(() => {
        initialTimeMin--;
        if (initialTimeMin < 0) {
          initialTimeMin = 59;
          initialTimeHour--;
        }
        timer.innerHTML = `${String(initialTimeHour).padStart(2, "0")}:${String(
          initialTimeMin
        ).padStart(2, "0")}`;
        tick();
      }, 60000);
    } else {
        playAlarmSound()
      timer.innerHTML = "00:00";
      clearTimeout(timeoutId);
      timer.style.color = " #EF5350";
      initialTimeHour = 0;
      initialTimeMin = 0;
    }
  }
  tick();
}

let isMoon = true;

change.addEventListener('click', () =>{
    
    if(isMoon){
        change.innerHTML = "<i class='fa fa-sun'></i>"
        change.style.color = " #00E676"
        document.body.style.backgroundColor = " #121212"
        box.classList.add("boxDark")
        visor.classList.add("screenDark")
        btnAlarm.classList.add("btnAlarmDark")
        btnClear.classList.add("btnClearDark")
        btnHour.classList.add("btnHourDark")
        btnMin.classList.add("btnMinDark")
        
        
    } else{
         change.innerHTML = "<i class='fa fa-moon'></i>"
         change.style.color = " #F50057"
         document.body.style.backgroundColor = " #FFF8E1"
         box.classList.remove("boxDark")
         box.classList.add("box")
         visor.classList.remove("screenDark")
         visor.classList.add("screen")
         btnAlarm.classList.remove("btnAlarmDark")
         btnAlarm.classList.add("btnAlarm")
         btnClear.classList.remove("btnClearDark")
         btnClear.classList.add("btnClear")
         btnHour.classList.remove("btnHourDark")
         btnHour.classList.add("btnHour")
         btnMin.classList.remove("btnMinDark")
         btnMin.classList.add("btnMin")
    }
    isMoon = !isMoon;
})
