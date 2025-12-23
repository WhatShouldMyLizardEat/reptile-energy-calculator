function calculateNutrition() {

  console.log("Calculate button clicked");

  /* =====================
     INPUTS
     ===================== */

  const bodyWeight = parseFloat(document.getElementById("bodyWeight").value);
  const prey = document.getElementById("prey").value;

  if (!bodyWeight || bodyWeight <= 0) {
    alert("Please enter a valid body weight.");
    return;
  }

  let totalGrams = 0;
  document.querySelectorAll(".weekIntake").forEach(input => {
    totalGrams += parseFloat(input.value) || 0;
  });

  if (totalGrams <= 0) {
    alert("Please enter weekly prey amounts.");
    return;
  }

  /* =====================
     PREY VALUES (AVERAGE)
     ===================== */

  const preyData = {
    rat:     { kcal: 2.5, protein: 0.22, fat: 0.08, ca: 6.0, p: 5.0 },
    chicken:{ kcal: 2.0, protein: 0.20, fat: 0.10, ca: 4.0, p: 4.5 },
    goat:   { kcal: 2.2, protein: 0.21, fat: 0.09, ca: 7.0, p: 6.0 },
    deer:   { kcal: 2.3, protein: 0.22, fat: 0.07, ca: 6.5, p: 5.5 }
  };

  const data = preyData[prey];

  /* =====================
     INTAKE CALCULATIONS
     ===================== */

  const energyIntake = totalGrams * data.kcal;
  const protein = totalGrams * data.protein;
  const fat = totalGrams * data.fat;
  const calcium = totalGrams * data.ca;
  const phosphorus = totalGrams * data.p;
  const caPRatio = calcium / phosphorus;

  /* =====================
     ENERGY REQUIREMENT
     ===================== */

  const energyReqWeek = 40 * Math.pow(bodyWeight, 0.75) * 7;
  const energyBalance = (energyIntake / energyReqWeek) * 100;

  /* =====================
     DISPLAY RESULTS
     ===================== */

  document.getElementById("energyIntake").innerText =
    energyIntake.toFixed(0) + " kcal / week";

  document.getElementById("energyReq").innerText =
    energyReqWeek.toFixed(0) + " kcal / week";

  document.getElementById("energyBalance").innerText =
    energyBalance.toFixed(0) + "%";

  document.getElementById("protein").innerText =
    protein.toFixed(0) + " g";

  document.getElementById("fat").innerText =
    fat.toFixed(0) + " g";

  document.getElementById("calcium").innerText =
    calcium.toFixed(0) + " mg";

  document.getElementById("phosphorus").innerText =
    phosphorus.toFixed(0) + " mg";

  document.getElementById("capRatio").innerText =
    caPRatio.toFixed(2) + " : 1";

  /* =====================
     INTERPRETATION
     ===================== */

  let energyNote = "";
  if (energyBalance < 90) {
    energyNote = "⚠️ Energy intake is BELOW estimated maintenance.";
  } else if (energyBalance <= 110) {
    energyNote = "✅ Energy intake is within maintenance range.";
  } else {
    energyNote = "⚠️ Energy intake is ABOVE maintenance — monitor body condition.";
  }

  let capNote = "";
  if (caPRatio >= 1 && caPRatio <= 2) {
    capNote = "✅ Ca:P ratio is within recommended range.";
  } else {
    capNote = "⚠️ Ca:P ratio is outside recommended range (1–2 : 1).";
  }

  document.getElementById("energyNote").innerText = energyNote;
  document.getElementById("capNote").innerText = capNote;

  document.getElementById("resultsSection").style.display = "block";
}
