import java.time.LocalDate;

public class Reservation {
    private RentalItem item;
    private LocalDate dateDebut;
    private LocalDate dateFin;

    public Reservation(RentalItem item, LocalDate dateDebut, int jours) {
        this.item = item;
        this.dateDebut = dateDebut;
        this.dateFin = dateDebut.plusDays(jours);
    }

    public RentalItem getItem() {
        return item;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    @Override
    public String toString() {
        return item.getNom() + " réservé du " + dateDebut + " au " + dateFin;
    }
}
