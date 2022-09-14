let startGameButton = document.getElementById("start-game-btn");
let hScore = 0;
let gScore = 0;
let hScoreEl = document.getElementById("home-score");
let gScoreEl = document.getElementById("guest-score");
let progressBar = document.getElementById("progressBar");
let timerText = document.getElementById("timer");
let quarterText = document.getElementById("quarter");
let quarter = 0;
//Each basketball game is played in 4 quarters of 12 minutes each = total of 48 minutes

const quarterTimeSecs = 10; //12 mins = 720 secs
const timeDecrement = 1;
let timeleft = quarterTimeSecs;
progressBar.value = quarterTimeSecs;
progressBar.max = quarterTimeSecs;

const homePlusOne = () => (
  (hScoreEl.textContent = parseInt((hScore += 1))), whoIsLeading()
);
const homePlusTwo = () => (
  (hScoreEl.textContent = parseInt((hScore += 2))), whoIsLeading()
);
const homePlusThree = () => (
  (hScoreEl.textContent = parseInt((hScore += 3))), whoIsLeading()
);

const guestPlusOne = () => (
  (gScoreEl.textContent = parseInt((gScore += 1))), whoIsLeading()
);
const guestPlusTwo = () => (
  (gScoreEl.textContent = parseInt((gScore += 2))), whoIsLeading()
);
const guestPlusThree = () => (
  (gScoreEl.textContent = parseInt((gScore += 3))), whoIsLeading()
);

const newGame = () => (
  startTimer(),
  (gScoreEl.textContent = parseInt((gScore = 0))),
  (hScoreEl.textContent = parseInt((hScore = 0))),
  (hScoreEl.style.border = "thick solid transparent"),
  (gScoreEl.style.border = "thick solid transparent"),
  (timeleft = quarterTimeSecs) //12 mins = 720 secs
);

const endGame = () => {
  (timeleft = 0),
    (quarter = 1),
    clearInterval(runTimer),
    (startGameButton.hidden = false);
  startGameButton.textContent = "GAME OVER";
  return;
};

function whoIsLeading() {
  if (hScore > gScore) {
    hScoreEl.style.border = "thick solid #059669";
    gScoreEl.style.border = "thick solid transparent";
  } else if (gScore > hScore) {
    gScoreEl.style.border = "thick solid #059669";
    hScoreEl.style.border = "thick solid transparent";
  } else {
    hScoreEl.style.border = "thick solid #4C1D95";
    gScoreEl.style.border = "thick solid #4C1D95";
  }
}

function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

function startTimer() {
  startGameButton.textContent = "START GAME";
  quarter += 1;
  progressBar.value = timeleft;

  let runTimer = setInterval(function () {
    startGameButton.disabled = true;

    if (timeleft <= 0) {
      clearInterval(runTimer);
      startGameButton.disabled = false;
      if (quarter == 4) {
        startGameButton.textContent = "GAME OVER";
      }
    }

    if (quarter > 4) {
      quarter = 1;
      endGame();
    }

    progressBar.value = timeleft;
    let minutes = Math.floor(timeleft / 60);
    let seconds = timeleft - minutes * 60;
    let finalTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);

    quarterText.innerHTML = `Quarter: ${quarter}`;
    timerText.innerHTML = `${finalTime}`;

    timeleft -= timeDecrement;
  }, 1000);
}
