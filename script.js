function calculateEnergy() {

  const weight = parseFloat(document.getElementById("weight").value);
  const temperature = parseFloat(document.getElementById("temperature").value);
  const group = document.getElementById("group").value;
  const prey = document.getElementById("prey").value;

  if (!weight || weight <= 0) {
    alert("Please enter a valid body weight.");
    return;
  }

  // Base energy
  let baseEnergy = (group === "monitor")
    ? 40 * Math.pow(weight, 0.75)
    : 30 * Math.pow(weight, 0.75);

  // Temperature correction
  const tempFactor = Math.pow(2, (temperature - 30) / 10);
  const kcalDay = baseEnergy * tempFactor;
  const kcalWeek = kcalDay * 7;

  // Prey energy
  const preyEnergy = {
    rat: 2.5,
    mouse: 2.3,
    chicken: 1.6,
    fish: 1.4
  };

  const preyPerWeek = kcalWeek / preyEnergy[prey];
  const feedingFreq = (group === "monitor") ? 2 : 1;
  const preyPerFeeding = preyPerWeek / feedingFreq;

  // Show energy results
  document.getElementById("kcalDay").innerText = kcalDay.toFixed(0) + " kcal";
  document.getElementById("kcalWeek").innerText = kcalWeek.toFixed(0) + " kcal";
  document.getElementById("preyWeek").innerText = preyPerWeek.toFixed(0) + " g";
  document.getElementById("preyFeeding").innerText = preyPerFeeding.toFixed(0) + " g";
  document.getElementById("feedingFreq").innerText = feedingFreq + " × / week";

  document.getElementById("resultsSection").style.display = "block";

  // Nutrients
  const nutrientData = {
    rat: { protein: 16, fat: 10, ca: 240, p: 200 },
    mouse: { protein: 18, fat: 8, ca: 200, p: 180 },
    chicken: { protein: 20, fat: 5, ca: 12, p: 180 },
    fish: { protein: 19, fat: 6, ca: 20, p: 220 }
  };

  const n = nutrientData[prey];

  const protein = n.protein * preyPerWeek / 100;
  const fat = n.fat * preyPerWeek / 100;
  const calcium = n.ca * preyPerWeek / 100;
  const phosphorus = n.p * preyPerWeek / 100;
  const capRatio = calcium / phosphorus;

  document.getElementById("protein").innerText = protein.toFixed(1) + " g";
  document.getElementById("fat").innerText = fat.toFixed(1) + " g";
  document.getElementById("calcium").innerText = calcium.toFixed(0) + " mg";
  document.getElementById("phosphorus").innerText = phosphorus.toFixed(0) + " mg";
  document.getElementById("capRatio").innerText = capRatio.toFixed(2);

  document.getElementById("nutrientTable").style.display = "table";

  document.getElementById("capNote").innerText =
    capRatio < 1 ? "⚠️ Calcium deficient"
    : capRatio <= 2 ? "✅ Calcium balance acceptable"
    : "⚠️ High calcium relative to phosphorus";
}
