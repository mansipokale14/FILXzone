document.addEventListener('DOMContentLoaded', () => {
  const seatModal = document.getElementById('seat-selection');
  const seatMap = document.getElementById('seat-map');
  const seatInfo = document.getElementById('seat-info');
  const confirmBtn = document.getElementById('confirmSeats');
  const seatClose = document.getElementById('seatClose');
  const screenSelect = document.getElementById('screen-select');

  const selectedSeats = new Set();
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 12;

  // Build seat grid dynamically
  function buildSeatMap() {
    seatMap.innerHTML = '';

    rows.forEach(row => {
      for (let i = 0; i <= seatsPerRow; i++) {
        const seatDiv = document.createElement('div');

        if (i === 0) {
          seatDiv.className = 'seat-label';
          seatDiv.textContent = row;
        } else {
          const seatId = `${row}${i}`;
          seatDiv.className = 'seat';
          seatDiv.dataset.seatId = seatId;
          seatDiv.textContent = i;

          seatDiv.addEventListener('click', () => toggleSeat(seatDiv));
        }

        seatMap.appendChild(seatDiv);
      }
    });
  }

  function toggleSeat(btn) {
    const id = btn.dataset.seatId;
    if (selectedSeats.has(id)) {
      selectedSeats.delete(id);
      btn.classList.remove('selected');
    } else {
      selectedSeats.add(id);
      btn.classList.add('selected');
    }
    updateSeatInfo();
  }

  function updateSeatInfo() {
    const count = selectedSeats.size;
    seatInfo.textContent = `${count} seat${count !== 1 ? 's' : ''} selected.`;
    confirmBtn.disabled = count === 0 || screenSelect.value === '';
  }

  screenSelect.addEventListener('change', updateSeatInfo);

  // Book ticket button opens modal
  document.querySelectorAll('.book-ticket, .book').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      selectedSeats.clear();
      screenSelect.value = '';
      buildSeatMap();
      updateSeatInfo();
      seatModal.style.display = 'flex';
    });
  });

  // Close modal
  seatClose.addEventListener('click', () => {
    seatModal.style.display = 'none';
  });

  seatModal.addEventListener('click', e => {
    if (e.target === seatModal) seatModal.style.display = 'none';
  });

  // Confirm booking
  confirmBtn.addEventListener('click', () => {
    const screen = screenSelect.value;
    const seats = [...selectedSeats].join(', ');
    alert(`You have booked seats: ${seats} on screen: ${screen}`);
    seatModal.style.display = 'none';
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in and requested to open seat modal
  if (localStorage.getItem("open_seat_modal") === "true") {
    localStorage.removeItem("open_seat_modal");
    setTimeout(() => {
      document.getElementById("seat-selection").style.display = "flex";
    }, 300); // delay to ensure page is fully loaded
  }
});

function handleBooking(page) {
    if (localStorage.getItem("isLoggedIn") === "true") {
      // Already logged in, open seat selection modal
      document.getElementById("seat-selection").style.display = "flex";
    } else {
      // Not logged in, redirect to login and save current page
      localStorage.setItem("redirectAfterLogin", page);
      window.location.href = "login.html";
    }
  }
