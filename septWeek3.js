import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const septWeek3Vocab = [
  {
    english: "young guy",
    spanish: "el muchacho",
    mnemonic: "Much-a-cho(w): Picture a young guy eating a lot of chow",
  },
  {
    english: "young woman",
    spanish: "la muchacha",
    mnemonic: "Moo-cha-cha: Imagine a young woman doing the cha-cha with a cow",
  },
  {
    english: "man",
    spanish: "el hombre",
    mnemonic:
      "Hombre sounds like 'home bro': Picture a man saying 'Welcome home, bro!'",
  },
  {
    english: "woman",
    spanish: "la mujer",
    spanish: "Moo-hair: Visualize a woman with cow-patterned hair",
  },
  {
    english: "boy",
    spanish: "el niño",
    mnemonic:
      "Knee-know: Imagine a little boy pointing to his knee saying 'I know!'",
  },
  {
    english: "girl",
    spanish: "la niña",
    mnemonic: "Ninja: Picture a little girl dressed as a ninja",
  },
  {
    english: "friend",
    spanish: "amigo",
    mnemonic: "A-me-go: Think of saying 'A friend is someone I go to'",
  },
  {
    english: "student",
    spanish: "el alumno",
    mnemonic:
      "A-lum-no: Imagine a student saying 'A lump? No!' when asked if they have homework",
  },
  {
    english: "teacher",
    spanish: "el profesor",
    mnemonic:
      "Pro-fess-or: Think of a teacher as a 'professional confessor' of knowledge",
  },
  {
    english: "good looking",
    spanish: "guapo",
    mnemonic:
      "Guac-po: Picture a good-looking person made entirely of guacamole",
  },
  {
    english: "cute, pretty",
    spanish: "bonito",
    mnemonic: "Bonnie-toe: Imagine a cute toe named Bonnie",
  },
  {
    english: "ugly",
    spanish: "feo",
    mnemonic:
      "Fee-oh: Think of someone saying 'Fee-oh!' in disgust when seeing something ugly",
  },
  {
    english: "brunette, dark skin",
    spanish: "moreno",
    mnemonic:
      "More-eh-no: Picture someone with dark hair saying 'More? Eh, no thanks'",
  },
  {
    english: "blond",
    spanish: "rubio",
    mnemonic: "Rub-ee-oh: Imagine a blond person rubbing a shiny, golden 'O'",
  },
  {
    english: "redhead",
    spanish: "pelirrojo",
    mnemonic: "Peli-rojo: Think 'hairy red' - picture red hair growing rapidly",
  },
  {
    english: "tall",
    spanish: "alto",
    mnemonic: "Alt-o: Visualize pressing the 'Alt' key to make someone taller",
  },
  {
    english: "short",
    spanish: "bajo",
    mnemonic: "Ba-jo: Picture a short person playing a banjo",
  },
  {
    english: "good",
    spanish: "bueno",
    mnemonic:
      "Bwe-no: Imagine someone saying 'Well, no' but it comes out as 'bueno'",
  },
  {
    english: "bad",
    spanish: "malo",
    mnemonic: "Mal-o: Think 'Mal' (bad) + 'oh no!'",
  },
  {
    english: "funny",
    spanish: "cómico",
    mnemonic:
      "Comic-o: Picture a funny comic book character with a big 'O' for a mouth",
  },
  {
    english: "serious",
    spanish: "serio",
    mnemonic: "Seer-io: Imagine a very serious fortune teller (seer) named Rio",
  },
  {
    english: "hard working",
    spanish: "trabajador",
    mnemonic:
      "Tra-ba-ha-door: Visualize someone working hard to install a door made of bars",
  },
  {
    english: "lazy",
    spanish: "perezoso",
    mnemonic: "Per-ez-oso: Picture a lazy bear (oso) named Perez",
  },
  {
    english: "nice, friendly",
    spanish: "simpático",
    mnemonic:
      "Simp-a-tico: Imagine a friendly tickle (tico) making someone smile",
  },
  {
    english: "mean",
    spanish: "antipático",
    mnemonic:
      "Aunty-path-tico: Picture a mean aunt blocking your path, saying 'No tico for you!'",
  },
  {
    english: "intelligent",
    spanish: "inteligente",
    mnemonic:
      "In-tele-gente: Visualize intelligent people inside a TV (tele) being gentle",
  },
  {
    english: "young",
    spanish: "joven",
    mnemonic: "Jo-ven: Think of a young person named Jo in a van",
  },
  {
    english: "who",
    spanish: "quien",
    mnemonic: "Key-en: Imagine a key unlocking the answer to 'Who?'",
  },
  {
    english: "who (plural)",
    spanish: "quienes",
    mnemonic: "Key-en-es: Picture multiple keys unlocking answers to 'Who?'",
  },
  {
    english: "from where",
    spanish: "de dónde",
    mnemonic: "Day-don-day: Imagine asking 'Where is Don?' every day",
  },
  {
    english: "what nationality are you",
    spanish: "de que nacionalidad eres",
    mnemonic:
      "Day-kay-nah-see-on-ali-dad-air-es: Visualize a national 'air' day where your dad flies a kite",
  },
  {
    english: "American",
    spanish: "estadounidense",
    mnemonic:
      "Es-ta-do-uni-dense: Picture a dense crowd of people forming the shape of the United States",
  },
  {
    english: "Puerto Rican",
    spanish: "puertorriqueño",
    mnemonic:
      "Puerto-ree-ken-yo: Imagine a keen surfer named Ken yelling 'Yo!' on a Puerto Rican beach",
  },
];

function getSeptWeek3Hint(spanish) {
  const word = septWeek3Vocab.find((item) => item.spanish === spanish);
  return word ? word.mnemonic : null;
}

function generateSeptWeek3Quiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(septWeek3Vocab.length);
  const correctWord = septWeek3Vocab[randomIndex];
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

  const allOptions = septWeek3Vocab.map((item) => item.spanish);

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
      handleOptionClick(
        button,
        option,
        correctAnswer,
        "septWeek3",
        getSeptWeek3Hint
      )
    );
    optionsElement.appendChild(button);
  });

  updateScore();
}

export { generateSeptWeek3Quiz };
