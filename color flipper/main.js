const $button = document.querySelector("button");
const $body = document.body;
const randomString = "0123456789abcdef";
const $content = document.querySelector(".content");
$button.addEventListener("click", handleClick);

function handleClick() {
  changeButtonColor();
  const code = getRandomBackgroundCode();
  changeBackgroundColor(code);
  inputCodeToContent(code);
}

function changeButtonColor() {
  $button.style.color = "black";
}

function changeBackgroundColor(code) {
  $body.style.background = `#${code}`;
}

function inputCodeToContent(code) {
  $content.innerHTML = `Background Color : #${code}`;
}

function getRandomIndex() {
  return Math.floor(Math.random() * randomString.length);
}

function getRandomStringFromIndex() {
  return randomString[getRandomIndex()];
}

function getRandomBackgroundCode() {
  let backgroundCode = "";
  let count = 1;
  while (count <= 6) {
    backgroundCode += getRandomStringFromIndex();
    count++;
  }
  return backgroundCode;
}
