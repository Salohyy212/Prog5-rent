from datetime import timedelta

class Reservation:
    def __init__(self, item, start_date, days):
        self.item = item
        self.start_date = start_date
        self.end_date = start_date + timedelta(days=days)

    def __str__(self):
        return f"{self.item.name} réservé du {self.start_date} au {self.end_date}"


class RentalItem:
    def __init__(self, name):
        self.name = name
        self.reservations = []

    def is_available(self, start_date, days):
        end_date = start_date + timedelta(days=days)
        for r in self.reservations:
            if not (end_date <= r.start_date or start_date >= r.end_date):
                return False
        return True

    def __str__(self):
        return f"{self.name} ({'Disponible' if not self.reservations else 'Peut être réservé'})"
