import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const phrases = [
  {
    english: "Mr.",
    spanish: "Señor (Sr.)",
    mnemonic: "Señor sounds like 'senior' - picture an elderly gentleman.",
  },
  {
    english: "Mrs.",
    spanish: "Señora (Sra.)",
    mnemonic:
      "Señora sounds like 'señor-ah' - imagine a lady saying 'ah' after 'señor'.",
  },
  {
    english: "Ms.",
    spanish: "Señorita (Srta.)",
    mnemonic:
      "Señorita sounds like 'senior-eeta' - think of a young lady saying 'eeta'.",
  },
  {
    english: "Good morning",
    spanish: "Buenos días",
    mnemonic: "Buenos días sounds like 'good days' - imagine a sunny morning.",
  },
  {
    english: "Good afternoon",
    spanish: "Buenas tardes",
    mnemonic:
      "Buenas tardes sounds like 'good tarts' - picture eating tarts in the afternoon.",
  },
  {
    english: "Goodnight",
    spanish: "Buenas noches",
    mnemonic:
      "Buenas noches sounds like 'good notches' - imagine notches on a bedpost.",
  },
  {
    english: "Hello!",
    spanish: "Hola",
    mnemonic:
      "Hola sounds like 'oh la' - picture someone saying 'oh la la' when greeting.",
  },
  {
    english: "Goodbye",
    spanish: "Adiós",
    mnemonic:
      "Adiós sounds like 'ah, Dios' - imagine saying 'ah, God' when parting.",
  },
  {
    english: "Goodbye",
    spanish: "Chao",
    mnemonic:
      "Chao sounds like 'ciao' in Italian - picture an Italian goodbye.",
  },
  {
    english: "See you later",
    spanish: "Hasta luego",
    mnemonic:
      "Hasta luego sounds like 'hasta-la-way-go' - imagine someone hastily leaving.",
  },
  {
    english: "See you soon",
    spanish: "Hasta pronto",
    mnemonic:
      "Hasta pronto sounds like 'hasta-la-pronto' - think of a quick return.",
  },
  {
    english: "See you tomorrow",
    spanish: "Hasta mañana",
    mnemonic: "Mañana means 'tomorrow' - picture the sun rising for a new day.",
  },
  {
    english: "What is your name?",
    spanish: "¿Cómo te llamas?",
    mnemonic:
      "Cómo te llamas sounds like 'come-o-tay ya-mas' - imagine someone coming to yell their name.",
  },
  {
    english: "I call myself",
    spanish: "Me llamo",
    mnemonic:
      "Me llamo sounds like 'may yamo' - picture yourself yelling your name.",
  },
  {
    english: "My name is",
    spanish: "Mi nombre es",
    mnemonic: "Nombre sounds like 'nombre' - think of a name tag.",
  },
  {
    english: "and you? (informal)",
    spanish: "¿y tú?",
    mnemonic:
      "Y tú sounds like 'E-too' - imagine pointing at someone and saying 'E-too?'",
  },
  {
    english: "and you? (formal)",
    spanish: "Usted",
    mnemonic:
      "Usted sounds like 'you-sted' - picture a formal 'you' standing still.",
  },
  {
    english: "It's a pleasure",
    spanish: "Mucho gusto",
    mnemonic:
      "Mucho gusto sounds like 'moo-cho goo-sto' - imagine a cow saying 'goo' with gusto.",
  },
  {
    english: "For me too (equally)",
    spanish: "Igualmente",
    mnemonic:
      "Igualmente sounds like 'eagle-men-tay' - picture an eagle man saying 'tay'.",
  },
  {
    english: "How are you? (informal)",
    spanish: "¿Cómo estás?",
    mnemonic:
      "Cómo estás sounds like 'come-o-estas' - imagine someone coming to ask how you are.",
  },
  {
    english: "How are you? (formal)",
    spanish: "¿Cómo está?",
    mnemonic:
      "Cómo está sounds like 'come-o-esta' - picture a formal version of 'come-o-estas'.",
  },
  {
    english: "I am (really) good",
    spanish: "Estoy (muy) bien",
    mnemonic: "Estoy bien sounds like 'I'm being' - imagine being really good.",
  },
  {
    english: "I am (really) bad",
    spanish: "Estoy (muy) mal",
    mnemonic: "Estoy mal sounds like 'I'm meh' - picture feeling really meh.",
  },
  {
    english: "I am tired",
    spanish: "Estoy cansado",
    mnemonic:
      "Cansado sounds like 'can-sad-o' - imagine being so tired you can't be sad.",
  },
  {
    english: "I am okay (so so)",
    spanish: "Así así",
    mnemonic:
      "Así así sounds like 'ah-see ah-see' - picture someone shrugging and saying 'I see, I see'.",
  },
  {
    english: "(more or less)",
    spanish: "Más o menos",
    mnemonic:
      "Más o menos sounds like 'mass-oh-may-nose' - imagine weighing your nose to see if it's more or less.",
  },
  {
    english: "Please",
    spanish: "Por favor",
    mnemonic:
      "Por favor sounds like 'poor fav-or' - think of doing a favor for the poor.",
  },
  {
    english: "Thank you",
    spanish: "Gracias",
    mnemonic:
      "Gracias sounds like 'gra-see-us' - picture someone graciously saying thanks.",
  },
  {
    english: "You're welcome",
    spanish: "De nada",
    mnemonic:
      "De nada sounds like 'day nada' - imagine saying 'it's nothing' on a sunny day.",
  },
  {
    english: "Excuse me (MX - attention)",
    spanish: "Disculpe",
    mnemonic:
      "Disculpe sounds like 'this-cool-pay' - think of paying attention to something cool.",
  },
  {
    english: "Excuse me (MX - permission)",
    spanish: "Con permiso",
    mnemonic:
      "Con permiso sounds like 'con-per-me-so' - imagine asking permission with a confident 'so'.",
  },
  {
    english: "Excuse me (SP)",
    spanish: "Perdona",
    mnemonic:
      "Perdona sounds like 'per-dona' - think of pardoning someone for donating.",
  },
  {
    english: "I am sorry",
    spanish: "Lo siento",
    mnemonic:
      "Lo siento sounds like 'low see-en-toe' - picture feeling low and seeing your toe, feeling sorry.",
  },
  {
    english: "Can I go to the bathroom?",
    spanish: "¿Puedo ir al baño?",
    mnemonic:
      "Puedo ir al baño sounds like 'pway-doh ear all ban-yo' - imagine a Play-Doh ear in the bathtub.",
  },
  {
    english: "How do you say ... in Spanish?",
    spanish: "¿Cómo se dice ... en español?",
    mnemonic:
      "Cómo se dice sounds like 'como say dee-say' - picture a Spanish-speaking Como (from Cars) saying 'say'.",
  },
  {
    english: "What does ... mean in English?",
    spanish: "¿Qué significa ... en inglés?",
    mnemonic:
      "Qué significa sounds like 'kay sig-knee-fee-ka' - imagine a key signifying something on your knee.",
  },
  {
    english: "I don't understand.",
    spanish: "No entiendo.",
    mnemonic:
      "No entiendo sounds like 'no en-ten-dee-oh' - picture someone saying 'Oh!' when they don't understand ten things.",
  },
  {
    english: "I have a question.",
    spanish: "Yo tengo una pregunta.",
    mnemonic:
      "Tengo una pregunta sounds like 'ten-go oona pray-goon-ta' - imagine ten people going to pray and ask a question.",
  },
  {
    english: "Can you repeat that please?",
    spanish: "¿Puede repetir eso, por favor?",
    mnemonic:
      "Puede repetir sounds like 'pway-day ray-pay-teer' - think of someone paying to hear something repeated.",
  },
  {
    english: "Can I go get a drink of water?",
    spanish: "¿Puedo ir a tomar agua?",
    mnemonic:
      "Puedo ir a tomar agua sounds like 'pway-doh ear ah toe-mar ah-gwa' - imagine a Play-Doh ear drinking water.",
  },
  {
    english: "I can't hear.",
    spanish: "No puedo oír.",
    mnemonic:
      "No puedo oír sounds like 'no pway-doh oh-ear' - picture Play-Doh covering your ears.",
  },
  {
    english: "I can't see.",
    spanish: "No puedo ver.",
    mnemonic:
      "No puedo ver sounds like 'no pway-doh veer' - imagine Play-Doh covering your eyes.",
  },
  {
    english: "Can I borrow a pen/pencil please?",
    spanish: "¿Me presta un bolígrafo/lápiz por favor?",
    mnemonic:
      "Me presta un bolígrafo sounds like 'may press-ta oon bowl-ee-grafo' - picture pressing a bowl-shaped pen.",
  },
  {
    english: "I don't know.",
    spanish: "Yo no sé.",
    mnemonic:
      "Yo no sé sounds like 'yo no say' - imagine someone saying 'Yo!' when they don't know something.",
  },
  {
    english: "I need help.",
    spanish: "Necesito ayuda.",
    mnemonic:
      "Necesito ayuda sounds like 'neh-say-see-toe ah-you-da' - think of saying 'I toe' when you need a hand.",
  },
  {
    english: "Can you speak slower please?",
    spanish: "¿Puede hablar más despacio, por favor?",
    mnemonic:
      "Más despacio sounds like 'mass des-pah-see-oh' - imagine a massive, slow-moving spaceship.",
  },
];

function getPhraseHint(spanish) {
  const phrase = phrases.find((item) => item.spanish === spanish);
  return phrase ? phrase.mnemonic : null;
}

function generatePhrasesQuiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(phrases.length);
  const correctPhrase = phrases[randomIndex];
  const question = `What is Spanish for "${correctPhrase.english}"?`;
  const correctAnswer = correctPhrase.spanish;

  questionElement.innerHTML = "";

  // Create or get the gif container
  createOrGetGifContainer();

  const questionText = document.createElement("div");
  questionText.textContent = question;
  questionText.className = "text-xl";
  questionElement.appendChild(questionText);

  const options = new Set();
  options.add(correctAnswer);

  const allOptions = phrases.map((item) => item.spanish);

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
      "w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700";
    button.addEventListener("click", () =>
      handleOptionClick(button, option, correctAnswer, "phrases", getPhraseHint)
    );
    optionsElement.appendChild(button);
  });

  // Add a hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className =
    "w-full py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-700 mt-2";
  hintButton.addEventListener("click", () => showHint(correctPhrase.mnemonic));
  optionsElement.appendChild(hintButton);

  updateScore();
}

export { generatePhrasesQuiz };
