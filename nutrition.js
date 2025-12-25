function calculateNutrition() {

  const prey = document.getElementById("prey").value;
  const weekInputs = document.querySelectorAll(".weekIntake");
  const bodyWeight = Number(document.getElementById("bodyWeight").value);

  let totalIntake = 0;
  weekInputs.forEach(input => {
    totalIntake += Number(input.value) || 0;
  });

  if (totalIntake <= 0) {
    alert("Please enter prey amounts for at least one week.");
    return;
  }

  if (isNaN(bodyWeight) || bodyWeight <= 0) {
    alert("Please enter a valid body weight.");
    return;
  }

  // Average nutrient + energy values per gram of prey
  const nutrientData = {
    rat: { protein: 0.18, fat: 0.15, calcium: 15, phosphorus: 20, energy: 2.5 },
    chicken: { protein: 0.20, fat: 0.10, calcium: 12, phosphorus: 18, energy: 1.6 },
    goat: { protein: 0.22, fat: 0.08, calcium: 25, phosphorus: 20, energy: 2.0 },
    deer: { protein: 0.23, fat: 0.06, calcium: 28, phosphorus: 22, energy: 1.9 }
  };

  const n = nutrientData[prey];

  const energyIntake = totalIntake * n.energy;
  const protein = totalIntake * n.protein;
  const fat = totalIntake * n.fat;
  const calcium = totalIntake * n.calcium;
  const phosphorus = totalIntake * n.phosphorus;
  const capRatio = calcium / phosphorus;

  document.getElementById("energyIntake").innerText =
    energyIntake.toFixed(0) + " kcal/week";

  document.getElementById("protein").innerText =
    protein.toFixed(0) + " g";

  document.getElementById("fat").innerText =
    fat.toFixed(0) + " g";

  document.getElementById("calcium").innerText =
    calcium.toFixed(0) + " mg";

  document.getElementById("phosphorus").innerText =
    phosphorus.toFixed(0) + " mg";

  document.getElementById("capRatio").innerText =
    capRatio.toFixed(2) + " : 1";

  // === NEW: Calculate and display Estimated Energy Requirement and Energy Balance ===
  // Formula: EER (kcal/week) = 30 × BW(kg)^0.75 × 7
  const energyReq = 30 * Math.pow(bodyWeight, 0.75) * 7;
  document.getElementById("energyReq").innerText =
    energyReq.toFixed(0) + " kcal/week";

  const energyBalance = energyIntake - energyReq;
  let energyNote = "";
  if (energyBalance > 0) {
    energyNote = "🟢 Positive energy balance (" + energyBalance.toFixed(0) + " kcal/week surplus)";
  } else if (energyBalance < 0) {
    energyNote = "🔴 Negative energy balance (" + energyBalance.toFixed(0) + " kcal/week deficit)";
  } else {
    energyNote = "⚪️ Energy balance is exactly at requirement.";
  }
  document.getElementById("energyBalance").innerText =
    energyBalance.toFixed(0) + " kcal/week";
  document.getElementById("energyNote").innerText = energyNote;
  // === END NEW ===

  let note;
  if (capRatio < 1.2) {
    note = "⚠️ Ca:P ratio is LOW — consider more bone or calcium-rich prey.";
  } else if (capRatio > 2.5) {
    note = "ℹ️ Ca:P ratio is HIGH — usually safe but monitor mineral balance.";
  } else {
    note = "✅ Ca:P ratio is within recommended range for Komodo dragons.";
  }

  document.getElementById("capNote").innerText = note;
  document.getElementById("resultsSection").style.display = "block";
}

// Keep applyPreset in global scope
function applyPreset() {
  const preset = document.getElementById("preset").value;
  const inputs = document.querySelectorAll(".weekIntake");

  let values = [0, 0, 0, 0];

  if (preset === "juvenile") {
    // Smaller but frequent feeding
    values = [1500, 1500, 1500, 1500]; // 6 kg / month
  }

  if (preset === "subadult") {
    values = [3000, 0, 3000, 0]; // 6 kg / month, biweekly
  }

  if (preset === "adult") {
    values = [4000, 0, 0, 4000]; // 8 kg / month, low frequency
  }

  inputs.forEach((input, index) => {
    input.value = values[index];
  });
}
