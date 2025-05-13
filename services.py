from models import RentalItem, Reservation
from exceptions import ReservationError

class RentalSystem:
    def __init__(self):
        self.items = []

    def add_item(self, item: RentalItem):
        self.items.append(item)

    def list_items(self):
        return self.items

    def reserve_item(self, item_name, start_date, days):
        for item in self.items:
            if item.name.lower() == item_name.lower():
                if days < 1:
                    raise ReservationError("Durée minimale de réservation : 1 jour.")
                if item.is_available(start_date, days):
                    reservation = Reservation(item, start_date, days)
                    item.reservations.append(reservation)
                    return reservation
                else:
                    raise ReservationError(f"{item.name} est déjà réservé à cette période.")
        raise ReservationError(f"Item '{item_name}' non trouvé.")
