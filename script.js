function calculateEnergy() {

  const weight = parseFloat(document.getElementById("weight").value);
  const temperature = parseFloat(document.getElementById("temperature").value);
  const group = document.getElementById("group").value;
  const prey = document.getElementById("prey").value;

  if (isNaN(weight) || weight <= 0) {
    alert("Please enter a valid body weight.");
    return;
  }

  // --- Base metabolic rate (kcal/day) ---
  let baseKcal;

  if (group === "monitor") {
    baseKcal = 70 * Math.pow(weight, 0.75);
  } else {
    baseKcal = 50 * Math.pow(weight, 0.75);
  }

  // --- Temperature correction (Q10 = 2, ref = 30°C) ---
  const tempFactor = Math.pow(2, (temperature - 30) / 10);
  const kcalDay = baseKcal * tempFactor;
  const kcalWeek = kcalDay * 7;

  // --- Prey energy density (kcal per gram) ---
  let preyKcalPerGram;

  switch (prey) {
    case "mouse":
      preyKcalPerGram = 1.5;
      break;
    case "rat":
      preyKcalPerGram = 1.6;
      break;
    case "chicken":
      preyKcalPerGram = 1.3;
      break;
    case "fish":
      preyKcalPerGram = 1.1;
      break;
    default:
      preyKcalPerGram = 1.5;
  }

  const preyPerWeek = kcalWeek / preyKcalPerGram;
const nutrientData = {
  rat:     { protein: 16, fat: 10, ca: 240, p: 200 },
  mouse:   { protein: 18, fat: 8,  ca: 200, p: 180 },
  chicken: { protein: 20, fat: 5,  ca: 12,  p: 180 },
  fish:    { protein: 19, fat: 6,  ca: 20,  p: 220 }
};

  // --- Feeding frequency ---
  let feedingsPerWeek;

  if (group === "monitor") {
    feedingsPerWeek = 3;
  } else {
    feedingsPerWeek = 1;
  }

  const preyPerFeeding = preyPerWeek / feedingsPerWeek;

  // --- Show results ---
  document.getElementById("resultsSection").style.display = "block";

  document.getElementById("kcalDay").innerText =
    kcalDay.toFixed(1) + " kcal/day";

  document.getElementById("kcalWeek").innerText =
    kcalWeek.toFixed(1) + " kcal/week";

  document.getElementById("preyWeek").innerText =
    preyPerWeek.toFixed(0) + " g prey/week";

  document.getElementById("preyFeeding").innerText =
    preyPerFeeding.toFixed(0) + " g per feeding";

  document.getElementById("feedingFreq").innerText =
    feedingsPerWeek + " feeding(s) per week";
}

