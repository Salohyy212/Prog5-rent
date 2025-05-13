import { RentalItem } from "./RentalItem";
import { Reservation } from "./Reservation";

export class RentalSystem {
  items: RentalItem[] = [];

  addItem(item: RentalItem) {
    this.items.push(item);
  }

  getItems(): RentalItem[] {
    return this.items;
  }

  reserveItem(itemName: string, startDate: Date, days: number): Reservation {
    const item = this.items.find(i => i.name.toLowerCase() === itemName.toLowerCase());

    if (!item) {
      throw new Error("Objet introuvable.");
    }

    if (days < 1) {
      throw new Error("Durée minimale : 1 jour.");
    }

    if (!item.isAvailable(startDate, days)) {
      throw new Error("Objet déjà réservé pendant cette période.");
    }

    const reservation = new Reservation(item, startDate, days);
    item.reservations.push(reservation);
    return reservation;
  }
}
