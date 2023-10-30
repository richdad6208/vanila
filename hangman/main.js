import { sleep } from "./script/sleep.js";
import { words } from "./db.js";

const resultImage = document.querySelector(".result__image");
const startButton = document.querySelector(".choice__start__button");
const timeLeft = document.querySelector(".choice__time");
const pushAlphabetWrapper = document.querySelector(".choice__alphabet-wrapper");
const answer = document.querySelector(".choice__middle__body");
const leftChance = document.querySelector(".choice__chance");
const gameOver = document.querySelector(".gameover-screen");
const choiceLoading = document.querySelector(".choice__loading");
const success = document.querySelector(".success-screen");

const firstWord = {
  questionWord: "",
  changedWord: "",
  leftCount: 7,
  leftTime: 60,
  correctBoolean: false,
  gameOnBoolean: false,
  wrongBoolean: false,
  choiceWord() {
    const randomNumber = Math.ceil(Math.random() * 10);
    const randomWord = words[randomNumber].word;
    this.questionWord = randomWord;
    this.changedWord = randomWord.replaceAll(/\w/g, "_");
  },
};

function start(e) {
  initialSetting();
  firstWord.gameOnBoolean = true;
  decreaseTime();
  pushAlphabetWrapper.addEventListener("click", pushAlphabet);
}

function initialSetting() {
  firstWord.correctBoolean = false;
  firstWord.choiceWord();
  firstWord.leftTime = 60;
  timeLeft.innerText = "time: " + firstWord.leftTime;
  answer.innerHTML = firstWord.changedWord.replaceAll("", " ");
  firstWord.leftCount = 7;
  leftChance.innerHTML = "chances: 7";
  matchChangeToResult(7);
  reactiveAlphabetButton();
}

async function decreaseTime() {
  if (firstWord.gameOnBoolean) {
    startButton.style.display = "none";
    choiceLoading.style.opacity = "1";
    choiceLoading.style.zIndex = "initial";
    const rotating = [
      {
        transform: "rotate(0)",
      },
      {
        transform: "rotate(360deg)",
      },
    ];
    const timing = {
      duration: 1000,
      iterations: Infinity,
    };
    choiceLoading.animate(rotating, timing);
    while (firstWord.leftTime > 0 && firstWord.gameOnBoolean) {
      await sleep(1000);
      firstWord.leftTime--;
      timeLeft.innerText = `time: ${firstWord.leftTime}`;
    }
    if (!firstWord.correctBoolean) {
      firstWord.wrongBoolean = true;
    }
    firstWord.gameOnBoolean = false;
    checkChance();
    startButton.style.display = "block";
    choiceLoading.style.zIndex = "-1";
    choiceLoading.style.opacity = "0";
  }
}

startButton.addEventListener("click", start);

function pushAlphabet(e) {
  if (e.target.className === "alphabet") {
    if (firstWord.leftCount > 0 && firstWord.gameOnBoolean === true) {
      firstWord.leftCount--;
      leftChance.innerHTML = `chances: ${firstWord.leftCount}`;
      matchChangeToResult(firstWord.leftCount);
      const word = e.target.innerText.toLowerCase();
      e.target.style.opacity = "0";
      e.target.setAttribute("disabled", "");
      printWord(word);
      if (firstWord.leftCount === 0) {
        firstWord.gameOnBoolean = false;
        firstWord.wrongBoolean = true;
        firstWord.correctBoolean = false;
      }
      checkChance();
      checkAnswer();
    }
  }
}

function matchChangeToResult(num) {
  if (num !== 7) {
    resultImage.setAttribute("src", `./images/hang-${num}.png`);
  } else {
    resultImage.setAttribute("src", "");
  }
}

function checkChance() {
  if (firstWord.wrongBoolean && !firstWord.gameOnBoolean) {
    resultImage.setAttribute("src", `./images/hang-0.png`);
    gameOver.style.left = "0";
    gameOver.style.opacity = "1";
  }
}
function checkAnswer() {
  if (!firstWord.changedWord.includes("_")) {
    success.style.display = "flex";
    firstWord.correctBoolean = true;
    firstWord.wrongBoolean = false;
    firstWord.gameOnBoolean = false;
    startButton.style.display = "block";
    choiceLoading.style.zIndex = "-1";
    choiceLoading.style.opacity = "0";
  }
}
function printWord(alphabet) {
  const beforeWord = firstWord.questionWord;
  const afterWord = firstWord.changedWord.replaceAll(" ", "");
  const result = checkWord(beforeWord, afterWord, alphabet);
  firstWord.changedWord = result.replaceAll("", " ");
  answer.innerText = firstWord.changedWord;
}

function checkWord(beforeWord, afterWord, alphabet) {
  let arr = [];
  let afterArr = [...afterWord];
  for (let i = 0; i < beforeWord.length; i++) {
    let index = beforeWord.indexOf(alphabet, i);
    if (index !== -1 && !arr.includes(index)) {
      arr.push(index);
    }
  }
  arr.forEach((item) => afterArr.splice(item, 1, alphabet));
  return afterArr.join("");
}

function reactiveAlphabetButton() {
  [...pushAlphabetWrapper.children].forEach((item) => {
    item.removeAttribute("disabled");
    item.style.opacity = "1";
  });
}

gameOver.addEventListener("click", gameOverRetry);

async function gameOverRetry(e) {
  if (
    e.target.className === "gameover__retry" ||
    e.target.parentNode.className === "gameover__retry"
  ) {
    gameOver.style.left = "4000px";
    gameOver.style.opacity = "0";
    answer.innerText = "게임을 시작하세요";
    initialSetting();
  }
}
success.addEventListener("click", correctRetry);
async function correctRetry(e) {
  if (
    e.target.className === "success__retry" ||
    e.target.parentNode.className === "success__retry"
  ) {
    firstWord.gameOnBoolean = false;
    answer.innerText = "게임을 시작하세요";
    initialSetting();
    success.style.opacity = "0";
    await sleep(1000);
    success.style.display = "none";
    success.style.opacity = "1";
  }
}
