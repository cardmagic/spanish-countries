import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const decWeek1Vocab = [
  {
    english: "The Classroom",
    spanish: "El Salón",
    mnemonic:
      "Salón sounds like 'salon' - imagine a classroom styled like a beauty salon.",
  },
  {
    english: "The Student Desk",
    spanish: "El Pupítre",
    mnemonic:
      "Pupítre sounds like 'pup-eat-ray' - picture a puppy eating at a student's desk.",
  },
  {
    english: "A Question",
    spanish: "Una pregunta",
    mnemonic:
      "Pregunta contains 'pregnant' - imagine a question mark pregnant with knowledge.",
  },
  {
    english: "To Ask a Question",
    spanish: "Preguntar",
    mnemonic:
      "Pre-gun-tar - imagine preparing to shoot questions like a gun at tar targets.",
  },
  {
    english: "To Teach / Show",
    spanish: "Enseñar",
    mnemonic:
      "En-señar sounds like 'in-senior' - picture a senior teacher showing something.",
  },
  {
    english: "To Speak / Talk (with)",
    spanish: "Hablar",
    mnemonic:
      "Hablar sounds like 'have-lar' - imagine having a lark while talking.",
  },
  {
    english: "To Study",
    spanish: "Estudiar",
    mnemonic: "Estudiar contains 'study' - just add 'ar' to make it a verb!",
  },
  {
    english: "To Copy",
    spanish: "Copiar",
    mnemonic: "Copiar sounds like 'copy-ar' - just add 'ar' to 'copy'!",
  },
  {
    english: "To Listen",
    spanish: "Escuchar",
    mnemonic:
      "Escuchar sounds like 'es-couch-ar' - imagine listening while sitting on a couch.",
  },
  {
    english: "To Look at / Watch",
    spanish: "Mirar",
    mnemonic: "Mirar sounds like 'mirror-ar' - think of looking in a mirror.",
  },
  {
    english: "To Check / Look through",
    spanish: "Revisar",
    mnemonic: "Revisar contains 'revise' - imagine checking while revising.",
  },
  {
    english: "To Pay / Lend Attention",
    spanish: "Prestar atención",
    mnemonic:
      "Prestar sounds like 'pre-star' - imagine becoming a star by paying attention.",
  },
  {
    english: "To Lift / Raise one's hand",
    spanish: "Levantar la mano",
    mnemonic:
      "Levantar sounds like 'levitate' - picture your hand levitating up.",
  },
  {
    english: "To Answer",
    spanish: "Contestar",
    mnemonic: "Contestar contains 'contest' - imagine answering in a contest.",
  },
  {
    english: "To Take",
    spanish: "Tomar",
    mnemonic: "Tomar sounds like 'to-mar' - imagine taking something to Mars.",
  },
  {
    english: "To Help",
    spanish: "Ayudar",
    mnemonic: "Ayudar sounds like 'aid-ar' - think of giving aid to help.",
  },
  {
    english: "To Walk",
    spanish: "Caminar",
    mnemonic: "Caminar contains 'camino' (path) - imagine walking on a path.",
  },
  {
    english: "To Take Out",
    spanish: "Sacar",
    mnemonic:
      "Sacar sounds like 'sack-ar' - picture taking something out of a sack.",
  },
  {
    english: "To Get a good / bad grade",
    spanish: "Sacar una buena / mala nota",
    mnemonic:
      "Sacar nota - imagine taking (sacar) musical notes (nota) from a report card.",
  },
  {
    english: "To Go",
    spanish: "Ir",
    mnemonic: "Ir is just two letters - as simple as going from I to R.",
  },
  {
    english: "To Give",
    spanish: "Dar",
    mnemonic:
      "Dar sounds like 'dar-t' - imagine throwing darts as you give things.",
  },
  {
    english: "To Be (temporary)",
    spanish: "Estar",
    mnemonic: "Estar contains 'star' - stars are temporary in the morning sky.",
  },
  {
    english: "A backpack",
    spanish: "Una mochila",
    mnemonic:
      "Mochila sounds like 'more-chill-a' - imagine a chill way to carry books.",
  },
  {
    english: "The School Supplies",
    spanish: "Los Materiales Escolares",
    mnemonic: "Materiales sounds like 'materials' - school materials you need.",
  },
  {
    english: "A book",
    spanish: "Un libro",
    mnemonic:
      "Libro sounds like 'lee-bro' - imagine a brother reading (lee) a book.",
  },
  {
    english: "A pen",
    spanish: "Un bolígrafo",
    mnemonic:
      "Bolígrafo sounds like 'bowl-ee-grafo' - picture a pen shaped like a bowl.",
  },
  {
    english: "The Pen / Feather",
    spanish: "La Pluma",
    mnemonic:
      "Pluma sounds like 'plume' - think of writing with a feather plume.",
  },
  {
    english: "A sheet (leaf) of paper",
    spanish: "Una hoja de papel",
    mnemonic:
      "Hoja sounds like 'oh-ha' - imagine saying 'oh-ha!' finding a leaf-shaped paper.",
  },
  {
    english: "A notebook",
    spanish: "Un cuaderno",
    mnemonic:
      "Cuaderno sounds like 'quad-erno' - picture a notebook with four (quad) sections.",
  },
  {
    english: "A pencil",
    spanish: "Un lápiz",
    mnemonic:
      "Lápiz sounds like 'la-peace' - imagine writing peaceful messages with a pencil.",
  },
  {
    english: "The Eraser",
    spanish: "El Borrador",
    mnemonic: "Borrador contains 'borra' (erase) - what you use to erase.",
  },
  {
    english: "The Eraser / 'Rubber'",
    spanish: "La Goma",
    mnemonic:
      "Goma sounds like 'go-ma' - imagine telling mistakes to 'go' with ma's eraser.",
  },
  {
    english: "A calculator",
    spanish: "Una calculadora",
    mnemonic:
      "Calculadora sounds like 'calculate-dora' - picture Dora using a calculator.",
  },
  {
    english: "A folder / binder",
    spanish: "Una carpeta",
    mnemonic:
      "Carpeta sounds like 'car-pet-a' - imagine storing papers in your car's pet carrier.",
  },
  {
    english: "A thing",
    spanish: "Una cosa",
    mnemonic:
      "Cosa sounds like 'cause-a' - everything is a cause of something.",
  },
  {
    english: "The Uniform",
    spanish: "El Uniforme",
    mnemonic:
      "Uniforme is similar to 'uniform' - just say it with Spanish accent!",
  },
  {
    english: "The Pants",
    spanish: "El Pantalón / Los Pantalones",
    mnemonic:
      "Pantalón sounds like 'pant-along' - imagine pants walking along.",
  },
  {
    english: "The Shirt",
    spanish: "La Camisa",
    mnemonic: "Camisa sounds like 'come-ease-a' - a shirt comes with ease.",
  },
  {
    english: "The T-Shirt",
    spanish: "La Camiseta",
    mnemonic:
      "Camiseta contains 'camisa' - it's like a smaller shirt (camisa-eta).",
  },
  {
    english: "The Skirt",
    spanish: "La Falda",
    mnemonic: "Falda sounds like 'fall-da' - imagine a skirt falling down.",
  },
  {
    english: "The Blouse",
    spanish: "La Blusa",
    mnemonic: "Blusa sounds like 'blue-sa' - picture a blue blouse.",
  },
  {
    english: "The Jacket",
    spanish: "La Chaqueta",
    mnemonic:
      "Chaqueta sounds like 'shock-eta' - a jacket that protects from shock.",
  },
  {
    english: "The (Hooded) Sweater",
    spanish: "El Suéter (con capucha)",
    mnemonic: "Suéter sounds like 'sweater' - just say it with Spanish flair!",
  },
  {
    english: "The Sweatshirt",
    spanish: "La Sudadera",
    mnemonic:
      "Sudadera contains 'sudar' (to sweat) - what you wear when sweating.",
  },
  {
    english: "The Shoes",
    spanish: "Los Zapatos",
    mnemonic:
      "Zapatos sounds like 'zap-a-toes' - imagine shoes zapping your toes.",
  },
  {
    english: "To Wear / Carry",
    spanish: "Llevar",
    mnemonic:
      "Llevar sounds like 'yay-var' - say 'yay!' when wearing something new.",
  },
  {
    english: "The School",
    spanish: "La Escuela",
    mnemonic: "Escuela contains 'school' - just add Spanish pronunciation!",
  },
  {
    english: "The Notes",
    spanish: "Los Apuntes",
    mnemonic:
      "Apuntes sounds like 'a-punts' - imagine punting your notes through goalposts.",
  },
  {
    english: "A exam",
    spanish: "Un examen",
    mnemonic: "Examen is similar to 'exam' - just add Spanish pronunciation!",
  },
  {
    english: "A quiz",
    spanish: "Una prueba",
    mnemonic: "Prueba sounds like 'prove-a' - a quiz proves what you know.",
  },
  {
    english: "The Jeans",
    spanish: "Los Jeans",
    mnemonic: "Jeans is the same in Spanish - just add 'Los'!",
  },
];

function getDecWeek1Hint(spanish) {
  const word = decWeek1Vocab.find((item) => item.spanish === spanish);
  return word ? word.mnemonic : null;
}

function generateDecWeek1Quiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(decWeek1Vocab.length);
  const correctWord = decWeek1Vocab[randomIndex];
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

  const allOptions = decWeek1Vocab.map((item) => item.spanish);

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
        "decWeek1",
        getDecWeek1Hint
      )
    );
    optionsElement.appendChild(button);
  });

  // Add hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () =>
    showHint(getDecWeek1Hint(correctAnswer))
  );
  questionElement.appendChild(hintButton);

  updateScore();
}

export { generateDecWeek1Quiz };
