document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("bookingModal");
  const closeButton = document.querySelector(".close-button");
  const bookingForm = document.getElementById("bookingForm");
  const roomDetails = document.getElementById("roomDetails");
  const totalCost = document.getElementById("totalCost");

  document.querySelectorAll(".book-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const roomCard = e.target.closest(".room_card");
      const roomName = roomCard.getAttribute("data-room-name");
      const roomNumber = roomCard.getAttribute("data-room-number");
      const pricePerDay = roomCard.getAttribute("data-price-per-day");

      document.getElementById("roomName").value = roomName;
      document.getElementById("roomNumber").value = roomNumber;
      document.getElementById("pricePerDay").value = pricePerDay;

      roomDetails.textContent = `Room No. ${roomNumber} - ${roomName}  :  ₹${pricePerDay}/day`;
      totalCost.textContent = "";

      modal.style.display = "block";
    });
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const roomName = document.getElementById("roomName").value;
    const roomNumber = document.getElementById("roomNumber").value;
    const pricePerDay = document.getElementById("pricePerDay").value;
    const fullName = document.getElementById("fullName").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const checkIn = new Date(document.getElementById("checkIn").value);
    const checkOut = new Date(document.getElementById("checkOut").value);

    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) + 1; // Including the checkout day
    const cost = days * pricePerDay;

    const roomCard = [...document.querySelectorAll(".room_card")].find(
      (card) => card.getAttribute("data-room-number") === roomNumber
    );

    roomCard.innerHTML = `
            <h2>${roomName}</h2>
            <p>Room Number: ${roomNumber}</p>
            <p>Price Per Day: $${pricePerDay}</p>
            <p>Booked by ${fullName}</p>
            <p>Mobile: ${mobileNumber}</p>
            <p>Check In: ${checkIn.toDateString()}</p>
            <p>Check Out: ${checkOut.toDateString()}</p>
            <p>Total Cost: ₹${cost}</p>
            <button class="btn book-button" disabled>Booked</button>
        `;

    modal.style.display = "none";
  });

  const checkOutInput = document.getElementById("checkOut");
  const checkInInput = document.getElementById("checkIn");

  checkOutInput.addEventListener("change", () => {
    updateTotalCost();
  });

  checkInInput.addEventListener("change", () => {
    updateTotalCost();
  });

  function updateTotalCost() {
    const pricePerDay = document.getElementById("pricePerDay").value;
    const checkInDate = new Date(checkInInput.value);
    const checkOutDate = new Date(checkOutInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      totalCost.textContent = "Check-in date cannot be in the past.";
      return;
    }

    if (checkInDate && checkOutDate && checkOutDate >= checkInDate) {
      const days =
        Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)) + 1;
      const cost = days * pricePerDay;
      totalCost.textContent = `Total Cost: ₹${cost}`;
    } else if (checkOutDate < checkInDate) {
      totalCost.textContent =
        "Checkout date must be the same or later than check-in date.";
    }
  }
});
