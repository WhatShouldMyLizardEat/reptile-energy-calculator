function calculateEnergy() {

  const weight = parseFloat(document.getElementById("weight").value);
  const temperature = parseFloat(document.getElementById("temperature").value);
  const group = document.getElementById("group").value;
  const prey = document.getElementById("prey").value;

  if (!weight || weight <= 0) {
    alert("Please enter a valid body weight.");
    return;
  }

  /* ===============================
     ANIMAL GROUP DEFINITIONS
     =============================== */

  const animalGroups = {

    monitor: {
      label: "Monitor lizard",
      baseKcal: 40,
      feedingsPerWeek: 2
    },

    komodo: {
      label: "Komodo dragon",
      baseKcal: 45,
      feedingsPerWeek: 1
    },

    large_lizard: {
      label: "Other large lizard",
      baseKcal: 35,
      feedingsPerWeek: 2
    },

    ambush_snake: {
      label: "Ambush snake",
      baseKcal: 28,
      feedingsPerWeek: 1
    },

    active_snake: {
      label: "Active snake",
      baseKcal: 35,
      feedingsPerWeek: 1
    },

    large_snake: {
      label: "Large snake",
      baseKcal: 22,
      feedingsPerWeek: 0.5   // once every 2 weeks
    }
  };

  const animal = animalGroups[group];

  /* ===============================
     BASE ENERGY CALCULATION
     =============================== */

  const baseEnergy =
    animal.baseKcal * Math.pow(weight, 0.75);

  /* ===============================
     TEMPERATURE ADJUSTMENT (Q10 = 2)
     =============================== */

  const tempFactor =
    Math.pow(2, (temperature - 30) / 10);

  const kcalDay = baseEnergy * tempFactor;
  const kcalWeek = kcalDay * 7;

  /* ===============================
     PREY ENERGY DENSITY (kcal/g)
     =============================== */

  const preyEnergy = {
    mouse: 2.3,
    rat: 2.5,
    chicken: 1.6,
    fish: 1.4
  };

  const preyKcal = preyEnergy[prey];

  const preyPerWeek = kcalWeek / preyKcal;
  const preyPerFeeding =
    animal.feedingsPerWeek > 0
      ? preyPerWeek / animal.feedingsPerWeek
      : preyPerWeek;

  /* ===============================
     OUTPUT RESULTS
     =============================== */

  document.getElementById("kcalDay").innerText =
    kcalDay.toFixed(0) + " kcal/day";

  document.getElementById("kcalWeek").innerText =
    kcalWeek.toFixed(0) + " kcal/week";

  document.getElementById("preyWeek").innerText =
    preyPerWeek.toFixed(0) + " g prey/week";

  document.getElementById("preyFeeding").innerText =
    preyPerFeeding.toFixed(0) + " g per feeding";

  document.getElementById("feedingFreq").innerText =
    animal.feedingsPerWeek + " × per week";

  document.getElementById("resultsSection").style.display = "block";
}
