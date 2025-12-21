function calculateEnergy() {

  // === INPUTS ===
  const weight = parseFloat(document.getElementById("weight").value);
  const temperature = parseFloat(document.getElementById("temperature").value);
  const group = document.getElementById("group").value;
  const prey = document.getElementById("prey").value;

  if (!weight || weight <= 0) {
    alert("Please enter a valid body weight.");
    return;
  }

  // === BASE METABOLIC RATE (kcal/day) ===
  // Simple allometric scaling
  let baseEnergy;

  if (group === "monitor") {
    baseEnergy = 40 * Math.pow(weight, 0.75);
  } else {
    baseEnergy = 30 * Math.pow(weight, 0.75);
  }

  // === TEMPERATURE ADJUSTMENT (Q10 = 2, ref = 30°C) ===
  const tempFactor = Math.pow(2, (temperature - 30) / 10);
  const kcalDay = baseEnergy * tempFactor;
  const kcalWeek = kcalDay * 7;

  // === PREY ENERGY DENSITY (kcal/g) ===
  const preyEnergy = {
    rat: 2.5,
    mouse: 2.3,
    chicken: 1.6,
    fish: 1.4
  };

  const kcalPerGram = preyEnergy[prey];

  // === FEEDING CALCULATIONS ===
  const preyPerWeek = kcalWeek / kcalPerGram;

  let feedingFreq;
  if (group === "monitor") {
    feedingFreq = 2;
  } else {
    feedingFreq = 1;
  }

  const preyPerFeeding = preyPerWeek / feedingFreq;

  // === DISPLAY ENERGY RESULTS ===
  document.getElementById("kcalDay").innerText =
    kcalDay.toFixed(0) + " kcal";

  document.getElementById("kcalWeek").innerText =
    kcalWeek.toFixed(0) + " kcal";

  docu
