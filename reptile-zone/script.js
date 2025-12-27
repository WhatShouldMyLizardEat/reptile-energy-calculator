const reptiles = [
    /* ===== SNAKES ===== */
    { sci: "Python regius", common: "Ball python", zone: "Zone 1–2", uvi: "0.0–1.0" },
    { sci: "Python reticulatus", common: "Reticulated python", zone: "Zone 1", uvi: "0.0–0.7" },
    { sci: "Python bivittatus", common: "Burmese python", zone: "Zone 1", uvi: "0.0–0.7" },
    { sci: "Morelia viridis", common: "Green tree python", zone: "Zone 1", uvi: "0.0–0.7" },
    { sci: "Morelia spilota", common: "Carpet python", zone: "Zone 1–2", uvi: "0.0–1.0" },
    { sci: "Antaresia childreni", common: "Children's python", zone: "Zone 1", uvi: "0.0–0.7" },
    { sci: "Liasis olivaceus", common: "Olive python", zone: "Zone 1–2", uvi: "0.0–1.0" },
    { sci: "Boa constrictor", common: "Boa constrictor", zone: "Zone 2", uvi: "0.7–1.0" },
    { sci: "Epicrates cenchria", common: "Rainbow boa", zone: "Zone 1–2", uvi: "0.0–1.0" },
    { sci: "Pantherophis guttatus", common: "Corn snake", zone: "Zone 1–2", uvi: "0.0–1.0" },
    { sci: "Heterodon nasicus", common: "Western hognose snake", zone: "Zone 2", uvi: "0.7–1.0" },
    { sci: "Coelognathus radiatus", common: "Radiated rat snake", zone: "Zone 2", uvi: "0.7–1.0" },
    { sci: "Boiga dendrophila", common: "Mangrove snake", zone: "Zone 2", uvi: "0.7–1.0" },
    { sci: "Ophiophagus hannah", common: "King cobra", zone: "Zone 2–3", uvi: "0.7–2.6" },
    { sci: "Naja naja", common: "Indian cobra", zone: "Zone 2", uvi: "0.7–1.0" },

    /* ===== MONITORS & LARGE LIZARDS ===== */
    { sci: "Varanus komodoensis", common: "Komodo dragon", zone: "Zone 4", uvi: "2.6–3.5+" },
    { sci: "Varanus salvator", common: "Asian water monitor", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Varanus niloticus", common: "Nile monitor", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Varanus exanthematicus", common: "Savannah monitor", zone: "Zone 4", uvi: "2.6–3.5+" },
    { sci: "Varanus acanthurus", common: "Ackie monitor", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Varanus varius", common: "Lace monitor", zone: "Zone 3–4", uvi: "1.0–3.5" },
    { sci: "Tupinambis merianae", common: "Argentine tegu", zone: "Zone 3", uvi: "1.0–2.6" },

    /* ===== AGAMIDS & IGUANAS ===== */
    { sci: "Pogona vitticeps", common: "Bearded dragon", zone: "Zone 3–4", uvi: "1.0–3.5" },
    { sci: "Chlamydosaurus kingii", common: "Frilled dragon", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Hydrosaurus weberi", common: "Sailfin dragon", zone: "Zone 2–3", uvi: "0.7–2.6" },
    { sci: "Physignathus cocincinus", common: "Chinese water dragon", zone: "Zone 2–3", uvi: "0.7–2.6" },
    { sci: "Uromastyx aegyptia", common: "Egyptian uromastyx", zone: "Zone 4", uvi: "2.6–3.5+" },
    { sci: "Iguana iguana", common: "Green iguana", zone: "Zone 3–4", uvi: "1.0–3.5" },
    { sci: "Ctenosaura similis", common: "Black iguana", zone: "Zone 4", uvi: "2.6–3.5+" },

    /* ===== CHAMELEONS ===== */
    { sci: "Chamaeleo calyptratus", common: "Veiled chameleon", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Calumma parsonii", common: "Parson's chameleon", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Chamaeleo melleri", common: "Meller's chameleon", zone: "Zone 2", uvi: "0.7–1.0" },
    { sci: "Brookesia superciliaris", common: "Leaf chameleon", zone: "Zone 1–2", uvi: "0.0–1.0" },

    /* ===== GECKOS & SKINKS ===== */
    { sci: "Eublepharis macularius", common: "Leopard gecko", zone: "Zone 1", uvi: "0.0–0.7" },
    { sci: "Correlophus ciliatus", common: "Crested gecko", zone: "Zone 1", uvi: "0.0–0.7" },
    { sci: "Phelsuma madagascariensis", common: "Madagascar day gecko", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Gekko gecko", common: "Tokay gecko", zone: "Zone 1", uvi: "0.0–0.7" },
    { sci: "Tiliqua scincoides", common: "Blue-tongued skink", zone: "Zone 2–3", uvi: "0.7–2.6" },

    /* ===== TORTOISES & TURTLES ===== */
    { sci: "Chelonoidis nigra", common: "Galápagos tortoise", zone: "Zone 4", uvi: "2.6–3.5+" },
    { sci: "Centrochelys sulcata", common: "African spurred tortoise", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Testudo marginata", common: "Marginated tortoise", zone: "Zone 4", uvi: "2.6–3.5+" },
    { sci: "Chelonoidis denticulata", common: "Yellow-foot tortoise", zone: "Zone 2", uvi: "0.7–1.0" },
    { sci: "Trachemys scripta elegans", common: "Red-eared slider", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Terrapene carolina", common: "Eastern box turtle", zone: "Zone 2", uvi: "0.7–1.0" },

    /* ===== CROCODILIANS ===== */
    { sci: "Crocodylus porosus", common: "Saltwater crocodile", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Crocodylus niloticus", common: "Nile crocodile", zone: "Zone 3", uvi: "1.0–2.6" },
    { sci: "Alligator mississippiensis", common: "American alligator", zone: "Zone 3", uvi: "1.0–2.6" }
];

function searchSpecies() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const resultBox = document.getElementById("resultBox");
    const notFound = document.getElementById("notFound");

    const found = reptiles.find(r =>
        r.sci.toLowerCase().includes(input) ||
        r.common.toLowerCase().includes(input)
    );

    if (found) {
        document.getElementById("sciName").textContent = found.sci;
        document.getElementById("commonName").textContent = found.common;
        document.getElementById("zone").textContent = found.zone;
        document.getElementById("uvi").textContent = found.uvi;

        resultBox.classList.add("show");
        notFound.classList.remove("show");
    } else {
        resultBox.classList.remove("show");
        if (input.length > 2) {
            notFound.classList.add("show");
        } else {
            notFound.classList.remove("show");
        }
    }
}
