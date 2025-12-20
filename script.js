function calculateEnergy() {

  // === Get inputs ===
  const weight = parseFloat(document.getElementById("weight").value);
  const temperature = parseFloat(document.getElementById("temperature").value);
  const group = document.getElementById("group").value;
  const prey = document.getElementById("prey").value;

  // === Input validation ===
  if (isNaN(weight) || weight <= 0 || isNaN(temperature)) {
    document.getElementById("result").innerText =
      "Please enter valid weight and temperature values.";
    return;
  }

  // === Base metabolic constant (kcal / kg^0.75 / day) ===
  let a;
  if (group === "monitor") {
    a = 30;   // active varanids
  } else {
    a = 15;   // snakes
  }

  // === Metabolic scaling ===
  const metabolicBase = a * Math.pow(weight, 0.75);

  // === Temperature correction (Q10 model) ===
  const Q10 = 2.0;
  const Tref = 30;
  const tempFactor = Math.pow(Q10, (temperature - Tref) / 10);

  // === Energy calculations ===
  const kcalDay = metabolicBase * tempFactor;
  const kcalWeek = kcalDay * 7;

  // === Prey energy density (kcal per gram) ===
  let kcalPerGram;
  if (prey === "rat") {
    kcalPerGram = 1.6;
  } else if (prey === "mouse") {
    kcalPerGram = 1.4;
  } else if (prey === "chicken") {
    kcalPerGram = 1.2;
  } else {
    kcalPerGram = 1.0; // fish
  }

  // === Convert kcal to food amount ===
  const gramsPerWeek = kcalWeek / kcalPerGram;

  // === Feeding frequency ===
  let feedingsPerWeek;
  if (group === "monitor") {
    feedingsPerWeek = 3;
  } else {
    feedingsPerWeek = 1;
  }

  const gramsPerFeeding = gramsPerWeek / feedingsPerWeek;

  // === Output ===
 document.getElementById("resultTable").style.display = "table";

document.getElementById("kcalDay").innerText =
  `${kcalDay.toFixed(1)} kcal/day`;

document.getElementById("kcalWeek").innerText =
  `${kcalWeek.toFixed(1)} kcal/week`;

document.getElementById("preyWeek").innerText =
  `${preyPerWeek.toFixed(0)} g prey/week`;

document.getElementById("preyFeeding").innerText =
  `${preyPerFeeding.toFixed(0)} g per feeding`;

document.getElementById("feedingFreq").innerText =
  `${feedingsPerWeek} feeding(s) per week`;

