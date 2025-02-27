import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const febWeek4Vocab = [
  {
    english: "The Time / The Half (of a sports game)",
    spanish: "El Tiempo",
    mnemonic:
      "Tiempo sounds like 'temp-o' - think of the temporary time a sports half lasts.",
  },
  {
    english: "The Soccer Player",
    spanish: "El/La Futbolista",
    mnemonic:
      "Futbolista contains 'futbol' (soccer) - just add 'ista' for the player!",
  },
  {
    english: "The Lacrosse Stick",
    spanish: "El Palo de Lacrosse",
    mnemonic: "Palo means 'stick' - imagine a pal holding a lacrosse stick.",
  },
  {
    english: "The Baseball Player",
    spanish: "El Beisbolista",
    mnemonic:
      "Beisbolista contains 'beisbol' (baseball) - just add 'ista' for the player!",
  },
  {
    english: "The Batter",
    spanish: "El/La Bateador/a",
    mnemonic: "Bateador contains 'bate' (bat) - the person who uses the bat.",
  },
  {
    english: "To Bat",
    spanish: "Batear",
    mnemonic:
      "Batear sounds like 'bat-air' - imagine swinging a bat through the air.",
  },
  {
    english: "The Bat",
    spanish: "El Bate",
    mnemonic: "Bate sounds like 'bat' - just add a Spanish accent!",
  },
  {
    english: "The Pitcher",
    spanish: "El/La Pícher",
    mnemonic: "Pícher sounds like 'pitcher' - just add Spanish pronunciation!",
  },
  {
    english: "The Outfielder (Gardener)",
    spanish: "El/La Jardinero/a",
    mnemonic:
      "Jardinero means 'gardener' - imagine an outfielder gardening in the outfield.",
  },
  {
    english: "To Trap / Catch",
    spanish: "Atrapar",
    mnemonic:
      "Atrapar contains 'trap' - imagine trapping a ball in your glove.",
  },
  {
    english: "The Glove",
    spanish: "El Guante",
    mnemonic:
      "Guante sounds like 'want' - imagine wanting a glove to catch the ball.",
  },
  {
    english: "The Base",
    spanish: "La Base",
    mnemonic:
      "Base is the same in both languages - just add Spanish pronunciation!",
  },
  {
    english: "The Home Run",
    spanish: "El Jonrón",
    mnemonic:
      "Jonrón sounds like 'home run' with a Spanish accent - picture John running home!",
  },
  {
    english: "The Pool",
    spanish: "La Piscina",
    mnemonic:
      "Piscina sounds like 'piss-scene-a' - imagine a scene at a swimming pool.",
  },
  {
    english: "The Basket",
    spanish: "El Cesto",
    mnemonic:
      "Cesto sounds like 'chest-o' - imagine a basket attached to your chest.",
  },
  {
    english: "To Make a Basket",
    spanish: "Encestar",
    mnemonic:
      "Encestar contains 'cesto' (basket) - picture the ball entering the basket.",
  },
  {
    english: "The Racket",
    spanish: "La Raqueta",
    mnemonic: "Raqueta sounds like 'racket' - just add Spanish pronunciation!",
  },
  {
    english: "Singles (tennis)",
    spanish: "Individuales",
    mnemonic:
      "Individuales contains 'individual' - think of individual (singles) tennis players.",
  },
  {
    english: "Doubles (tennis)",
    spanish: "Dobles",
    mnemonic: "Dobles sounds like 'doubles' - easy to remember!",
  },
  {
    english: "From above / Over (the net)",
    spanish: "Por encima de",
    mnemonic:
      "Por encima de contains 'encima' (on top) - picture hitting over the top of the net.",
  },
  {
    english: "The Track / Trail",
    spanish: "La Pista",
    mnemonic:
      "Pista sounds like 'piste' (ski trail) - imagine athletes racing on a track.",
  },
  {
    english: "The Ball (filled with air) (basketball / soccer / volleyball)",
    spanish: "El Balón",
    mnemonic:
      "Balón sounds like 'balloon' - imagine an air-filled ball like a balloon.",
  },
  {
    english: "The Ball (baseball or tennis)",
    spanish: "La Pelota",
    mnemonic: "Pelota contains 'pel' - picture peeling a tennis ball.",
  },
  {
    english: "The Softball ball",
    spanish: "La Bola de Sóftbol",
    mnemonic: "Bola de Sóftbol - imagine a bowl (bola) containing a softball.",
  },
  {
    english:
      "The (soccer / baseball / softball / lacrosse / track and field) Field",
    spanish: "El Campo de (fútbol / béisbol / sóftbol / lacrosse / atletismo)",
    mnemonic: "Campo sounds like 'camp' - imagine camping on a sports field.",
  },
  {
    english: "The Court (basketball / tennis / volleyball)",
    spanish: "La Cancha",
    mnemonic:
      "Cancha sounds like 'can-cha-cha' - imagine doing the cha-cha on a basketball court.",
  },
  {
    english: "The Net",
    spanish: "La Red",
    mnemonic: "Red sounds like 'red' - picture a bright red volleyball net.",
  },
  {
    english: "The Goalie / Goalkeeper",
    spanish: "El/La Portero/a",
    mnemonic:
      "Portero contains 'porter' - imagine a doorman (porter) guarding the goal.",
  },
  {
    english: "Goal (physical, with net)",
    spanish: "La Portería",
    mnemonic:
      "Portería sounds like 'port-area' - think of a port area where goals are shipped in.",
  },
  {
    english: "A goal",
    spanish: "Un gol",
    mnemonic:
      "Gol sounds like 'goal' - just say it with Spanish pronunciation!",
  },
  {
    english: "To Score a goal",
    spanish: "Meter un gol",
    mnemonic:
      "Meter sounds like 'meet-a' - imagine meeting a goal by scoring it.",
  },
  {
    english: "The Race",
    spanish: "La Carrera",
    mnemonic:
      "Carrera sounds like 'car-era' - picture an era when cars race against each other.",
  },
  {
    english: "To Practice",
    spanish: "Practicar",
    mnemonic:
      "Practicar sounds like 'practice-ar' - just add 'ar' to practice!",
  },
  {
    english: "The Practice",
    spanish: "La Práctica",
    mnemonic:
      "Práctica sounds like 'practice-a' - imagine a practice session with an 'A' grade.",
  },
  {
    english: "To Kick",
    spanish: "Patear",
    mnemonic:
      "Patear contains 'pat' - imagine patting your foot before kicking.",
  },
  {
    english: "To Touch / To Play an instrument",
    spanish: "Tocar",
    mnemonic:
      "Tocar sounds like 'to-car' - think of touching a car or playing music in a car.",
  },
  {
    english: "To Guard / Save",
    spanish: "Guardar",
    mnemonic: "Guardar sounds like 'guard-ar' - just add 'ar' to guard!",
  },
  {
    english: "To Block",
    spanish: "Bloquear",
    mnemonic:
      "Bloquear sounds like 'block-ear' - imagine blocking your ears from noise.",
  },
  {
    english: "To Run",
    spanish: "Correr",
    mnemonic:
      "Correr sounds like 'courier' - think of a courier running to deliver packages.",
  },
  {
    english: "To Pass",
    spanish: "Pasar",
    mnemonic: "Pasar sounds like 'pass-ar' - just add 'ar' to pass!",
  },
  {
    english: "To Throw",
    spanish: "Lanzar",
    mnemonic:
      "Lanzar sounds like 'lance-ar' - imagine throwing a lance like a javelin.",
  },
  {
    english: "To Toss / Shoot",
    spanish: "Tirar",
    mnemonic:
      "Tirar sounds like 'tear-ar' - picture tearing paper and tossing it.",
  },
  {
    english: "To Dribble (with)",
    spanish: "Driblar (con)",
    mnemonic:
      "Driblar sounds like 'dribble-ar' - just add Spanish flair to 'dribble'!",
  },
  {
    english: "To Hit",
    spanish: "Golpear",
    mnemonic:
      "Golpear sounds like 'goal-pear' - imagine hitting a pear into a goal.",
  },
  {
    english: "To Win",
    spanish: "Ganar",
    mnemonic:
      "Ganar sounds like 'gain-ar' - think of gaining a victory when you win.",
  },
  {
    english: "To be Pleasing",
    spanish: "Gustar",
    mnemonic:
      "Gustar contains 'gust' - imagine a pleasing gust of wind that you like.",
  },
  {
    english: "To be Enchanting",
    spanish: "Encantar",
    mnemonic: "Encantar contains 'enchant' - just add 'ar' to enchant!",
  },
  {
    english: "To be Interesting",
    spanish: "Interesar",
    mnemonic:
      "Interesar sounds like 'interest-ar' - just add 'ar' to interest!",
  },
  {
    english: "To be Boring",
    spanish: "Aburrir",
    mnemonic:
      "Aburrir sounds like 'a-bore-ear' - imagine a boring sound boring into your ear.",
  },
  {
    english: "To Dance",
    spanish: "Bailar",
    mnemonic:
      "Bailar sounds like 'by-lar' - picture saying 'bye' to your worries while dancing.",
  },
  {
    english: "The Male Dancer",
    spanish: "El Bailarín",
    mnemonic:
      "Bailarín sounds like 'bail-a-ring' - imagine a male dancer bailing out of a dance ring.",
  },
  {
    english: "The Female Dancer",
    spanish: "La Bailarina",
    mnemonic:
      "Bailarina sounds like 'bail-a-rina' - think of a ballerina who dances in an arena.",
  },
];

function getFebWeek4Hint(spanish) {
  const word = febWeek4Vocab.find((item) => item.spanish === spanish);
  return word ? word.mnemonic : null;
}

function generateFebWeek4Quiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(febWeek4Vocab.length);
  const correctWord = febWeek4Vocab[randomIndex];
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

  const allOptions = febWeek4Vocab.map((item) => item.spanish);

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
        "febWeek4",
        getFebWeek4Hint
      )
    );
    optionsElement.appendChild(button);
  });

  // Add hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () =>
    showHint(getFebWeek4Hint(correctAnswer))
  );
  questionElement.appendChild(hintButton);

  updateScore();
}

export { generateFebWeek4Quiz };
