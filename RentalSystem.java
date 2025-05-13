import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class RentalSystem {
    private List<RentalItem> items;

    public RentalSystem() {
        items = new ArrayList<>();
    }

    public void ajouterObjet(RentalItem item) {
        items.add(item);
    }

    public List<RentalItem> getItems() {
        return items;
    }

    public Reservation reserverObjet(String nomObjet, LocalDate dateDebut, int jours) throws ReservationException {
        for (RentalItem item : items) {
            if (item.getNom().equalsIgnoreCase(nomObjet)) {
                if (jours < 1) {
                    throw new ReservationException("La durée minimale de réservation est de 1 jour.");
                }
                if (item.estDisponible(dateDebut, jours)) {
                    Reservation reservation = new Reservation(item, dateDebut, jours);
                    item.getReservations().add(reservation);
                    return reservation;
                } else {
                    throw new ReservationException(nomObjet + " est déjà réservé pendant cette période.");
                }
            }
        }
        throw new ReservationException("Objet non trouvé.");
    }
}
