import { generateCapitalsQuiz } from "./countries.js";
import { generateNumbersQuiz } from "./numbers.js";
import { generatePhrasesQuiz } from "./phrases.js";
import { generateWordsQuiz } from "./words.js"; // Add this line
import { generateSeptWeek3Quiz } from "./septWeek3.js";
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
  quizType,
  getHintFunction
) {
  if (selectedAnswer === correctAnswer) {
    button.classList.add("bg-green-500");
    correctAnswers++;
    showCongratulatoryGif();
    totalQuestions++;
    updateScore();
    setTimeout(() => {
      generateQuiz();
    }, 2000);
  } else {
    button.classList.add("bg-red-500");
    // Update incorrect answers count
    incorrectAnswers[currentTab] = incorrectAnswers[currentTab] || {};
    incorrectAnswers[currentTab][correctAnswer] =
      (incorrectAnswers[currentTab][correctAnswer] || 0) + 1;

    // Remove the red background after a short delay
    setTimeout(() => {
      button.classList.remove("bg-red-500");
    }, 500);
  }
}

function showHint(hint) {
  if (!hintShown) {
    currentQuestionAttempts++;
    const hintElement = document.createElement("p");
    hintElement.textContent = hint;
    hintElement.className = "mt-2 text-sm text-gray-600 italic";
    optionsElement.appendChild(hintElement);
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
  createOrGetGifContainer(); // Ensure the gif container exists
  switch (currentTab) {
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
