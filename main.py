from datetime import datetime
from models import RentalItem
from services import RentalSystem
from exceptions import ReservationError

def parse_date(input_str):
    try:
        return datetime.strptime(input_str, "%Y-%m-%d").date()
    except ValueError:
        print("❌ Format invalide. Utilise AAAA-MM-JJ.")
        return None

def afficher_menu():
    print("\n=== Menu principal ===")
    print("1. Voir les objets disponibles")
    print("2. Réserver un objet")
    print("3. Quitter")

def afficher_objets(items):
    print("\n📋 Objets disponibles :")
    for i, item in enumerate(items, start=1):
        print(f"{i}. {item.name}")

def main():
    system = RentalSystem()

    system.add_item(RentalItem("Caravane - Adria"))
    system.add_item(RentalItem("Maison de plage"))
    system.add_item(RentalItem("Assiette"))

    print("=== Application de Location ===")

    continuer = True
    while continuer:
        afficher_menu()
        choix = input("Ton choix : ")

        if choix == "1":
            afficher_objets(system.list_items())

        elif choix == "2":
            items = system.list_items()
            if not items:
                print("Aucun objet à réserver.")
                continue

            while True:
                print("\n--- Réservation ---")
                print("Tapez 'retour' pour revenir au menu principal.")
                afficher_objets(items)

                selection = input("Numéro de l'objet : ")
                if selection.lower() == "retour":
                    break

                try:
                    index = int(selection) - 1
                    if index < 0 or index >= len(items):
                        print("❌ Numéro invalide.")
                        continue
                    selected_item = items[index]
                except ValueError:
                    print("❌ Entrez un numéro valide.")
                    continue

                date_str = input("Date de début (AAAA-MM-JJ) : ")
                if date_str.lower() == "retour":
                    break
                date = parse_date(date_str)
                if not date:
                    continue

                jours_str = input("Nombre de jours : ")
                if jours_str.lower() == "retour":
                    break
                try:
                    jours = int(jours_str)
                    if jours < 1:
                        print("❌ Durée minimale : 1 jour.")
                        continue
                except ValueError:
                    print("❌ Entrez un nombre valide.")
                    continue

                try:
                    reservation = system.reserve_item(selected_item.name, date, jours)
                    print("✅ Réservation réussie :", reservation)
                    break
                except ReservationError as e:
                    print("❌ Erreur :", e)

        elif choix == "3":
            print("👋 À bientôt !")
            continuer = False
        else:
            print("❌ Choix invalide. Réessaie.")

if __name__ == "__main__":
    main()
