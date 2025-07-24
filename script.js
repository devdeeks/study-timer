let totalSeconds = 1500; // 25 min
let remaining = totalSeconds;
let interval;
let isRunning = false;

const timeEl = document.getElementById("time");
const progress = document.querySelector(".progress");
const sound = document.getElementById("alertSound");

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateTime() {
  timeEl.textContent = formatTime(remaining);
  const offset = 565.48 * (1 - remaining / totalSeconds);
  progress.style.strokeDashoffset = offset;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(() => {
    if (remaining > 0) {
      remaining--;
      updateTime();
    } else {
      clearInterval(interval);
      isRunning = false;
      sound.play();
      document.getElementById("alertPopup").style.display = "flex";
    }
  }, 1000);
}

function closePopup() {
  document.getElementById("alertPopup").style.display = "none";
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(interval);
  remaining = totalSeconds;
  isRunning = false;
  updateTime();
}

updateTime();
