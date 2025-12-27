// ===== FOOD DATABASE (File B – Energy only) =====
const foodDatabase = [
    { name: "Chicken (whole)", kcalPerKg: 1650 },
    { name: "Rabbit (whole)", kcalPerKg: 1400 },
    { name: "Goat meat", kcalPerKg: 1200 },
    { name: "Beef (lean)", kcalPerKg: 1100 }
];

// Populate dropdown
const foodSelect = document.getElementById("foodItem");
foodDatabase.forEach(food => {
    const option = document.createElement("option");
    option.value = food.kcalPerKg;
    option.textContent = food.name;
    foodSelect.appendChild(option);
});

// ===== CALCULATION FUNCTIONS =====
function calculateMEC(weightKg, a) {
    return a * Math.pow(weightKg, 0.75);
}

function calculateDiet() {
    const weight = parseFloat(document.getElementById("bodyWeight").value);
    const coeff = parseFloat(document.getElementById("coeff").value);
    const foodKg = parseFloat(document.getElementById("foodAmount").value);
    const kcalPerKg = parseFloat(foodSelect.value);

    if (isNaN(weight) || isNaN(coeff) || isNaN(foodKg)) {
        alert("Please fill all fields correctly.");
        return;
    }

    const mec = calculateMEC(weight, coeff);
    const intake = foodKg * kcalPerKg;
    const balance = intake - mec;

    let status = "Balanced";
    if (balance > 200) status = "Surplus";
    if (balance < -200) status = "Deficit";

    document.getElementById("results").innerHTML = `
    <strong>MEC:</strong> ${mec.toFixed(1)} kcal/day<br>
    <strong>Energy Intake:</strong> ${intake.toFixed(1)} kcal<br>
    <strong>Energy Balance:</strong> ${balance.toFixed(1)} kcal<br>
    <strong>Status:</strong> ${status}
  `;
}
