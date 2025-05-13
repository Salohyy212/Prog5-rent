import { Reservation } from "./Reservation";

export class RentalItem {
  name: string;
  reservations: Reservation[] = [];

  constructor(name: string) {
    this.name = name;
  }

  isAvailable(startDate: Date, days: number): boolean {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days);

    for (const r of this.reservations) {
      if (!(endDate <= r.startDate || startDate >= r.endDate)) {
        return false;
      }
    }
    return true;
  }

  toString(): string {
    return `${this.name}${this.reservations.length === 0 ? " (Disponible)" : " (Réservé)"}`;
  }
}
