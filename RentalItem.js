class RentalItem {
    constructor(name) {
        this.name = name;
        this.reservations = [];
    }

    isAvailable(startDate, days) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days);

        for (const reservation of this.reservations) {
            const resStart = new Date(reservation.startDate);
            const resEnd = new Date(reservation.endDate);

            if (!(endDate <= resStart || startDate >= resEnd)) {
                return false;
            }
        }
        return true;
    }

    toString() {
        return `${this.name}${this.reservations.length === 0 ? " (Disponible)" : " (Réservé)"}`;
    }
}

module.exports = RentalItem;
