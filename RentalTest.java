import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;

public class RentalTest {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        RentalSystem systeme = new RentalSystem();

        systeme.ajouterObjet(new RentalItem("Toyota Supra"));
        systeme.ajouterObjet(new RentalItem("Villa"));
        systeme.ajouterObjet(new RentalItem("Table"));

        System.out.println("=== Application de Location ===");

        boolean continuer = true;

        while (continuer) {
            afficherMenu();
            String choix = scanner.nextLine();

            switch (choix) {
                case "1":
                    afficherObjetsDisponibles(systeme.getItems());
                    break;
                case "2":
                    faireUneReservation(systeme, scanner);
                    break;
                case "3":
                    System.out.println("👋 Au revoir !");
                    continuer = false;
                    break;
                default:
                    System.out.println("❌ Choix invalide. Réessayez.");
            }
        }

        scanner.close();
    }

    private static void afficherMenu() {
        System.out.println("\n=== Menu Principal ===");
        System.out.println("1. Voir les objets disponibles");
        System.out.println("2. Réserver un objet");
        System.out.println("3. Quitter");
    }

    private static void afficherObjetsDisponibles(List<RentalItem> items) {
        System.out.println("\n📋 Objets disponibles :");
        for (int i = 0; i < items.size(); i++) {
            System.out.println((i + 1) + ". " + items.get(i));
        }
    }

    private static void faireUneReservation(RentalSystem systeme, Scanner scanner) {
        if (systeme.getItems().isEmpty()) {
            System.out.println("Aucun objet disponible pour le moment.");
            return;
        }

        System.out.println("\n--- Nouvelle Réservation ---");
        System.out.println("Tapez 'retour' pour revenir au menu principal.");
        afficherObjetsDisponibles(systeme.getItems());

        String selection = scanner.nextLine();
        if (selection.equalsIgnoreCase("retour")) {
            return;
        }

        try {
            int index = Integer.parseInt(selection) - 1;
            if (index < 0 || index >= systeme.getItems().size()) {
                System.out.println("❌ Numéro invalide.");
                return;
            }

            RentalItem objetChoisi = systeme.getItems().get(index);
            System.out.print("Entrez la date de début (AAAA-MM-JJ) : ");
            String dateStr = scanner.nextLine();
            if (dateStr.equalsIgnoreCase("retour")) {
                return;
            }

            LocalDate dateDebut = LocalDate.parse(dateStr);
            System.out.print("Entrez le nombre de jours : ");
            String joursStr = scanner.nextLine();
            if (joursStr.equalsIgnoreCase("retour")) {
                return;
            }

            int jours = Integer.parseInt(joursStr);
            if (jours < 1) {
                System.out.println("❌ Durée minimale : 1 jour.");
                return;
            }

            try {
                Reservation reservation = systeme.reserverObjet(objetChoisi.getNom(), dateDebut, jours);
                System.out.println("✅ Réservation confirmée : " + reservation);
            } catch (ReservationException e) {
                System.out.println("❌ Erreur : " + e.getMessage());
            }
        } catch (NumberFormatException e) {
            System.out.println("❌ Veuillez entrer un numéro valide.");
        }
    }
}
