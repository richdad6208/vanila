const $button = document.querySelector(".button-wrapper");

function handleClick(e) {
  if (e.target.closest(".decrease")) {
    count--;
    printCountOnScreen();
  }
  if (e.target.closest(".reset")) {
    count = 0;
    printCountOnScreen();
  }
  if (e.target.closest(".increase")) {
    count++;
    printCountOnScreen();
  }
}

const printCountOnScreen = () => {
  $body.innerHTML = count;
};

const $body = document.querySelector(".body");
let count = 0;

const app = () => {
  printCountOnScreen();
  $button.addEventListener("click", handleClick);
};

app();
