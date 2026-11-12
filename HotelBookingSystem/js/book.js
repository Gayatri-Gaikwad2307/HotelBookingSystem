
        function openModal(roomType) {
            document.getElementById('roomType').value = roomType;
            document.getElementById('bookingModal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('bookingModal').style.display = 'none';
        }

        document.getElementById('bookingForm').addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Booking successful!');
            closeModal();
        });

        // Close the modal when the user clicks anywhere outside of it
        window.onclick = function(event) {
            var modal = document.getElementById('bookingModal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
        // booking.js

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("bookingModal");
  const span = document.getElementsByClassName("close")[0];
  const bookingForm = document.getElementById("bookingForm");

  // Function to open the modal
  const openModal = (roomType) => {
    modal.style.display = "block";
    document.getElementById("room-type").value = roomType;
  };

  // Function to close the modal
  const closeModal = () => {
    modal.style.display = "none";
  };

  // Add event listener to close the modal when the 'x' is clicked
  span.onclick = () => {
    closeModal();
  };

  // Add event listener to close the modal when clicking outside of the modal content
  window.onclick = (event) => {
    if (event.target == modal) {
      closeModal();
    }
  };

  // Add event listeners to all book buttons
  const bookButtons = document.querySelectorAll(".btn.book");
  bookButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const roomType = event.target.closest(".room_card").querySelector("h4").innerText;
      openModal(roomType);
    });
  });

  // Handle form submission
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Form submission logic here (e.g., sending data to the server)
    alert("Booking form submitted!");
    closeModal();
  });
});

    