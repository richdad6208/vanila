import { person } from "./person.data.js";

function getListFromArray() {
  person.forEach((item) => {
    const $li = document.createElement("li");
    $li.classList.add("card", "hidden");
    $li.innerHTML = `
        <img src=${item.avatarUrl} alt="" />
        <p class="name">${item.name}</p>
        <p class="job">${item.job}</p>
        <p class="description">
              ${item.description}
              </p>
              <div class="arrow-wrapper">
                <img class="prev" src="./images/arrow-left.png" alt="" />
                <img class="next" src="./images/arrow-right.png" alt="" />
              </div>
              <button>Surprise Me</button>
        `;
    $list.append($li);
  });
}

function displayOne(currentIndex) {
  const arrayOfPeople = [...$list.children];
  arrayOfPeople.forEach((item, index) => {
    item.classList.add("card", "hidden");
    if (currentIndex === index) {
      item.classList.remove("hidden");
    }
  });
}

function handleMove(e) {
  console.log(e);
  if (e.target.closest(".prev")) {
    if (currentIndex > 0) currentIndex--;
    console.log("hi");
    displayOne(currentIndex);
  }
  if (e.target.closest(".next")) {
    if (currentIndex < totalIndex) currentIndex++;
    displayOne(currentIndex);
  }
  return;
}

const $list = document.querySelector(".list");
const totalIndex = person.length - 1;
const START_INDEX = 0;
let currentIndex = 0;
const $arrow = document.querySelector(".arrow-wrapper");

function App() {
  getListFromArray();
  displayOne(currentIndex);
  $arrow.addEventListener("click", handleMove);
}

App();
