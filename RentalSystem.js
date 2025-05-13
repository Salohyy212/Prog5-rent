const Reservation = require("./Reservation");

class ReservationException extends Error {}

class RentalSystem {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    getItems() {
        return this.items;
    }

    reserveItem(itemName, startDate, days) {
        const item = this.items.find(it => it.name.toLowerCase() === itemName.toLowerCase());

        if (!item) throw new ReservationException("Objet non trouvé.");
        if (days < 1) throw new ReservationException("Durée minimale : 1 jour.");

        if (item.isAvailable(new Date(startDate), days)) {
            const reservation = new Reservation(item, startDate, days);
            item.reservations.push(reservation);
            return reservation;
        } else {
            throw new ReservationException(`${itemName} est déjà réservé pendant cette période.`);
        }
    }
}

module.exports = { RentalSystem, ReservationException };
