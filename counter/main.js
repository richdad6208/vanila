const $button = document.querySelector(".button-wrapper");
$button.addEventListener("click", handleClick);

function handleClick(e) {
  if (e.target.closest(".decrease")) console.log("hi");
}
