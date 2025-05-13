import { RentalItem } from "./RentalItem";
import { RentalSystem } from "./RentalSystem";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const system = new RentalSystem();
system.addItem(new RentalItem("Appartement"));
system.addItem(new RentalItem("Espace"));
system.addItem(new RentalItem("BMW"));

function showMenu() {
  console.log("\n=== Menu Principal ===");
  console.log("1. Voir les objets disponibles");
  console.log("2. Réserver un objet");
  console.log("3. Quitter");
}

function showItems() {
  console.log("\n📋 Objets disponibles :");
  system.getItems().forEach((item, index) => {
    console.log(`${index + 1}. ${item.toString()}`);
  });
}

function askQuestion(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  let running = true;

  while (running) {
    showMenu();
    const choice = await askQuestion("Votre choix : ");

    switch (choice.trim()) {
      case "1":
        showItems();
        break;

      case "2":
        showItems();
        const indexStr = await askQuestion("Entrez le numéro de l'objet : ");

        // Vérifie que l'utilisateur a entré un chiffre
        if (!/^\d+$/.test(indexStr)) {
          console.log("❌ Vous devez entrer un chiffre valide.");
          continue;
        }

        const index = parseInt(indexStr) - 1;

        // Vérifie que l'indice est dans les limites
        if (index < 0 || index >= system.getItems().length) {
          console.log("❌ Numéro invalide.");
          continue;
        }

        const item = system.getItems()[index];

        const dateStr = await askQuestion("Date de début (YYYY-MM-DD) : ");
        const startDate = new Date(dateStr);
        if (isNaN(startDate.getTime())) {
          console.log("❌ Date invalide.");
          continue;
        }

        const daysStr = await askQuestion("Nombre de jours : ");
        const days = parseInt(daysStr);

        if (isNaN(days) || days < 1) {
          console.log("❌ Durée invalide.");
          continue;
        }

        try {
          const reservation = system.reserveItem(item.name, startDate, days);
          console.log("✅ Réservation réussie : " + reservation.toString());
        } catch (err: any) {
          console.log("❌ Erreur : " + err.message);
        }

        break;

      case "3":
        running = false;
        console.log("👋 Au revoir !");
        break;

      default:
        console.log("❌ Choix invalide.");
    }
  }

  rl.close();
}

main();
