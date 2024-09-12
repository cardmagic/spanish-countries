import { generateCapitalsQuiz } from "./countries.js";
import { generateNumbersQuiz } from "./numbers.js";
import { generatePhrasesQuiz } from "./phrases.js";
import { generateWordsQuiz } from "./words.js";
import { generateQuiz, initializeElements } from "./quizEngine.js";

let currentTab = "capitals";

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll("nav a").forEach((a) => {
    a.classList.remove("text-blue-800", "border-b-2", "border-blue-500");
    a.classList.add("text-blue-500");
  });
  document
    .querySelector(`nav a[data-tab="${tab}"]`)
    .classList.add("text-blue-800", "border-b-2", "border-blue-500");

  // Generate a new quiz after changing the tab
  generateQuiz();
}

document.addEventListener("DOMContentLoaded", function () {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const scoreElement = document.getElementById("score");

  initializeElements(questionElement, optionsElement, scoreElement);

  generateQuiz();
  document.querySelectorAll("nav a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      switchTab(e.target.getAttribute("data-tab"));
    });
  });
});

export { currentTab, switchTab };
