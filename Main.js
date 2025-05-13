const readline = require("readline");
const RentalItem = require("./RentalItem");
const { RentalSystem, ReservationException } = require("./RentalSystem");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const system = new RentalSystem();
system.addItem(new RentalItem("Toyota supra"));
system.addItem(new RentalItem("Villa"));
system.addItem(new RentalItem("Table"));

console.log("=== Application de Location ===");

function showMenu() {
    console.log("\n=== Menu Principal ===");
    console.log("1. Voir les objets disponibles");
    console.log("2. Réserver un objet");
    console.log("3. Quitter");
}

function showAvailableItems(items) {
    console.log("\n📋 Objets disponibles :");
    items.forEach((item, index) => {
        console.log(`${index + 1}. ${item.toString()}`);
    });
}

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function makeReservation() {
    const items = system.getItems();

    if (items.length === 0) {
        console.log("Aucun objet disponible.");
        return;
    }

    showAvailableItems(items);
    const index = await askQuestion("Numéro de l'objet à réserver (ou 'retour') : ");

    if (index.toLowerCase() === "retour") return;

    const num = parseInt(index);
    if (isNaN(num) || num < 1 || num > items.length) {
        console.log("❌ Numéro invalide.");
        return;
    }

    const selectedItem = items[num - 1];
    const dateStr = await askQuestion("Entrez la date de début (YYYY-MM-DD) : ");
    if (dateStr.toLowerCase() === "retour") return;

    const daysStr = await askQuestion("Durée en jours : ");
    if (daysStr.toLowerCase() === "retour") return;

    try {
        const reservation = system.reserveItem(selectedItem.name, new Date(dateStr), parseInt(daysStr));
        console.log("✅ Réservation réussie :", reservation.toString());
    } catch (e) {
        if (e instanceof ReservationException) {
            console.log("❌ Erreur :", e.message);
        } else {
            console.log("❌ Erreur inconnue :", e.message);
        }
    }
}

async function main() {
    let continuer = true;
    while (continuer) {
        showMenu();
        const choice = await askQuestion("Votre choix : ");

        switch (choice) {
            case "1":
                showAvailableItems(system.getItems());
                break;
            case "2":
                await makeReservation();
                break;
            case "3":
                continuer = false;
                console.log("👋 Au revoir !");
                rl.close();
                break;
            default:
                console.log("Choix invalide.");
        }
    }
}

main();
