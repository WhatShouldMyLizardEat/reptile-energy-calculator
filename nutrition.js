function calculateNutrition() {

  /* ==============================
     INPUTS
     ============================== */

  const bodyWeight = parseFloat(document.getElementById("bodyWeight").value);

  if (!bodyWeight || bodyWeight <= 0) {
    alert("Please enter a valid body weight.");
    return;
  }

  let totalGrams = 0;
  document.querySelectorAll(".weekIntake").forEach(input => {
    totalGrams += parseFloat(input.value) || 0;
  });

  if (totalGrams <= 0) {
    alert("Please enter weekly food amounts.");
    return;
  }

  /* ==============================
     CONSTANTS (whole prey averages)
     ============================== */

  const ENERGY_PER_GRAM = 2.0;     // kcal/g
  const PROTEIN_PER_GRAM = 0.22;
  const FAT_PER_GRAM = 0.08;
  const CALCIUM_PER_GRAM = 6.25;   // mg/g
  const PHOSPHORUS_PER_GRAM = 5.0; // mg/g

  /* ==============================
     INTAKE CALCULATIONS
     ============================== */

  const energyIntakeWeek = totalGrams * ENERGY_PER_GRAM;
  const proteinWeek = totalGrams * PROTEIN_PER_GRAM;
  const fatWeek = totalGrams * FAT_PER_GRAM;
  const calciumWeek = totalGrams * CALCIUM_PER_GRAM;
  const phosphorusWeek = totalGrams * PHOSPHORUS_PER_GRAM;
  const caPRatio = calciumWeek / phosphorusWeek;

  /* ==============================
     ENERGY REQUIREMENT
     ============================== */

  const energyReqDay = 40 * Math.pow(bodyWeight, 0.75);
  const energyReqWeek = energyReqDay * 7;

  const energyBalancePercent =
    (energyIntakeWeek / energyReqWeek) * 100;

  /* ==============================
     DISPLAY VALUES
     ============================== */

  document.getElementById("energy").innerText =
    energyIntakeWeek.toFixed(0) + " kcal / week";

  document.getElementById("energyReq").innerText =
    energyReqWeek.toFixed(0) + " kcal / week";

  document.getElementById("energyBalance").innerText =
    energyBalancePercent.toFixed(0) + "% of requirement";

  document.getElementById("protein").innerText =
    proteinWeek.toFixed(0) + " g";

  document.getElementById("fat").innerText =
    fatWeek.toFixed(0) + " g";

  document.getElementById("calcium").innerText =
    calciumWeek.toFixed(0) + " mg";

  document.getElementById("phosphorus").innerText =
    phosphorusWeek.toFixed(0) + " mg";

  document.getElementById("capRatio").innerText =
    caPRatio.toFixed(2) + " : 1";

  /* ==============================
     INTERPRETATION
     ============================== */

  let energyNote = "";

  if (energyBalancePercent < 90) {
    energyNote = "⚠️ Energy intake is BELOW estimated maintenance.";
  } else if (energyBalancePercent <= 110) {
    energyNote = "✅ Energy intake is within maintenance range.";
  } else {
    energyNote = "⚠️ Energy intake is ABOVE maintenance (monitor body condition).";
  }

  document.getElementById("energyNote").innerText = energyNote;

  let capNote = "";
  if (caPRatio >= 1.0 && caPRatio <= 2.0) {
    capNote = "✅ Ca:P ratio is within recommended range for Komodo dragons.";
  } else {
    capNote = "⚠️ Ca:P ratio is outside recommended range (1–2 : 1).";
  }

  document.getElementById("capNote").innerText = capNote;

  document.getElementById("nutrientTable").style.display = "table";
}
