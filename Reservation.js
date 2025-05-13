class Reservation {
    constructor(item, startDate, days) {
        this.item = item;
        this.startDate = new Date(startDate);
        this.endDate = new Date(this.startDate);
        this.endDate.setDate(this.startDate.getDate() + days);
    }

    toString() {
        return `${this.item.name} réservé du ${this.startDate.toISOString().split('T')[0]} au ${this.endDate.toISOString().split('T')[0]}`;
    }
}

module.exports = Reservation;
