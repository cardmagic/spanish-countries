import { generateCapitalsQuiz } from "./countries.js";
import { generateNumbersQuiz } from "./numbers.js";
import { generatePhrasesQuiz } from "./phrases.js";
import { generateWordsQuiz } from "./words.js";
import { generateQuiz, initializeElements } from "./quizEngine.js";
import { generateSeptWeek3Quiz } from "./septWeek3.js";
import { generateSeptWeek4Quiz } from "./septWeek4.js";
import { generateOctWeek4Quiz } from "./octWeek4.js";
import { generateNovWeek1Quiz } from "./novWeek1.js";
import { generateDecWeek1Quiz } from "./decWeek1.js";
import { generateDecWeek2Quiz } from "./decWeek2.js";

let currentTab = "decWeek2"; // New default quiz

function switchQuiz(quiz) {
  currentTab = quiz;
  generateQuiz();
}

document.addEventListener("DOMContentLoaded", function () {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const scoreElement = document.getElementById("score");
  const quizSelector = document.getElementById("quiz-selector");

  initializeElements(questionElement, optionsElement, scoreElement);

  quizSelector.addEventListener("change", (e) => {
    switchQuiz(e.target.value);
  });

  generateQuiz();
});

export { currentTab, switchQuiz };
