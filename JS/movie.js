

// seat
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




//trailer js
document.addEventListener('DOMContentLoaded', () => {
  const trailerModal = document.getElementById('trailerModal');
  const trailerFrame = document.getElementById('trailerFrame');
  const trailerClose = document.getElementById('trailerClose');

  document.querySelectorAll('.trailer').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      let url = btn.getAttribute('data-trailer') || '';
      // Basic validation
      if (!url.includes('youtube.com/embed/')) {
        console.error('Invalid embed URL:', url);
        alert('Sorry, this trailer cannot be played right now.');
        return;
      }
      // Append autoplay & no related
      const sep = url.includes('?') ? '&' : '?';
      trailerFrame.src = url + sep + 'autoplay=1&rel=0';
      trailerModal.style.display = 'flex';
    });
  });

  function closeTrailer() {
    trailerModal.style.display = 'none';
    trailerFrame.src = ''; // clear to stop playback
  }

  trailerClose.addEventListener('click', closeTrailer);
  trailerModal.addEventListener('click', e => {
    if (e.target === trailerModal) closeTrailer();
  });
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


  //serchbar js

  const searchInput = document.getElementById("searchInput");
  const movieCards = document.querySelectorAll(".movie-card");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    movieCards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
