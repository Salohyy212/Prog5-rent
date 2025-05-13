import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class RentalItem {
    private String nom;
    private List<Reservation> reservations;

    public RentalItem(String nom) {
        this.nom = nom;
        this.reservations = new ArrayList<>();
    }

    public String getNom() {
        return nom;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public boolean estDisponible(LocalDate dateDebut, int jours) {
        LocalDate dateFin = dateDebut.plusDays(jours);
        for (Reservation r : reservations) {
            if (!(dateFin.isBefore(r.getDateDebut()) || dateDebut.isAfter(r.getDateFin()))) {
                return false; // chevauchement détecté
            }
        }
        return true;
    }

    @Override
    public String toString() {
        return nom + (reservations.isEmpty() ? " (Disponible)" : " (Réservé)");
    }
}
