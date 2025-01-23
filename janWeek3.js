import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const janWeek3Vocab = [
  {
    english: "To Read",
    spanish: "Leer",
    mnemonic: "Leer sounds like 'lear' - imagine King Lear reading a book.",
  },
  {
    english: "To Open",
    spanish: "Abrir",
    mnemonic:
      "Abrir sounds like 'a-breeze' - picture opening a window to let in a breeze.",
  },
  {
    english: "To Receive",
    spanish: "Recibir",
    mnemonic:
      "Recibir sounds like 're-see-beer' - imagine receiving a beer and seeing it again.",
  },
  {
    english: "To Write",
    spanish: "Escribir",
    mnemonic:
      "Escribir contains 'scribe' - think of a scribe writing ancient texts.",
  },
  {
    english: "To Describe",
    spanish: "Describir",
    mnemonic:
      "Describir sounds like 'describe-ear' - picture describing what your ear looks like.",
  },
  {
    english: "To Decide",
    spanish: "Decidir",
    mnemonic:
      "Decidir sounds like 'decide-ear' - imagine deciding with your ear.",
  },
  {
    english: "To Choose",
    spanish: "Elegir",
    mnemonic:
      "Elegir sounds like 'elegant-ear' - think of elegantly choosing something.",
  },
  {
    english: "To Live",
    spanish: "Vivir",
    mnemonic:
      "Vivir sounds like 'viv-here' - think of living here and being vivacious.",
  },
  {
    english: "To Comprehend / Understand",
    spanish: "Comprender",
    mnemonic: "Comprender contains 'comprehend' - just add Spanish flair!",
  },
  {
    english: "To Learn",
    spanish: "Aprender",
    mnemonic:
      "Aprender sounds like 'a-prehend' - imagine grabbing (prehending) knowledge.",
  },
  {
    english: "To Eat",
    spanish: "Comer",
    mnemonic: "Comer sounds like 'come-er' - picture someone coming to eat.",
  },
  {
    english: "To Drink",
    spanish: "Beber",
    mnemonic:
      "Beber sounds like 'baby-er' - imagine a baby drinking from a bottle.",
  },
  {
    english: "To Take (e.g. drink beverage)",
    spanish: "Tomar",
    mnemonic: "Tomar sounds like 'to-mar' - think of taking a drink to Mars.",
  },
  {
    english: "To Cook",
    spanish: "Cocinar",
    mnemonic: "Cocinar contains 'cocina' (kitchen) - where you cook!",
  },
  {
    english: "To See",
    spanish: "Ver",
    mnemonic:
      "Ver sounds like 'veer' - imagine veering your head to see something.",
  },
  {
    english: "To Make / Do",
    spanish: "Hacer",
    mnemonic:
      "Hacer sounds like 'ha-sir' - imagine saying 'Ha, sir!' when making something.",
  },
  {
    english: "To Know (a fact / skill)",
    spanish: "Saber",
    mnemonic:
      "Saber sounds like 'say-bear' - picture a wise bear saying facts.",
  },
  {
    english: "The Avocado",
    spanish: "El Aguacate",
    mnemonic:
      "Aguacate sounds like 'agua-cat' - imagine a cat drinking water with avocado.",
  },
  {
    english: "The Carrots",
    spanish: "Las Zanahorias",
    mnemonic:
      "Zanahorias sounds like 'sana-whore-ias' - picture healthy (sana) orange carrots.",
  },
  {
    english: "The Peppers",
    spanish: "Las Pimientas",
    mnemonic:
      "Pimientas sounds like 'pee-mientas' - imagine peppers so hot they make you jump.",
  },
  {
    english: "The Corn (with toppings)",
    spanish: "El Elote",
    mnemonic:
      "Elote sounds like 'ee-lot' - think of eating a lot of corn with toppings.",
  },
  {
    english: "The Corn (with toppings in a cup)",
    spanish: "Esquite",
    mnemonic:
      "Esquite sounds like 'es-wheat' - imagine corn that's as sweet as wheat.",
  },
  {
    english: "The Corn",
    spanish: "El Maíz",
    mnemonic:
      "Maíz sounds like 'my ease' - picture corn growing with ease in a maze.",
  },
  {
    english: "The Mushrooms (MX)",
    spanish: "Los Champiñones",
    mnemonic:
      "Champiñones sounds like 'champ-in-yones' - imagine champion mushrooms.",
  },
  {
    english: "The Mushrooms (ES)",
    spanish: "Las Setas",
    mnemonic:
      "Setas sounds like 'set-as' - think of mushrooms set as decorations.",
  },
  {
    english: "The Cucumber",
    spanish: "El Pepino",
    mnemonic:
      "Pepino sounds like 'pep-in-o' - imagine a cucumber with extra pep.",
  },
  {
    english: "The Tomato",
    spanish: "El Tomate",
    mnemonic:
      "Tomate sounds like 'toe-mate' - picture a tomato shaped like a toe.",
  },
  {
    english: "The (fried) Potatoes (MX)",
    spanish: "Las Papas (fritas)",
    mnemonic:
      "Papas sounds like 'pa-pas' - imagine your pa passing you french fries.",
  },
  {
    english: "The Potatoes (ES)",
    spanish: "Las Patatas",
    mnemonic: "Patatas contains 'pat' - picture patting potatoes like a drum.",
  },
  {
    english: "The Beans",
    spanish: "Los Frijoles",
    mnemonic:
      "Frijoles sounds like 'free-holes' - imagine beans jumping through free holes.",
  },
  {
    english: "The Lettuce",
    spanish: "La Lechuga",
    mnemonic:
      "Lechuga sounds like 'let-chew-ga' - think of letting someone chew lettuce.",
  },
  {
    english: "The Onions",
    spanish: "Las Cebollas",
    mnemonic:
      "Cebollas sounds like 'see-boy-as' - imagine seeing boys crying while cutting onions.",
  },
  {
    english: "Should do / Must do / Ought to do / To Owe",
    spanish: "Deber",
    mnemonic:
      "Deber sounds like 'the-bear' - picture a bear telling you what you should do.",
  },
  {
    english: "To Have hunger (to be hungry)",
    spanish: "Tener hambre",
    mnemonic:
      "Hambre sounds like 'ham-bray' - imagine being so hungry you bray like a donkey for ham.",
  },
  {
    english: "To Have thirst (to be thirsty)",
    spanish: "Tener sed",
    mnemonic:
      "Tener sed sounds like 'ten-air-said' - picture ten people in hot air saying they're thirsty.",
  },
];

function getJanWeek3Hint(spanish) {
  const word = janWeek3Vocab.find((item) => item.spanish === spanish);
  return word ? word.mnemonic : null;
}

function generateJanWeek3Quiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(janWeek3Vocab.length);
  const correctWord = janWeek3Vocab[randomIndex];
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

  const allOptions = janWeek3Vocab.map((item) => item.spanish);

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
        "janWeek3",
        getJanWeek3Hint
      )
    );
    optionsElement.appendChild(button);
  });

  // Add hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () =>
    showHint(getJanWeek3Hint(correctAnswer))
  );
  questionElement.appendChild(hintButton);

  updateScore();
}

export { generateJanWeek3Quiz };
