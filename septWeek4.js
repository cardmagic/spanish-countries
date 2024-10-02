import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const septWeek4Vocab = [
  {
    english: "The School",
    spanish: "La Escuela",
    mnemonic:
      "La Escuela sounds like 'The School' - imagine a school building with 'La' written on it.",
  },
  {
    english: "The Class",
    spanish: "La Clase",
    mnemonic:
      "La Clase sounds like 'The Class' - picture a classroom with 'La' on the door.",
  },
  {
    english: "Big",
    spanish: "Grande",
    mnemonic: "Grande sounds like 'Grand' - think of a grand, big palace.",
  },
  {
    english: "Small",
    spanish: "Pequeño",
    mnemonic:
      "Pequeño sounds like 'Peck-en-yo' - imagine a small bird pecking at something.",
  },
  {
    english: "Interesting",
    spanish: "Interesante",
    mnemonic:
      "Interesante is similar to 'Interesting' - picture an interesting book with 'ante' (before) written on it.",
  },
  {
    english: "Boring",
    spanish: "Aburrido",
    mnemonic:
      "Aburrido sounds like 'A-burrito' - imagine a boring burrito with no filling.",
  },
  {
    english: "Fun",
    spanish: "Divertido",
    mnemonic:
      "Divertido sounds like 'The-verted' - think of an extrovert having fun at a party.",
  },
  {
    english: "Difficult",
    spanish: "Difícil",
    mnemonic:
      "Difícil sounds like 'The-fee-seal' - imagine a seal balancing a difficult fee on its nose.",
  },
  {
    english: "Easy",
    spanish: "Fácil",
    mnemonic:
      "Fácil sounds like 'Facile' - picture an easy-to-assemble piece of furniture.",
  },
  {
    english: "Spanish (language)",
    spanish: "El Español",
    mnemonic: "El Español - imagine the Spanish flag with 'El' written on it.",
  },
  {
    english: "French",
    spanish: "El Francés",
    mnemonic:
      "El Francés sounds like 'The Frances' - picture a French person named Frances.",
  },
  {
    english: "English",
    spanish: "El Inglés",
    mnemonic:
      "El Inglés sounds like 'The Ingles' - imagine an English person shopping at Ingles grocery store.",
  },
  {
    english: "Science",
    spanish: "La Ciencia",
    mnemonic:
      "La Ciencia sounds like 'The Science' - picture a science lab with 'La' on the door.",
  },
  {
    english: "Social Studies",
    spanish: "Los Estudios Sociales",
    mnemonic:
      "Los Estudios Sociales - imagine a group of people studying social media together.",
  },
  {
    english: "History",
    spanish: "La Historia",
    mnemonic:
      "La Historia is similar to 'The History' - picture a history book with 'La' on the cover.",
  },
  {
    english: "Math",
    spanish: "Las Matemáticas",
    mnemonic:
      "Las Matemáticas sounds like 'The Mathematics' - imagine math symbols dancing with 'Las' written above them.",
  },
  {
    english: "Music",
    spanish: "La Música",
    mnemonic:
      "La Música is similar to 'The Music' - picture musical notes with 'La' floating among them.",
  },
  {
    english: "Art",
    spanish: "El Arte",
    mnemonic:
      "El Arte sounds like 'The Art' - imagine an art easel with 'El' painted on it.",
  },
  {
    english: "Physical Education (PE)",
    spanish: "La Educación Física",
    mnemonic:
      "La Educación Física - picture a PE class with 'La' written on their uniforms.",
  },
  {
    english: "Photography",
    spanish: "La Fotografía",
    mnemonic:
      "La Fotografía is similar to 'The Photography' - imagine a camera with 'La' on its lens.",
  },
  {
    english: "Communication",
    spanish: "La Comunicación",
    mnemonic:
      "La Comunicación is similar to 'The Communication' - picture a telephone with 'La' on its receiver.",
  },
  {
    english: "Spanish (nationality)",
    spanish: "Español",
    mnemonic:
      "Español - imagine a Spanish flag waving with 'ol' written on it.",
  },
  {
    english: "Salvadoran",
    spanish: "Salvadoreño",
    mnemonic:
      "Salvadoreño sounds like 'Salvador-eño' - picture Salvador Dalí painting 'eño' on a canvas.",
  },
  {
    english: "Nicaraguan",
    spanish: "Nicaragüense",
    mnemonic:
      "Nicaragüense sounds like 'Nicaragua-ense' - imagine the shape of Nicaragua with 'ense' written inside it.",
  },
  {
    english: "Costa Rican",
    spanish: "Costarricense",
    mnemonic:
      "Costarricense sounds like 'Costa-rich-ense' - picture a rich coast with 'ense' written in the sand.",
  },
  {
    english: "Dominican",
    spanish: "Dominicano",
    mnemonic:
      "Dominicano sounds like 'Domino-cano' - imagine a domino tile with a Dominican flag pattern.",
  },
];

function getSeptWeek4Hint(spanish) {
  const word = septWeek4Vocab.find((item) => item.spanish === spanish);
  return word ? word.mnemonic : null;
}

function generateSeptWeek4Quiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(septWeek4Vocab.length);
  const correctWord = septWeek4Vocab[randomIndex];
  const question = `What is the Spanish translation of "${correctWord.english}"?`;
  const correctAnswer = correctWord.spanish;

  questionElement.innerHTML = "";

  // Create or get the gif container
  createOrGetGifContainer();

  const questionText = document.createElement("div");
  questionText.textContent = question;
  questionText.className = "text-xl";
  questionElement.appendChild(questionText);

  const options = new Set();
  options.add(correctAnswer);

  const allOptions = septWeek4Vocab.map((item) => item.spanish);

  while (options.size < 5) {
    const randomOption = allOptions[getRandomInt(allOptions.length)];
    options.add(randomOption);
  }

  const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);
  optionsElement.innerHTML = "";

  optionsArray.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className =
      "w-full py-2 px-4 bg-gray-500 option-button text-white rounded hover:bg-gray-700";
    button.addEventListener("click", () =>
      handleOptionClick(
        button,
        option,
        correctAnswer,
        "septWeek4",
        getSeptWeek4Hint
      )
    );
    optionsElement.appendChild(button);
  });

  // Add hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () =>
    showHint(getSeptWeek4Hint(correctAnswer))
  );
  questionElement.appendChild(hintButton);

  updateScore();
}

export { generateSeptWeek4Quiz };
