function handleClick() {
  $navigation.toggleAttribute("data-expanded");
}

$navToggle = document.querySelector(".nav-toggle");
$navigation = document.querySelector(".primary-navigation");

function App() {
  $navToggle.addEventListener("click", handleClick);
}
App();
