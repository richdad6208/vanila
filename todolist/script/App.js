//깨달은 점 1. 코드 정리하기 전 깃커밋을 하자. 정리할 때는 고장이 잘나기 때문이다.

function saveTodo() {
  const addTodoInputValue = $addTodoInput.value;
  removeTodoInInput();
  return addTodoInputValue;
}

function searchTodo(e) {
  const searchKeyword = e.target.value;
  if (searchKeyword.length === 0) {
    return showPagenation(1);
  }
  [...$todos.children].forEach((item) => item.classList.remove("active"));
  let temp = [...$todos.children].filter((item) =>
    item.firstChild.data.split(" ").pop().includes(searchKeyword)
  );
  temp.forEach((item) => {
    item.classList.add("active");
  });
  console.log(temp);
}

function activatePagenation(e) {
  let currentPageNumber = null;
  console.log([...$pagenation.children]);
  [...$pagenation.children].forEach((page, index, arr) => {
    page.classList.toggle("active", page === e.target);
    if (arr.indexOf(e.target) === index) {
      currentPageNumber = index + 1;
    }
  });
  showPagenation(currentPageNumber);
}

function showPagenation(pageNumber) {
  [...$pagenation.children].forEach((item) => item.classList.remove("active"));
  $pagenation.children[pageNumber - 1].classList.add("active");
  showTodos(pageNumber);
}

function showTodos(pageNumber = 0) {
  let currentPageVolume = Math.ceil($todos.children.length / PAGE_VOLUME);
  [...$todos.children].forEach((item) => item.classList.remove("active"));
  let temp = [...$todos.children];

  for (
    let i = 5 * ((pageNumber || currentPageVolume) - 1);
    i < 5 * (pageNumber || currentPageVolume);
    i++
  ) {
    temp[i]?.classList.add("active");
  }
}
function createPagenation() {
  let currentPageVolume = Math.ceil($todos.children.length / PAGE_VOLUME);
  $pagenation.innerHTML = "";
  for (let i = 1; i <= currentPageVolume; i++) {
    $pagenation.innerHTML += `<span class="pagenation__number">${i}</span>`;
  }
  showPagenation(currentPageVolume);
}
function removeTodoInInput() {
  $addTodoInput.value = "";
}

function deleteTodoInList(e) {
  if (e.target.className === "todo__delete") {
    $todos.removeChild(e.target.parentNode);
  }
}

function addTodoItem(inputValue) {
  $todos.innerHTML += `<li class="todo__item">
  ${inputValue}<span class="todo__delete">❌</span>
</li>`;
}

const $addTodoButton = document.querySelector(".addTodoButton");
const $todos = document.querySelector(".todo__list");
const $addTodoInput = document.querySelector(".addTodoInput");
const $formInHead = document.querySelector(".formInHead");
const $pagenation = document.querySelector(".pagenation");
const $searchInput = document.querySelector(".searchInput");
const PAGE_VOLUME = 5;

function main() {
  showPagenation(1);
  $formInHead.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $todos.addEventListener("click", (e) => {
    deleteTodoInList(e);
    createPagenation();
  });

  $addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    addTodoItem(saveTodo());
    createPagenation();
  });
  $searchInput.addEventListener("input", searchTodo);

  $pagenation.addEventListener("click", activatePagenation);
}

main();
