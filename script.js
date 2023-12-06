let timer;
let isRunning = false;

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  }
});

document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});

document.getElementById('reset-timer').addEventListener('click', function() {
  resetTimer();
});

function startTimer() {
  isRunning = true;
  document.getElementById('icon').innerHTML = '<i class="fas fa-pause"></i>';
  timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
  isRunning = false;
  document.getElementById('icon').innerHTML = '<i class="fas fa-play"></i>';
  clearInterval(timer);
  flashTimer();
}

function resetTimer() {
  stopTimer();
  const initialTime = '01:25:00';
  document.getElementById('timer').innerHTML = initialTime;
}

function updateTimer() {
  const timerElement = document.getElementById('timer');
  const timeParts = timerElement.innerHTML.split(':');
  let hours = parseInt(timeParts[0]);
  let minutes = parseInt(timeParts[1]);
  let seconds = parseInt(timeParts[2]);

  if (hours === 0 && minutes === 0 && seconds === 0) {
    stopTimer();
    playTimerSound();
    return;
  }

  if (seconds > 0) {
    seconds--;
  } else {
    seconds = 59;
    if (minutes > 0) {
      minutes--;
    } else {
      minutes = 59;
      if (hours > 0) {
        hours--;
      }
    }
  }

  timerElement.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
  return value < 10 ? `0${value}` : value;
}

function playTimerSound() {
  const timerSound = document.getElementById('timerSound');
  timerSound.play();
}

function flashTimer() {
  const timerElement = document.getElementById('timer');
  let count = 0;
  const flashInterval = setInterval(function() {
    timerElement.style.visibility = (count % 2 === 0) ? 'hidden' : 'visible';
    count++;
    if (count > 5) {
      clearInterval(flashInterval);
      timerElement.style.visibility = 'visible';
    }
  }, 100);
}