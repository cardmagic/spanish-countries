import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const janWeek4Vocab = [
  {
    english: "Food/Meal",
    spanish: "La Comida",
    mnemonic: "Comida sounds like 'come-eat-a' - imagine coming to eat a meal.",
  },
  {
    english: "Breakfast",
    spanish: "El Desayuno",
    mnemonic:
      "Desayuno sounds like 'day-say-you-know' - the first meal you know each day.",
  },
  {
    english: "Lunch",
    spanish: "El Almuerzo",
    mnemonic:
      "Almuerzo contains 'alm' - imagine giving alms (food) during lunch.",
  },
  {
    english: "Dinner",
    spanish: "La Cena",
    mnemonic:
      "Cena sounds like 'see-nah' - picture seeing your nana at dinner.",
  },
  {
    english: "Snack",
    spanish: "La Merienda",
    mnemonic:
      "Merienda sounds like 'merrier-end-a' - a snack makes your day merrier.",
  },
  {
    english: "Dessert",
    spanish: "El Postre",
    mnemonic: "Postre sounds like 'post-treat' - a treat that comes post-meal.",
  },
  {
    english: "Appetizers/Bar Snacks",
    spanish: "Las Tapas",
    mnemonic: "Tapas sounds like 'top-as' - snacks on top of the bar.",
  },
  {
    english: "(Toasted) Bread",
    spanish: "El Pan (tostado)",
    mnemonic:
      "Pan is like Peter Pan - imagine him toasting bread while flying.",
  },
  {
    english: "Dinner Roll",
    spanish: "El Panecillo",
    mnemonic:
      "Panecillo sounds like 'pansy-yo' - picture a tiny bread roll with a pansy on top.",
  },
  {
    english: "Pancakes",
    spanish: "Los Panqueques",
    mnemonic:
      "Panqueques sounds like 'pan-cake-case' - imagine pancakes in a special case.",
  },
  {
    english: "Butter",
    spanish: "La Mantequilla",
    mnemonic:
      "Mantequilla sounds like 'man-take-key-ya' - imagine a man taking a key to unlock butter.",
  },
  {
    english: "Yogurt",
    spanish: "El Yogur",
    mnemonic: "Yogur is like 'yogurt' without the 't' - easy to remember!",
  },
  {
    english: "Cereal",
    spanish: "El Cereal",
    mnemonic:
      "Cereal is the same in both languages - just add Spanish pronunciation!",
  },
  {
    english: "Egg",
    spanish: "El Huevo",
    mnemonic: "Huevo sounds like 'way-vo' - imagine waving to an egg.",
  },
  {
    english: "Bacon",
    spanish: "El Tocino",
    mnemonic:
      "Tocino sounds like 'toe-see-no' - picture toes saying no to bacon.",
  },
  {
    english: "Sausage",
    spanish: "La Salchicha",
    mnemonic:
      "Salchicha sounds like 'sal-chee-cha' - imagine salt (sal) on your sausage making you say 'chee-cha!'",
  },
  {
    english: "Ham",
    spanish: "El Jamón",
    mnemonic:
      "Jamón sounds like 'ha-moan' - picture ham making you moan 'ha!' in delight.",
  },
  {
    english: "Chicken",
    spanish: "El Pollo",
    mnemonic:
      "Pollo sounds like 'po-yo' - imagine a poor (po) chicken saying 'yo!'",
  },
  {
    english: "Meat",
    spanish: "La Carne",
    mnemonic:
      "Carne sounds like 'car-nay' - imagine a car saying 'nay' to meat.",
  },
  {
    english: "Cheese",
    spanish: "El Queso",
    mnemonic:
      "Queso sounds like 'kay-so' - imagine saying 'So what?' to cheese.",
  },
  {
    english: "Mayonnaise",
    spanish: "La Mayonesa",
    mnemonic:
      "Mayonesa sounds like 'mayo-nest-a' - picture mayo in a bird's nest.",
  },
  {
    english: "Ketchup",
    spanish: "El Cátsup",
    mnemonic:
      "Cátsup sounds like 'cat-soup' - imagine a cat drinking ketchup soup.",
  },
  {
    english: "Mustard",
    spanish: "La Mostaza",
    mnemonic:
      "Mostaza sounds like 'most-jazz-a' - picture the most jazzy mustard.",
  },
  {
    english: "Hamburger",
    spanish: "Una Hamburguesa",
    mnemonic:
      "Hamburguesa sounds like 'ham-bur-gay-sa' - imagine a happy (gay) burger with ham.",
  },
  {
    english: "Sandwich",
    spanish: "El Sándwich",
    mnemonic: "Sándwich is the same - just add Spanish accent!",
  },
  {
    english: "Pasta",
    spanish: "La Pasta",
    mnemonic: "Pasta is the same - just add Spanish pronunciation!",
  },
  {
    english: "Spaghetti",
    spanish: "El Espaguetis",
    mnemonic:
      "Espaguetis sounds like 'es-pa-get-is' - imagine your pa getting spaghetti.",
  },
  {
    english: "Pizza",
    spanish: "La Pizza",
    mnemonic: "Pizza is the same - just add 'La'!",
  },
  {
    english: "Rice",
    spanish: "El Arroz",
    mnemonic: "Arroz sounds like 'a-rose' - imagine rice growing like a rose.",
  },
  {
    english: "Fried Plantain",
    spanish: "Los Tostones",
    mnemonic:
      "Tostones sounds like 'toast-ones' - imagine toasting plantains one by one.",
  },
  {
    english: "Ice Cream",
    spanish: "El Helado",
    mnemonic:
      "Helado sounds like 'hey-lad-o' - imagine saying 'Hey lad!' to ice cream.",
  },
  {
    english: "Cake",
    spanish: "El Pastel / La Torta",
    mnemonic:
      "Pastel sounds like 'past-tell' - imagine telling stories about past cakes.",
  },
  {
    english: "Cookies",
    spanish: "Las Galletas",
    mnemonic:
      "Galletas sounds like 'guy-yet-as' - imagine a guy yet to eat his cookies.",
  },
  {
    english: "Chocolate",
    spanish: "El Chocolate",
    mnemonic: "Chocolate is the same - just add Spanish pronunciation!",
  },
  {
    english: "Soda",
    spanish: "El Refresco",
    mnemonic: "Refresco contains 'refresh' - think of a refreshing soda.",
  },
  {
    english: "Drink",
    spanish: "La Bebida",
    mnemonic:
      "Bebida sounds like 'baby-da' - imagine a baby saying 'da' for drink.",
  },
  {
    english: "(Fruit) Juice",
    spanish: "Un Jugo de (fruta)",
    mnemonic:
      "Jugo sounds like 'who-go' - imagine asking 'Who go(t) the juice?'",
  },
  {
    english: "Milk",
    spanish: "La Leche",
    mnemonic: "Leche sounds like 'lech-ay' - imagine milk making you say 'ay!'",
  },
  {
    english: "Water",
    spanish: "El Agua",
    mnemonic:
      "Agua sounds like 'a-gwa' - imagine saying 'ah' after drinking water.",
  },
  {
    english: "Coffee",
    spanish: "El Café",
    mnemonic: "Café is like 'cafe' - where you drink coffee!",
  },
  {
    english: "(Iced) Tea",
    spanish: "El Té (helado)",
    mnemonic: "Té sounds like 'tay' - imagine taking your tea break.",
  },
  {
    english: "Hot Chocolate",
    spanish: "El Chocolate Caliente",
    mnemonic:
      "Caliente sounds like 'call-ee-en-tay' - imagine calling for hot chocolate.",
  },
  {
    english: "Glass (for drinks)",
    spanish: "El Vaso",
    mnemonic:
      "Vaso sounds like 'vase-o' - picture a vase used as a drinking glass.",
  },
  {
    english: "Cup",
    spanish: "La Taza",
    mnemonic:
      "Taza sounds like 'taz-a' - imagine the Tasmanian Devil spinning with a cup.",
  },
  {
    english: "Vegetarian",
    spanish: "Vegetariano/a",
    mnemonic:
      "Vegetariano sounds like 'vegetarian-o' - just add Spanish ending!",
  },
  {
    english: "Healthy",
    spanish: "Sano/a",
    mnemonic: "Sano sounds like 'sane-o' - being healthy keeps you sane.",
  },
  {
    english: "Hot (temperature)",
    spanish: "Caliente",
    mnemonic:
      "Caliente sounds like 'call-ee-en-tay' - imagine calling out because something's hot.",
  },
  {
    english: "Cold",
    spanish: "Frío/a",
    mnemonic:
      "Frío sounds like 'free-o' - imagine getting free ice when you're cold.",
  },
  {
    english: "Rich/Tasty",
    spanish: "Rico/a",
    mnemonic: "Rico sounds like 'rich-o' - rich food is usually tasty.",
  },
  {
    english: "Delicious",
    spanish: "Delicioso/a",
    mnemonic: "Delicioso is similar to 'delicious' - just add Spanish ending!",
  },
  {
    english: "With",
    spanish: "Con",
    mnemonic: "Con sounds like 'cone' - imagine ice cream with a cone.",
  },
  {
    english: "Without",
    spanish: "Sin",
    mnemonic: "Sin means without - imagine it's a sin to be without something.",
  },
  {
    english: "How + adjective!",
    spanish: "¡Qué + adjetivo!",
    mnemonic:
      "Qué sounds like 'kay' - imagine saying 'K!' in surprise at something.",
  },
];

function getJanWeek4Hint(spanish) {
  const word = janWeek4Vocab.find((item) => item.spanish === spanish);
  return word ? word.mnemonic : null;
}

function generateJanWeek4Quiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomIndex = getRandomInt(janWeek4Vocab.length);
  const correctWord = janWeek4Vocab[randomIndex];
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

  const allOptions = janWeek4Vocab.map((item) => item.spanish);

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
        "janWeek4",
        getJanWeek4Hint
      )
    );
    optionsElement.appendChild(button);
  });

  // Add hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () =>
    showHint(getJanWeek4Hint(correctAnswer))
  );
  questionElement.appendChild(hintButton);

  updateScore();
}

export { generateJanWeek4Quiz };
