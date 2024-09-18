import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const numbersAndPhrases = [
  {
    english: "0",
    spanish: "cero",
    mnemonic:
      "Imagine a superhero named 'Captain Cero' with a big zero on his chest.",
  },
  {
    english: "1",
    spanish: "uno",
    mnemonic: "Think of a unicorn with one horn saying 'Uno!'",
  },
  {
    english: "2",
    spanish: "dos",
    mnemonic:
      "Picture two dogs playing with a frisbee that looks like the number 2.",
  },
  {
    english: "3",
    spanish: "tres",
    mnemonic: "Imagine three trees growing in the shape of the number 3.",
  },
  {
    english: "4",
    spanish: "cuatro",
    mnemonic:
      "Think of four cats rowing a boat, saying 'cua-tro' with each stroke.",
  },
  {
    english: "5",
    spanish: "cinco",
    mnemonic: "Picture five monkeys doing a high-five and shouting 'Cinco!'",
  },
  {
    english: "6",
    spanish: "seis",
    mnemonic:
      "Imagine six snakes forming the shape of the number 6 and hissing 'Seis!'",
  },
  {
    english: "7",
    spanish: "siete",
    mnemonic:
      "Think of seven astronauts on a spaceship shaped like the number 7.",
  },
  {
    english: "8",
    spanish: "ocho",
    mnemonic: "Picture eight octopuses juggling soccer balls, shouting 'Ocho!'",
  },
  {
    english: "9",
    spanish: "nueve",
    mnemonic: "Imagine nine new superheroes forming the shape of the number 9.",
  },
  {
    english: "10",
    spanish: "diez",
    mnemonic: "Think of ten dinosaurs lined up to form the number 10.",
  },
  {
    english: "11",
    spanish: "once",
    mnemonic: "Picture eleven elves on a clock, pointing to 11 o'clock.",
  },
  {
    english: "12",
    spanish: "doce",
    mnemonic: "Imagine twelve ducks in a row, quacking 'Doce! Doce!'",
  },
  {
    english: "13",
    spanish: "trece",
    mnemonic: "Think of thirteen trees forming a spooky forest maze.",
  },
  {
    english: "14",
    spanish: "catorce",
    mnemonic: "Picture fourteen cats orbiting around a giant ball of yarn.",
  },
  {
    english: "15",
    spanish: "quince",
    mnemonic: "Imagine fifteen queens having a tea party with quince jam.",
  },
  {
    english: "16",
    spanish: "dieciséis",
    mnemonic:
      "Think of sixteen superheroes saving the day, shouting 'Dieciséis!'",
  },
  {
    english: "17",
    spanish: "diecisiete",
    mnemonic:
      "Picture seventeen sea turtles swimming in the shape of the number 17.",
  },
  {
    english: "18",
    spanish: "dieciocho",
    mnemonic:
      "Imagine eighteen acrobats forming a human pyramid in the shape of 18.",
  },
  {
    english: "19",
    spanish: "diecinueve",
    mnemonic:
      "Think of nineteen knights guarding a castle shaped like the number 19.",
  },
  {
    english: "20",
    spanish: "veinte",
    mnemonic:
      "Picture twenty vampires at a party, with fangs shaped like the letter V.",
  },
  {
    english: "30",
    spanish: "treinta",
    mnemonic: "Imagine thirty trains lined up to form the number 30.",
  },
  {
    english: "40",
    spanish: "cuarenta",
    mnemonic:
      "Think of forty quarterbacks throwing footballs shaped like the number 40.",
  },
  {
    english: "50",
    spanish: "cincuenta",
    mnemonic:
      "Picture fifty firefighters forming a human chain in the shape of 50.",
  },
  {
    english: "60",
    spanish: "sesenta",
    mnemonic:
      "Imagine sixty surfers riding a giant wave shaped like the number 60.",
  },
  {
    english: "70",
    spanish: "setenta",
    mnemonic: "Think of seventy scientists in a lab shaped like the number 70.",
  },
  {
    english: "80",
    spanish: "ochenta",
    mnemonic:
      "Picture eighty astronauts floating in space to form the number 80.",
  },
  {
    english: "90",
    spanish: "noventa",
    mnemonic: "Imagine ninety ninjas jumping to form the shape of 90.",
  },
  {
    english: "100",
    spanish: "cien",
    mnemonic:
      "Think of one hundred superheroes standing in formation to make '100'.",
  },
  {
    english: "plus",
    spanish: "más",
    mnemonic: "Picture a giant plus sign made of colorful building blocks.",
  },
  {
    english: "is",
    spanish: "es",
    mnemonic: "Imagine the letters 'ES' written in glowing neon lights.",
  },
  {
    english: "minus",
    spanish: "menos",
    mnemonic:
      "Think of a video game character losing power, with 'MENOS' flashing.",
  },
  {
    english: "times",
    spanish: "por",
    mnemonic:
      "Picture a magician pulling rabbits out of a hat, saying 'Por!' each time.",
  },
  {
    english: "divided by",
    spanish: "dividido por",
    mnemonic:
      "Imagine a pizza being divided among friends, each slice saying 'Dividido por!'",
  },
  {
    english: "How old are you?",
    spanish: "¿Cuántos años tienes?",
    mnemonic:
      "Picture a curious alien asking your age with 'Cuántos años tienes?' in a speech bubble.",
  },
  {
    english: "I am 13 years old",
    spanish: "Tengo 13 años",
    mnemonic:
      "Imagine a birthday cake with 13 candles, each one saying 'Tengo un año!'",
  },
  {
    english: "more",
    spanish: "más",
    mnemonic:
      "Think of a hungry kid asking for 'Más!' ice cream with a big scoop on top.",
  },
];

function getNumberOrPhraseHint(spanish) {
  const item = numbersAndPhrases.find((item) => item.spanish === spanish);
  return item ? item.mnemonic : null;
}

function generateNumbersQuiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(numbersAndPhrases.length);
  const correctItem = numbersAndPhrases[randomIndex];
  const question = `What is Spanish for "${correctItem.english}"?`;
  const correctAnswer = correctItem.spanish;

  questionElement.innerHTML = "";

  // Create or get the gif container
  createOrGetGifContainer();

  const questionText = document.createElement("div");
  questionText.textContent = question;
  questionText.className = "text-xl";
  questionElement.appendChild(questionText);

  const options = new Set();
  options.add(correctAnswer);

  const allOptions = numbersAndPhrases.map((item) => item.spanish);

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
      handleOptionClick(
        button,
        option,
        correctAnswer,
        "numbers",
        getNumberOrPhraseHint
      )
    );
    optionsElement.appendChild(button);
  });

  // Update hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () => showHint(correctItem.mnemonic));
  optionsElement.appendChild(hintButton);

  updateScore();
}

export { generateNumbersQuiz };
