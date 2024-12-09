import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const decWeek2Vocab = [
  {
    english: "The Mobile (Cellphone)",
    spanish: "El Movil",
    mnemonic:
      "Movil sounds like 'mobile' - imagine a mobile phone moving around.",
  },
  {
    english: "The Cellphone",
    spanish: "El Celular",
    mnemonic:
      "Celular sounds like 'cellular' - think of cellular networks connecting phones.",
  },
  {
    english: "The Music",
    spanish: "La Música",
    mnemonic:
      "Música is almost identical to 'music' - just add Spanish pronunciation!",
  },
  {
    english: "The Computer",
    spanish: "La Computadora",
    mnemonic:
      "Computadora contains 'compute' - think of a computer computing numbers.",
  },
  {
    english: "To Return / Go Back",
    spanish: "Regresar",
    mnemonic:
      "Regresar sounds like 're-gress' - imagine going back to an earlier state.",
  },
  {
    english: "To Go in the Bus / Car",
    spanish: "Ir en el bus / carro",
    mnemonic: "Ir en sounds like 'ear in' - picture your ear in a noisy bus.",
  },
  {
    english: "To Go to the Gym",
    spanish: "Ir al gimnasio",
    mnemonic:
      "Gimnasio sounds like 'gym-nasio' - imagine a gym with gymnastics equipment.",
  },
  {
    english: "To Navigate / Surf the (Inter)net",
    spanish: "Navegar la red",
    mnemonic:
      "Navegar sounds like 'navigate' - picture surfing the web like a ship navigating.",
  },
  {
    english: "To Send",
    spanish: "Mandar",
    mnemonic:
      "Mandar sounds like 'man-dar' - imagine a man darting to deliver messages.",
  },
  {
    english: "A Text Message",
    spanish: "Un Mensaje de Texto",
    mnemonic:
      "Mensaje sounds like 'message' - think of text messages as men-sages.",
  },
  {
    english: "An Email",
    spanish: "Un Correo Electrónico",
    mnemonic:
      "Correo sounds like 'courier' - picture an electronic courier delivering emails.",
  },
  {
    english: "A Store",
    spanish: "Una Tienda",
    mnemonic:
      "Tienda sounds like 'tea-end-a' - imagine ending your shopping with tea.",
  },
  {
    english: "An Employee",
    spanish: "Un/a Empleado/a",
    mnemonic: "Empleado contains 'employ' - think of an employed person.",
  },
  {
    english: "The Money",
    spanish: "El Dinero",
    mnemonic:
      "Dinero sounds like 'dean-arrow' - picture an arrow pointing to money.",
  },
  {
    english: "The Cash Register",
    spanish: "La Caja",
    mnemonic: "Caja sounds like 'cash-a' - imagine putting cash in a register.",
  },
  {
    english: "To Work",
    spanish: "Trabajar",
    mnemonic:
      "Trabajar contains 'trabajo' (work) - think of traveling to work.",
  },
  {
    english: "To Need",
    spanish: "Necesitar",
    mnemonic:
      "Necesitar sounds like 'necessary-tar' - imagine needing something necessary.",
  },
  {
    english: "To Search for",
    spanish: "Buscar",
    mnemonic:
      "Buscar sounds like 'bus-car' - picture searching for your bus or car.",
  },
  {
    english: "To Buy",
    spanish: "Comprar",
    mnemonic:
      "Comprar sounds like 'compare' - think of comparing prices before buying.",
  },
  {
    english: "To Pay",
    spanish: "Pagar",
    mnemonic: "Pagar sounds like 'pay-gar' - imagine paying for your car.",
  },
  {
    english: "To Use",
    spanish: "Usar",
    mnemonic: "Usar sounds like 'user' - think of a user using something.",
  },
  {
    english: "What time (hour) is it?",
    spanish: "¿Qué hora es?",
    mnemonic: "Hora sounds like 'hour' - imagine asking what hour it is.",
  },
  {
    english: "It's one o'clock...",
    spanish: "Es la una ...",
    mnemonic: "Una sounds like 'oona' - picture one clock saying 'oona!'",
  },
  {
    english: "It's [≠ 1] o'clock...",
    spanish: "Son las ...",
    mnemonic:
      "Son las sounds like 'sun-lass' - imagine the sun wearing glasses showing time.",
  },
  {
    english: "and a quarter (15 mins)",
    spanish: "y cuarto",
    mnemonic: "Cuarto sounds like 'quarter' - think of a quarter of an hour.",
  },
  {
    english: "and a half (30 mins)",
    spanish: "y media",
    mnemonic: "Media sounds like 'medium' - imagine half is the medium point.",
  },
  {
    english: "minus a quarter (45 mins)",
    spanish: "menos cuarto",
    mnemonic:
      "Menos sounds like 'mean-os' - picture mean numbers subtracting time.",
  },
  {
    english: "in the morning",
    spanish: "por la mañana",
    mnemonic: "Mañana contains 'man' - imagine a man yawning in the morning.",
  },
  {
    english: "in the afternoon",
    spanish: "por la tarde",
    mnemonic:
      "Tarde sounds like 'tardy' - think of being late in the afternoon.",
  },
  {
    english: "at night",
    spanish: "por la noche",
    mnemonic:
      "Noche sounds like 'no-chay' - imagine saying no to staying up late.",
  },
  {
    english: "How much does ... cost?",
    spanish: "¿Cuánto cuesta(n) ... ?",
    mnemonic:
      "Cuesta sounds like 'quest-a' - think of questing for the right price.",
  },
  {
    english: "Before",
    spanish: "Antes de",
    mnemonic:
      "Antes sounds like 'aunties' - picture your aunts arriving before everyone else.",
  },
  {
    english: "During",
    spanish: "Durante",
    mnemonic: "Durante sounds like 'during' - just add Spanish pronunciation!",
  },
  {
    english: "After",
    spanish: "Después de",
    mnemonic:
      "Después sounds like 'the-space' - imagine space coming after everything.",
  },
  {
    english: "Close to",
    spanish: "Cerca de",
    mnemonic:
      "Cerca sounds like 'circle' - imagine drawing a circle close to something.",
  },
  {
    english: "Far from",
    spanish: "Lejos de",
    mnemonic:
      "Lejos sounds like 'lay-hos' - imagine laying something far away.",
  },
  {
    english: "To where ... ?",
    spanish: "¿Adónde ... ?",
    mnemonic:
      "Adónde sounds like 'a-don-day' - picture asking Don where to go.",
  },
  {
    english: "When ... ?",
    spanish: "¿Cuándo ... ?",
    mnemonic:
      "Cuándo sounds like 'when-doe' - imagine a deer asking when something will happen.",
  },
  {
    english: "Why ... ?",
    spanish: "¿Por qué ... ?",
    mnemonic: "Por qué sounds like 'pork-eh' - think of a pig asking 'why?'",
  },
  {
    english: "Because",
    spanish: "Porque",
    mnemonic:
      "Porque sounds like 'pork-eh' - imagine answering the pig's question with 'because'.",
  },
];

function getDecWeek2Hint(spanish) {
  const word = decWeek2Vocab.find((item) => item.spanish === spanish);
  return word ? word.mnemonic : null;
}

function generateDecWeek2Quiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(decWeek2Vocab.length);
  const correctWord = decWeek2Vocab[randomIndex];
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

  const allOptions = decWeek2Vocab.map((item) => item.spanish);

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
        "decWeek2",
        getDecWeek2Hint
      )
    );
    optionsElement.appendChild(button);
  });

  // Add hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () =>
    showHint(getDecWeek2Hint(correctAnswer))
  );
  questionElement.appendChild(hintButton);

  updateScore();
}

export { generateDecWeek2Quiz };
