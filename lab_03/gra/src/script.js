const gameBoard = document.querySelector("#board");
const scoreDisplay = document.querySelector("#score");
const resetOverlay = document.querySelector("#reset");
const finalScoreDisplay = document.querySelector("#final");
const crosshair = document.querySelector("#crosshair");
const zombieIntervals = {};

let playerScore = 50;
let playerHealth = 3;
let zombieIndex = 0;
let gameIsRunning;

function animateZombie(zombie, speed) {
  let shift = 200;
  let bgPosition = 0;
  let position = 0;

  zombieIntervals[zombie.id] = setInterval(() => {
    zombie.style.backgroundPositionX = bgPosition + shift + "px";
    zombie.style.left = 100 - position + "vw";
    bgPosition -= shift;
    position++;

    if (bgPosition == -1800) bgPosition = 0;

    if (position == 115) {
      zombie.remove();
      playerHealth -= 1;
      for (let i = playerHealth; i < 3; i++) {
        document.querySelectorAll("img")[i].src = "../images/empty_heart.png";
      }

      if (playerHealth <= 0) endGame();

      if (playerScore < 0) endGame();

      clearInterval(zombieIntervals[zombie.id]);
    }
  }, speed);
}

function spawnZombie(speed, bottom, size) {
  let zombie = document.createElement("div");

  zombie.classList.add("zombie");
  zombie.setAttribute("id", zombieIndex);
  zombie.addEventListener("click", zombieHit);
  zombie.style.bottom = bottom + "vh";
  zombie.style.left = "100vw";
  zombie.style.transform = "scale(" + size + ")";

  gameBoard.appendChild(zombie);
  zombieIndex++;

  animateZombie(zombie, speed);
}

function boardShot() {
  playerScore -= 5;
  scoreDisplay.textContent = playerScore;
}

function zombieHit() {
  playerScore += 25;
  scoreDisplay.textContent = playerScore;

  clearInterval(zombieIntervals[this.id]);
  this.remove();
}

function createZombie() {
  let speed = getRandomInt(15, 51);
  let bottom = getRandomInt(3, 31);
  let size = getRandomInt(1, 3);

  spawnZombie(speed, bottom, size);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}

function crosshairMove(e) {
  crosshair.style.top = e.pageY + "px";
  crosshair.style.left = e.pageX + "px";
}

function initializeGame() {
  playerHealth = 3;
  playerScore = 50;
  zombieIndex = 0;

  scoreDisplay.textContent = playerScore;
  document.body.style.cursor = "none";
  gameBoard.addEventListener("click", boardShot);
  window.addEventListener("mousemove", crosshairMove);

  let zombies = document.querySelectorAll("div.zombie");

  for (let i = 0; i < zombies.length; i++) zombies[i].remove();

  gameIsRunning = setInterval(() => {
    createZombie();
    if (playerScore < 0) endGame();
  }, 1000);
}

function resetGame() {
  resetOverlay.style.transform = "translateY(200%)";
  for (let i = 0; i < 3; i++) {
    document.querySelectorAll("img")[i].src = "../images/full_heart.png";
  }

  const sadMusic = document.getElementById("sadMusic");
  sadMusic.pause();
  sadMusic.currentTime = 0;
  initializeGame();
}

function endGame() {
  clearInterval(gameIsRunning);

  Object.keys(zombieIntervals).forEach(function (key) {
    clearInterval(zombieIntervals[key]);
  });

  gameBoard.removeEventListener("click", boardShot);
  finalScoreDisplay.textContent = playerScore;
  window.removeEventListener("mousemove", crosshairMove);
  document.body.style.cursor = "default";

  resetOverlay.style.transform = "translateY(0%)";

  const sadMusic = document.getElementById("sadMusic");
  sadMusic.load();
  sadMusic.play();

  document.getElementById("resetGame").addEventListener("click", resetGame);
}

initializeGame();
