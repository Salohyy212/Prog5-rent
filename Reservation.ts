import { RentalItem } from "./RentalItem";

export class Reservation {
  item: RentalItem;
  startDate: Date;
  endDate: Date;

  constructor(item: RentalItem, startDate: Date, days: number) {
    this.item = item;
    this.startDate = startDate;
    this.endDate = new Date(startDate);
    this.endDate.setDate(startDate.getDate() + days);
  }

  toString(): string {
    return `${this.item.name} réservé du ${this.startDate.toDateString()} au ${this.endDate.toDateString()}`;
  }
}
