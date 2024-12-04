import { generateCapitalsQuiz } from "./countries.js";
import { generateNumbersQuiz } from "./numbers.js";
import { generatePhrasesQuiz } from "./phrases.js";
import { generateWordsQuiz } from "./words.js"; // Add this line
import { generateSeptWeek3Quiz } from "./septWeek3.js";
import { generateSeptWeek4Quiz } from "./septWeek4.js";
import { generateOctWeek4Quiz } from "./octWeek4.js";
import { generateNovWeek1Quiz } from "./novWeek1.js";
import { generateDecWeek1Quiz } from "./decWeek1.js";
import { currentTab } from "./application.js";

let totalQuestions = 0;
let correctAnswers = 0;
let incorrectAnswers = {};
let hintShown = false;
let congratulatoryGifs = [];
let currentQuestionAttempts = 0;

const congratulatoryMessages = [
  "Congratulations",
  "Way to go",
  "Nice job",
  "You did it",
  "Awesome",
  "Great job",
  "You rock",
  "High five",
  "You nailed it",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function fetchCongratulatoryGifs() {
  const randomMessage =
    congratulatoryMessages[
      Math.floor(Math.random() * congratulatoryMessages.length)
    ];
  const encodedMessage = encodeURIComponent(randomMessage);
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=cPGAZEnhuSGQ9iKlFKvfuAQPmozexHRh&q=${encodedMessage}&limit=50`
    );
    const data = await response.json();
    congratulatoryGifs = data.data.map((gif) => ({
      url: gif.images.original.url,
      alt: gif.alt_text || `${randomMessage} GIF`,
    }));
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    throw error;
  }
}

async function showCongratulatoryGif() {
  if (congratulatoryGifs.length === 0) {
    try {
      await fetchCongratulatoryGifs();
      displayRandomGif();
    } catch (error) {
      console.error("Failed to fetch congratulatory GIFs:", error);
    }
  } else {
    displayRandomGif();
  }
}

function displayRandomGif() {
  if (congratulatoryGifs.length === 0) {
    console.error("No GIFs available");
    return;
  }

  const randomGif =
    congratulatoryGifs[Math.floor(Math.random() * congratulatoryGifs.length)];
  const gifElement = document.createElement("img");
  gifElement.src = randomGif.url;
  gifElement.alt = randomGif.alt;
  gifElement.className = "w-1/2 h-auto rounded mx-auto";

  const gifContainer = createOrGetGifContainer();
  gifContainer.innerHTML = "";
  gifContainer.className = "mb-4 flex justify-center";
  gifContainer.appendChild(gifElement);

  setTimeout(() => {
    gifContainer.innerHTML = "";
  }, 3000);
}

function sendIncorrectAnswers(category) {
  const sortedIncorrectList = Object.entries(incorrectAnswers[category] || {})
    .sort((a, b) => b[1] - a[1])
    .map(([item, count]) => `${item} (${count})`)
    .join(", ");

  const accuracy =
    totalQuestions > 0
      ? ((correctAnswers / totalQuestions) * 100).toFixed(2)
      : 0;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[new Date().getDay()];

  const message =
    sortedIncorrectList.length > 0
      ? `${dayOfWeek} ${
          category.charAt(0).toUpperCase() + category.slice(1)
        } Quiz - Questions Answered: ${totalQuestions}, Accuracy: ${accuracy}%, Incorrectly answered items: ${sortedIncorrectList}`
      : `${dayOfWeek} ${
          category.charAt(0).toUpperCase() + category.slice(1)
        } Quiz - Questions Answered: ${totalQuestions}, Accuracy: ${accuracy}%, No items were answered incorrectly!`;

  fetch("https://ntfy.sh/spanish-quiz", {
    method: "POST",
    body: message,
  })
    .then(() => {
      console.log("Quiz results sent successfully");
      incorrectAnswers[category] = {};
    })
    .catch((error) => {
      console.error("Error sending quiz results:", error);
    });
}

function updateScore() {
  const percentage =
    totalQuestions > 0
      ? ((correctAnswers / totalQuestions) * 100).toFixed(2)
      : 0;
  scoreElement.textContent = `Questions Answered: ${totalQuestions}, Correct: ${correctAnswers}, Accuracy: ${percentage}%`;
}

function handleOptionClick(
  button,
  selectedAnswer,
  correctAnswer,
  category,
  getHint
) {
  totalQuestions++;

  // Remove the default background color class
  button.classList.remove("bg-gray-500", "hover:bg-gray-700");

  if (selectedAnswer === correctAnswer) {
    correctAnswers++;
    button.classList.add("bg-green-500");

    // Change container background to green
    const container = document.querySelector(".container");
    container.classList.remove("bg-black");
    container.classList.add("bg-green-800");

    if (currentQuestionAttempts === 0) {
      showCongratulatoryGif().catch((error) => {
        console.error("Error showing congratulatory GIF:", error);
      });
    }

    setTimeout(() => {
      button.classList.remove("bg-green-500");
      button.classList.add("bg-gray-500", "hover:bg-gray-700");

      // Change container background back to black
      container.classList.remove("bg-green-800");
      container.classList.add("bg-black");

      if (correctAnswers % 20 === 0) {
        sendIncorrectAnswers(category);
      }
      generateQuiz();
    }, 3000);
  } else {
    currentQuestionAttempts++;
    if (!incorrectAnswers[category]) {
      incorrectAnswers[category] = {};
    }
    incorrectAnswers[category][correctAnswer] =
      (incorrectAnswers[category][correctAnswer] || 0) + 1;

    button.classList.add("bg-red-500", "shake");
    if ("vibrate" in navigator) {
      navigator.vibrate(500);
    }
    setTimeout(() => {
      button.classList.remove("bg-red-500", "shake");
      button.classList.add("bg-gray-500", "hover:bg-gray-700");
      button.disabled = true;
    }, 1000);

    const hint = getHint(correctOption);
    if (hint) {
      showHint(`Mnemonic: ${hint}`);
    }
  }
}

function showHint(hint) {
  if (!hintShown) {
    currentQuestionAttempts++;
    const hintElement = document.createElement("p");
    hintElement.textContent = hint;
    hintElement.className = "mt-2 text-gray-400 italic";
    optionsElement.insertBefore(hintElement, optionsElement.firstChild);
    hintShown = true;
  }
}

let questionElement;
let optionsElement;
let scoreElement;

function initializeElements(question, options, score) {
  questionElement = question;
  optionsElement = options;
  scoreElement = score;
}

function getQuestionElement() {
  return questionElement;
}

function getOptionsElement() {
  return optionsElement;
}

function getScoreElement() {
  return scoreElement;
}

function generateQuiz() {
  resetQuestionAttempts();
  createOrGetGifContainer();
  setInitialButtonStyles();
  switch (currentTab) {
    case "decWeek1":
      generateDecWeek1Quiz();
      break;
    case "septWeek4":
      generateSeptWeek4Quiz();
      break;
    case "septWeek3":
      generateSeptWeek3Quiz();
      break;
    case "capitals":
      generateCapitalsQuiz();
      break;
    case "numbers":
      generateNumbersQuiz();
      break;
    case "phrases":
      generatePhrasesQuiz();
      break;
    case "words":
      generateWordsQuiz();
      break;
    case "octWeek4":
      generateOctWeek4Quiz();
      break;
    case "novWeek1":
      generateNovWeek1Quiz();
      break;
  }
}

function createOrGetGifContainer() {
  let gifContainer = document.getElementById("gif-container");
  if (!gifContainer) {
    gifContainer = document.createElement("div");
    gifContainer.id = "gif-container";
    gifContainer.className = "mb-4";
    const questionElement = getQuestionElement();
    questionElement.insertBefore(gifContainer, questionElement.firstChild);
  }
  return gifContainer;
}

function resetQuestionAttempts() {
  currentQuestionAttempts = 0;
  hintShown = false;
}

function setInitialButtonStyles() {
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach((btn) => btn.classList.add("bg-gray-500"));
}

export {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  showCongratulatoryGif,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  hintShown,
  currentQuestionAttempts,
  initializeElements,
  getQuestionElement,
  getOptionsElement,
  getScoreElement,
  generateQuiz,
  createOrGetGifContainer,
  resetQuestionAttempts,
};
