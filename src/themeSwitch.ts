const themeSwitchButton = document.querySelector(
  "[data-theme-switch-button]"
) as HTMLDivElement;

const themeSwitchCursor = themeSwitchButton.querySelector(
  "[data-theme-switch-cursor]"
) as HTMLDivElement;

themeSwitchButton.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    themeSwitchCursor.style.setProperty("--translateX", "0");
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  } else {
    themeSwitchCursor.style.setProperty("--translateX", "100");
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  }
});
