import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const octWeek4Vocab = [
  {
    english: "The Family",
    spanish: "La Familia",
    mnemonic:
      "Familia sounds like 'family' - picture a happy family having a feast.",
  },
  {
    english: "The Member",
    spanish: "El Miembro",
    mnemonic:
      "Miembro sounds like 'member' - imagine a membership card with 'El' on it.",
  },
  {
    english: "The Relatives",
    spanish: "Los Parientes",
    mnemonic:
      "Parientes sounds like 'parents' - picture all your relatives being parents.",
  },
  {
    english: "The Father/Dad",
    spanish: "El Padre/Papá",
    mnemonic:
      "Padre sounds like 'padre' in 'godfather' - imagine a father figure.",
  },
  {
    english: "The Mother/Mom",
    spanish: "La Madre/Mamá",
    mnemonic:
      "Madre sounds like 'mother' - picture a mother making madeleines.",
  },
  {
    english: "The Parents",
    spanish: "Los Padres/Papás",
    mnemonic:
      "Padres sounds like the 'Padres' baseball team - imagine parents playing baseball.",
  },
  {
    english: "The (only) Child (Son/Daughter)",
    spanish: "El/La Hijo/a (único/a)",
    mnemonic:
      "Hijo sounds like 'he-ho' - imagine an only child playing alone saying 'he-ho'.",
  },
  {
    english: "The Spouse",
    spanish: "El/La Esposo/a",
    mnemonic:
      "Esposo sounds like 'espresso' - picture a couple sharing morning coffee.",
  },
  {
    english: "The Spouse/Married One",
    spanish: "El/La Marido/a",
    mnemonic:
      "Marido sounds like 'married-oh' - imagine someone saying 'oh!' at a wedding.",
  },
  {
    english: "The Stepfather",
    spanish: "El Padrastro",
    mnemonic:
      "Padrastro contains 'padre' + 'astro' - imagine an astronaut who's also a stepfather.",
  },
  {
    english: "The Stepmother",
    spanish: "La Madrastra",
    mnemonic:
      "Madrastra sounds like 'mad-rastro' - think of tracking (rastro) a new mother.",
  },
  {
    english: "The Stepson/daughter",
    spanish: "El/La Hijastro/a",
    mnemonic:
      "Hijastro combines 'hijo' + 'astro' - picture a stepchild dreaming of being an astronaut.",
  },
  {
    english: "The Brother/Sister/Sibling",
    spanish: "El/La Hermano/a",
    mnemonic:
      "Hermano sounds like 'her-man-o' - imagine siblings saying 'O brother!'",
  },
  {
    english: "The Stepbrother/sister",
    spanish: "El/La Hermanastro/a",
    mnemonic:
      "Hermanastro combines 'hermano' + 'astro' - picture stepsiblings stargazing together.",
  },
  {
    english: "The Uncle/Aunt",
    spanish: "El/La Tío/a",
    mnemonic: "Tío sounds like 'tea-oh' - imagine an uncle/aunt serving tea.",
  },
  {
    english: "The Cousin",
    spanish: "El/La Primo/a",
    mnemonic:
      "Primo sounds like 'prime-o' - think of your prime (favorite) cousin.",
  },
  {
    english: "The Nephew/Niece",
    spanish: "El/La Sobrino/a",
    mnemonic: "Sobrino contains 'sob' - picture a crying baby nephew/niece.",
  },
  {
    english: "The Grandfather/mother",
    spanish: "El/La Abuelo/a",
    mnemonic:
      "Abuelo sounds like 'a-boo-elo' - imagine grandparents playing peek-a-boo.",
  },
  {
    english: "The Grandchild",
    spanish: "El/La Nieto/a",
    mnemonic:
      "Nieto sounds like 'neat-o' - picture grandparents saying 'neat-o!' to their grandchild.",
  },
  {
    english: "The Twin",
    spanish: "El/La Gemelo/a",
    mnemonic:
      "Gemelo sounds like 'gem-elo' - imagine twin gems sparkling together.",
  },
  {
    english: "The Pet",
    spanish: "La Mascota",
    mnemonic:
      "Mascota sounds like 'mask-coat-a' - picture a pet wearing a mask and coat.",
  },
  {
    english: "The Dog",
    spanish: "El/La Perro/a",
    mnemonic:
      "Perro sounds like 'pair-oh' - imagine a pair of dogs saying 'oh!'",
  },
  {
    english: "The Cat",
    spanish: "El/La Gato/a",
    mnemonic: "Gato sounds like 'got-o' - think 'I got a cat!'",
  },
  {
    english: "Older",
    spanish: "Mayor",
    mnemonic:
      "Mayor sounds like 'major' - picture someone who's majorly older.",
  },
  {
    english: "Younger",
    spanish: "Menor",
    mnemonic:
      "Menor sounds like 'minor' - think of someone who's still a minor (younger).",
  },
  {
    english: "The Hair",
    spanish: "El Pelo",
    mnemonic:
      "Pelo sounds like 'peel-o' - imagine peeling back layers of hair.",
  },
  {
    english: "Brown",
    spanish: "Castaño",
    mnemonic:
      "Castaño sounds like 'cast-an-yo' - picture casting a brown yo-yo.",
  },
  {
    english: "Blonde",
    spanish: "Rubio",
    mnemonic:
      "Rubio sounds like 'ruby-o' - imagine a blonde person with ruby jewelry.",
  },
  {
    english: "Black",
    spanish: "Negro",
    mnemonic: "Negro is similar to 'necro' - think of the darkness of night.",
  },
  {
    english: "Short",
    spanish: "Corto/a",
    mnemonic: "Corto sounds like 'court-o' - imagine a short court jester.",
  },
  {
    english: "Long",
    spanish: "Largo/a",
    mnemonic:
      "Largo sounds like 'large-o' - picture something largely extended.",
  },
];

function getOctWeek4Hint(spanish) {
  const word = octWeek4Vocab.find((item) => item.spanish === spanish);
  return word ? word.mnemonic : null;
}

function generateOctWeek4Quiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(octWeek4Vocab.length);
  const correctWord = octWeek4Vocab[randomIndex];
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

  const allOptions = octWeek4Vocab.map((item) => item.spanish);

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
        "octWeek4",
        getOctWeek4Hint
      )
    );
    optionsElement.appendChild(button);
  });

  // Add hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () =>
    showHint(getOctWeek4Hint(correctAnswer))
  );
  questionElement.appendChild(hintButton);

  updateScore();
}

export { generateOctWeek4Quiz };
