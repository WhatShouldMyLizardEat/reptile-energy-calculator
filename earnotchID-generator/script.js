document.addEventListener("DOMContentLoaded", () => {

    const weightMap = {
        A: 1,
        B: 2,
        C: 4,
        D: 8,
        E: 16,
        F: 32,
        G: 64,
        H: 128,
        I: 256,
        J: 512,
        K: 1024,
        L: 2048
    };

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const idInput = document.getElementById("internalId");
    const selectedNotchesSpan = document.getElementById("selectedNotches");

    // Updates the Visuals (Text list and Diagram dots) based on CURRENT checkbox state
    function updateUI() {
        let selected = [];

        checkboxes.forEach(cb => {
            const marker = document.getElementById(`marker-${cb.value}`);
            if (cb.checked) {
                selected.push(cb.value);
                if (marker) marker.style.display = "block";
            } else {
                if (marker) marker.style.display = "none";
            }
        });

        selectedNotchesSpan.textContent = selected.length ? selected.join(", ") : "None";
    }

    // Triggered when User clicks a Checkbox
    function updateFromCheckboxes() {
        let total = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                total += weightMap[cb.value];
            }
        });
        idInput.value = total;
        updateUI();
    }

    // Triggered when User types in the ID Input
    function updateFromInput() {
        let val = parseInt(idInput.value) || 0;
        const warning = document.getElementById("idWarning");

        if (val > 4095) {
            if (warning) warning.style.display = "block";
            // Clear all checkboxes and UI if invalid
            checkboxes.forEach(cb => cb.checked = false);
            updateUI();
            return; // Stop further processing
        } else {
            if (warning) warning.style.display = "none";
        }

        checkboxes.forEach(cb => {
            const weight = weightMap[cb.value];
            // Bitwise check: if (val & weight) is truthy, the bit is set
            cb.checked = (val & weight) !== 0;
        });

        updateUI();
    }

    // Event Listeners
    checkboxes.forEach(cb => cb.addEventListener("change", updateFromCheckboxes));

    // Generate Button Listener (Manual trigger)
    const generateBtn = document.getElementById("generateBtn");
    const resultSection = document.getElementById("resultSection");
    if (generateBtn) {
        generateBtn.addEventListener("click", () => {
            updateFromInput();
            if (resultSection) {
                resultSection.style.display = "block";
            }
        });
    }

    // Print Button
    const printBtn = document.getElementById("printBtn");
    if (printBtn) {
        printBtn.addEventListener("click", () => window.print());
    }

    // Initial call to set state (in case browser remembered values)
    updateFromCheckboxes();
});
