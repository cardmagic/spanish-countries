import {
  getRandomInt,
  showHint,
  handleOptionClick,
  updateScore,
  getQuestionElement,
  getOptionsElement,
  createOrGetGifContainer,
} from "./quizEngine.js";

const countries = [
  {
    name: "Argentina",
    capital: "Buenos Aires",
    mnemonic:
      "Argent-tina: Picture a shiny silver (argent) teacup (tina) filled with good air (Buenos Aires)",
  },
  {
    name: "Bolivia",
    capital: "La Paz",
    mnemonic: "BOLIVia: Imagine a bowl (BOL) full of pez candy (La Paz)",
  },
  {
    name: "Chile",
    capital: "Santiago",
    mnemonic:
      "CHILe: Visualize a Saint with Iago (the bird from Aladdin) eating a chile (CHILE) pepper (Santiago)",
  },
  {
    name: "Colombia",
    capital: "Bogotá",
    mnemonic:
      "CoLOMbia: Picture a giant lollipop (lom) with a bow and arrow (Bogotá) stuck in it",
  },
  {
    name: "Costa Rica",
    capital: "San José",
    mnemonic:
      "Costa Rica: Imagine a coffee costa (coast) where a rich (Rica) man named San José is surfing",
  },
  {
    name: "Cuba",
    capital: "Havana",
    mnemonic: "Cuba: Have a banana (Cuba) with a halo (Havana) on it",
  },
  {
    name: "Dominican Republic",
    capital: "Santo Domingo",
    mnemonic:
      "Dominican: Imagine a domino with a halo (Santo) falling on a Sunday (Domingo)",
  },
  {
    name: "Ecuador",
    capital: "Quito",
    mnemonic:
      "ECUAdor: Visualize an equator line with a mosquito (Quito) buzzing around it",
  },
  {
    name: "El Salvador",
    capital: "San Salvador",
    mnemonic:
      "El Salvador: Picture a savior (Salvador) saving a salad (sal) from falling off a table",
  },
  {
    name: "Equatorial Guinea",
    capital: "Oyala",
    mnemonic:
      "Equatorial Guinea: Imagine a guinea pig balancing on the equator line, yelling 'Oh ya la!'",
  },
  {
    name: "Guatemala",
    capital: "Guatemala City",
    mnemonic:
      "Guatemala: Picture a guava-flavored mala (bad) drink flooding the city",
  },
  {
    name: "Honduras",
    capital: "Tegucigalpa",
    mnemonic:
      "Honduras: Visualize hundreds of Honda cars playing tag with each other (Tegucigalpa)",
  },
  {
    name: "Mexico",
    capital: "Mexico City",
    mnemonic: "Mexico: Imagine a giant taco saying 'Mexi-can!' to a whole city",
  },
  {
    name: "Nicaragua",
    capital: "Managua",
    mnemonic:
      "Nicaragua: Picture a knight named Nick (Nic-aragua) in a canoe saying 'I'm a man in agua!' (Managua)",
  },
  {
    name: "Panama",
    capital: "Panama City",
    mnemonic:
      "Panama: Visualize a giant pan-shaped hat (Panama) covering the entire city",
  },
  {
    name: "Paraguay",
    capital: "Asunción",
    mnemonic:
      "Paraguay: Imagine a pair of guys assuming they can look at the sun, assuming sun (Asunción)",
  },
  {
    name: "Peru",
    capital: "Lima",
    mnemonic:
      "Peru: Picture a kangaroo (Peru) jumping over a giant lime (Lima)",
  },
  {
    name: "Spain",
    capital: "Madrid",
    mnemonic:
      "Spain: Visualize a spinning pain (Spain) turning into a smiling mad rid(er) on a bull",
  },
  {
    name: "Uruguay",
    capital: "Montevideo",
    mnemonic:
      "Uruguay: Imagine you're a guy (Uru-guy) watching a monte (mountain) video in Montevideo",
  },
  {
    name: "Venezuela",
    capital: "Caracas",
    mnemonic:
      "Venezuela: Picture a venezia (Venice) full of cars honking 'Car-acas! Car-acas!'",
  },
];

function getCountryHint(capital) {
  const country = countries.find((c) => c.capital === capital);
  return country ? country.mnemonic : null;
}

function generateCapitalsQuiz() {
  const questionElement = getQuestionElement();
  const optionsElement = getOptionsElement();

  const randomCountryIndex = getRandomInt(countries.length);
  const correctCountry = countries[randomCountryIndex];
  const correctCapital = correctCountry.capital;

  // Clear previous content
  questionElement.innerHTML = "";

  // Create or get the gif container
  createOrGetGifContainer();

  // Add the question text
  const questionText = document.createElement("div");
  questionText.textContent = `What is the capital of ${correctCountry.name}?`;
  questionText.className = "text-xl";
  questionElement.appendChild(questionText);

  const options = new Set();
  options.add(correctCapital);

  while (options.size < 5) {
    const randomOption = countries[getRandomInt(countries.length)].capital;
    options.add(randomOption);
  }

  const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);
  optionsElement.innerHTML = "";

  optionsArray.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "w-full py-2 px-4 option-button text-white rounded";
    button.addEventListener("click", () =>
      handleOptionClick(
        button,
        option,
        correctCapital,
        "countries",
        getCountryHint
      )
    );
    optionsElement.appendChild(button);
  });

  // Update hint button
  const hintButton = document.createElement("button");
  hintButton.textContent = "Show Hint";
  hintButton.className = "mt-4 py-2 px-4 text-white rounded";
  hintButton.addEventListener("click", () => showHint(correctCountry.mnemonic));
  optionsElement.appendChild(hintButton);

  updateScore();
}

export { generateCapitalsQuiz };
