import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const words = [
  {
    spanish: "árbol",
    pronunciation: "ah",
    english: "tree",
    mnemonic:
      "Imagine a tree that looks like the letter A with branches like a B (árbol).",
  },
  {
    spanish: "balón",
    pronunciation: "beh",
    english: "ball",
    mnemonic:
      "Think of bouncing a ball (balón) that goes 'boing' when it hits the ground.",
  },
  {
    spanish: "celular",
    pronunciation: "seh",
    english: "cell phone",
    mnemonic: "Picture a cell phone that makes a 'cellular' ringing sound.",
  },
  {
    spanish: "chancla",
    pronunciation: "cheh",
    english: "flip-flop",
    mnemonic: "Imagine flip-flops that go 'chan-chan' when you walk.",
  },
  {
    spanish: "dados",
    pronunciation: "deh",
    english: "dice",
    mnemonic: "Think of rolling two dice and saying 'da-dos' as they land.",
  },
  {
    spanish: "elefante",
    pronunciation: "eh",
    english: "elephant",
    mnemonic: "Picture an elephant with ears shaped like the letter E.",
  },
  {
    spanish: "flor",
    pronunciation: "eh-feh",
    english: "flower",
    mnemonic: "Imagine a flower growing on the floor - 'flor' on the floor.",
  },
  {
    spanish: "gelatina",
    pronunciation: "heh",
    english: "jelly",
    mnemonic: "Think of jelly that jiggles and makes you laugh 'heh-heh'.",
  },
  {
    spanish: "hielo",
    pronunciation: "ah-cheh",
    english: "ice",
    mnemonic: "Imagine ice that makes you say 'Ah-choo!' when you touch it.",
  },
  {
    spanish: "isla",
    pronunciation: "ee",
    english: "island",
    mnemonic: "Picture an island shaped like the letters I and A (isla).",
  },
  {
    spanish: "jirafa",
    pronunciation: "hoh-tah",
    english: "giraffe",
    mnemonic: "Imagine a giraffe wearing a giant J as a necklace.",
  },
  {
    spanish: "kiwi",
    pronunciation: "kah",
    english: "kiwi",
    mnemonic: "Think of a kiwi fruit that looks like a hairy key.",
  },
  {
    spanish: "león",
    pronunciation: "eh-leh",
    english: "lion",
    mnemonic: "Picture a lion with a mane shaped like the letter L.",
  },
  {
    spanish: "llave",
    pronunciation: "eh-yeh",
    english: "key",
    mnemonic: "Imagine a key that yells 'Yay!' when it opens a door.",
  },
  {
    spanish: "mariposa",
    pronunciation: "eh-meh",
    english: "butterfly",
    mnemonic:
      "Think of a butterfly that looks like the letter M with colorful wings.",
  },
  {
    spanish: "naranja",
    pronunciation: "eh-neh",
    english: "orange",
    mnemonic: "Picture an orange with a big N painted on it.",
  },
  {
    spanish: "ñandú",
    pronunciation: "eh-nyeh",
    english: "rhea (bird)",
    mnemonic: "Imagine a bird that makes a 'nyah-nyah' sound when it runs.",
  },
  {
    spanish: "oso",
    pronunciation: "oh",
    english: "bear",
    mnemonic: "Think of a bear that says 'Oh!' when it sees honey.",
  },
  {
    spanish: "pingüino",
    pronunciation: "peh",
    english: "penguin",
    mnemonic: "Picture a penguin playing ping-pong with its flippers.",
  },
  {
    spanish: "queso",
    pronunciation: "koo",
    english: "cheese",
    mnemonic: "Imagine cheese that makes you say 'Koo-koo!' when you eat it.",
  },
  {
    spanish: "rana",
    pronunciation: "eh-reh",
    english: "frog",
    mnemonic: "Think of a frog that says 'Rah-nah!' instead of 'ribbit'.",
  },
  {
    spanish: "ferrocarril",
    pronunciation: "eh-reh",
    english: "railway",
    mnemonic:
      "Picture a train made of iron (ferro) running on a car-shaped rail.",
  },
  {
    spanish: "sol",
    pronunciation: "eh-seh",
    english: "sun",
    mnemonic: "Imagine the sun wearing cool SOL-ar sunglasses.",
  },
  {
    spanish: "tortuga",
    pronunciation: "teh",
    english: "turtle",
    mnemonic:
      "Think of a turtle with a tower-shaped shell that goes 'tuga-tuga' as it walks.",
  },
  {
    spanish: "uvas",
    pronunciation: "oo",
    english: "grapes",
    mnemonic: "Picture grapes that make you say 'Ooh-vas!' when you eat them.",
  },
  {
    spanish: "vaca",
    pronunciation: "beh-beh veh",
    english: "cow",
    mnemonic: "Imagine a cow that says 'Va-ca!' instead of 'moo'.",
  },
  {
    spanish: "wifi",
    pronunciation: "eh-kees",
    english: "wifi",
    mnemonic:
      "Think of Wi-Fi signals that look like the letter W flying through the air.",
  },
  {
    spanish: "xilófono",
    pronunciation: "ee-kee-eh-neh-ah",
    english: "xylophone",
    mnemonic:
      "Picture a xylophone with X-shaped keys that you hit with sticks.",
  },
  {
    spanish: "y-grego",
    pronunciation: "seh-tah",
    english: "Y (letter)",
    mnemonic:
      "Imagine the letter Y doing gymnastics and saying 'Yes!' after a flip.",
  },
  {
    spanish: "zapatos",
    pronunciation: "seh-tah",
    english: "shoes",
    mnemonic: "Think of shoes that make a 'zap' sound with each step you take.",
  },
];

function getWordHint(spanish) {
  const word = words.find((item) => item.spanish === spanish);
  return word
    ? `Pronunciation: ${word.pronunciation}\nMnemonic: ${word.mnemonic}`
    : null;
}

function generateWordsQuiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(words.length);
  const correctWord = words[randomIndex];
  const question = `What is the English translation of "${correctWord.spanish}"?`;
  const correctAnswer = correctWord.english;

  questionElement.innerHTML = "";

  // Create or get the gif container
  createOrGetGifContainer();

  const questionText = document.createElement("div");
  questionText.textContent = question;
  questionText.className = "text-xl";
  questionElement.appendChild(questionText);

  const options = new Set();
  options.add(correctAnswer);

  const allOptions = words.map((item) => item.english);

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
      "w-full py-2 px-4 bg-gray-500 option-button text-white rounded";
    button.addEventListener("click", () =>
      handleOptionClick(button, option, correctAnswer, "words", getWordHint)
    );
    optionsElement.appendChild(button);
  });

  // Update hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () =>
    showHint(getWordHint(correctWord.spanish))
  );
  optionsElement.appendChild(hintButton);

  updateScore();
}

export { generateWordsQuiz };
