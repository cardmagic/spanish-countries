import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const novWeek1Vocab = [
  {
    english: "house",
    spanish: "la casa",
    mnemonic: "Casa sounds like 'case-a' - imagine your house as a giant case.",
  },
  {
    english: "rooms",
    spanish: "los cuartos",
    mnemonic:
      "Cuartos sounds like 'quarters' - think of rooms as quarters of a house.",
  },
  {
    english: "living room",
    spanish: "la sala",
    mnemonic:
      "Sala sounds like 'salah' - picture doing a salah (prayer) in the living room.",
  },
  {
    english: "dining room",
    spanish: "el comedor",
    mnemonic:
      "Comedor contains 'come' - imagine coming to eat (comer) in this room.",
  },
  {
    english: "kitchen",
    spanish: "la cocina",
    mnemonic: "Cocina sounds like 'cooking-a' - where all the cooking happens.",
  },
  {
    english: "bedroom",
    spanish: "la recámara",
    mnemonic:
      "Recámara sounds like 'wreck-a-camera' - picture taking photos in your bedroom.",
  },
  {
    english: "bathroom",
    spanish: "el baño",
    mnemonic:
      "Baño sounds like 'ban-yo' - imagine saying 'yo!' when banned from the bathroom.",
  },
  {
    english: "garden",
    spanish: "el jardín",
    mnemonic:
      "Jardín sounds like 'hard-in' - think of working hard in the garden.",
  },
  {
    english: "flower",
    spanish: "la flor",
    mnemonic:
      "Flor sounds like 'floor' - picture flowers growing from the floor.",
  },
  {
    english: "tree",
    spanish: "el árbol",
    mnemonic:
      "Árbol contains 'ar' - imagine a pirate saying 'Arrr!' while climbing a tree.",
  },
  {
    english: "apartment",
    spanish: "el apartamento",
    mnemonic:
      "Apartamento sounds like 'apart-a-mental' - think of separate mental spaces.",
  },
  {
    english: "floor",
    spanish: "el piso",
    mnemonic:
      "Piso sounds like 'peace-o' - imagine peaceful walking on the floor.",
  },
  {
    english: "furniture",
    spanish: "los muebles",
    mnemonic:
      "Muebles sounds like 'movables' - think of moving furniture around.",
  },
  {
    english: "sofa/couch",
    spanish: "el sofá",
    mnemonic: "Sofá sounds exactly like 'sofa' - easy to remember!",
  },
  {
    english: "chair",
    spanish: "la silla",
    mnemonic:
      "Silla sounds like 'see-ya' - imagine sitting and saying 'see ya!'",
  },
  {
    english: "table",
    spanish: "la mesa",
    mnemonic: "Mesa sounds like 'mess-a' - picture a messy table.",
  },
  {
    english: "lamp",
    spanish: "la lámpara",
    mnemonic: "Lámpara sounds like 'lamp-para' - think of a lamp for a parade.",
  },
  {
    english: "bed",
    spanish: "la cama",
    mnemonic: "Cama sounds like 'comma' - imagine sleeping like a comma.",
  },
  {
    english: "garage",
    spanish: "el garaje",
    mnemonic: "Garaje sounds like 'garage' - just add a Spanish accent!",
  },
  {
    english: "car",
    spanish: "el carro",
    mnemonic: "Carro sounds like 'car-row' - picture cars in a row.",
  },
  {
    english: "city",
    spanish: "la ciudad",
    mnemonic:
      "Ciudad sounds like 'see-you-dad' - imagine seeing your dad in the city.",
  },
  {
    english: "bike",
    spanish: "la bicicleta",
    mnemonic: "Bicicleta sounds like 'busy-cleta' - think of a busy bicycle.",
  },
  {
    english: "there is/there are",
    spanish: "hay",
    mnemonic:
      "Hay sounds like 'eye' - imagine an eye seeing that there is something.",
  },
  {
    english: "each, every",
    spanish: "cada",
    mnemonic: "Cada sounds like 'car-da' - think of counting each car.",
  },
  {
    english: "other",
    spanish: "otro",
    mnemonic:
      "Otro sounds like 'oh-tro' - imagine saying 'oh!' to another thing.",
  },
  {
    english: "next to",
    spanish: "al lado de",
    mnemonic:
      "Al lado sounds like 'all lado' - picture all things laid next to each other.",
  },
  {
    english: "in front of",
    spanish: "delante de",
    mnemonic:
      "Delante sounds like 'de-land-te' - think of landing in front of something.",
  },
  {
    english: "behind",
    spanish: "detrás de",
    mnemonic: "Detrás sounds like 'de-tras' - imagine trash behind something.",
  },
  {
    english: "around",
    spanish: "alrededor de",
    mnemonic:
      "Alrededor contains 'red' - picture a red circle around something.",
  },
  {
    english: "old",
    spanish: "viejo/a",
    mnemonic:
      "Viejo sounds like 'vee-eh-ho' - imagine an old person saying 'eh' a lot.",
  },
  {
    english: "yard",
    spanish: "el patio",
    mnemonic: "Patio is the same in English - easy!",
  },
  {
    english: "door",
    spanish: "la puerta",
    mnemonic: "Puerta sounds like 'pwer-ta' - think of power to open the door.",
  },
  {
    english: "window",
    spanish: "la ventana",
    mnemonic: "Ventana contains 'vent' - imagine ventilation through a window.",
  },
  {
    english: "balcony",
    spanish: "el balcón",
    mnemonic:
      "Balcón sounds like 'ball-cone' - picture bouncing a ball on a balcony.",
  },
  {
    english: "desk",
    spanish: "el escritorio",
    mnemonic: "Escritorio contains 'escrit' (write) - where you write things.",
  },
  {
    english: "television, TV",
    spanish: "la televisión/la tele",
    mnemonic:
      "Televisión is similar to 'television' - just add Spanish accent!",
  },
  {
    english: "car",
    spanish: "el coche",
    mnemonic: "Coche sounds like 'coach-eh' - imagine a coach driving a car.",
  },
  {
    english: "new",
    spanish: "nuevo/a",
    mnemonic:
      "Nuevo sounds like 'new-eh-vo' - think 'new' with a Spanish twist.",
  },
  {
    english: "town, village",
    spanish: "el pueblo",
    mnemonic:
      "Pueblo sounds like 'pwe-blow' - imagine blowing on a small town.",
  },
  {
    english: "bedroom, dormitory",
    spanish: "el dormitorio",
    mnemonic: "Dormitorio contains 'dorm' - where you sleep, like a dorm.",
  },
  {
    english: "Ecuadorian",
    spanish: "ecuatoriano/a",
    mnemonic: "Ecuatoriano contains 'Ecuador' - think of someone from Ecuador.",
  },
  {
    english: "Panamanian",
    spanish: "panameño/a",
    mnemonic:
      "Panameño contains 'Panama' - imagine someone wearing a Panama hat.",
  },
  {
    english: "Paraguayan",
    spanish: "paraguayo/a",
    mnemonic:
      "Paraguayo contains 'Paraguay' - picture someone drinking Paraguay tea.",
  },
  {
    english: "Peruvian",
    spanish: "peruano/a",
    mnemonic:
      "Peruano contains 'Peru' - imagine someone from Peru with a llama.",
  },
  {
    english: "Uruguayan",
    spanish: "uruguayo/a",
    mnemonic:
      "Uruguayo contains 'Uruguay' - think of someone playing Uruguay soccer.",
  },
  {
    english: "Venezuelan",
    spanish: "venezolano/a",
    mnemonic:
      "Venezolano contains 'Venezuela' - picture someone from Venezuela.",
  },
];

function getNovWeek1Hint(spanish) {
  const word = novWeek1Vocab.find((item) => item.spanish === spanish);
  return word ? word.mnemonic : null;
}

function generateNovWeek1Quiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(novWeek1Vocab.length);
  const correctWord = novWeek1Vocab[randomIndex];
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

  const allOptions = novWeek1Vocab.map((item) => item.spanish);

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
        "novWeek1",
        getNovWeek1Hint
      )
    );
    optionsElement.appendChild(button);
  });

  // Add hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () =>
    showHint(getNovWeek1Hint(correctAnswer))
  );
  questionElement.appendChild(hintButton);

  updateScore();
}

export { generateNovWeek1Quiz };
