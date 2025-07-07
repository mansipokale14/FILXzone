

// Teailer
function openTrailer(trailerUrl) {
  const modal = document.getElementById("trailerModal");
  const iframe = document.getElementById("trailerFrame");

  iframe.src = trailerUrl + "?autoplay=1";
  modal.style.display = "flex"; // Show modal
}

function closeTrailer() {
  const modal = document.getElementById("trailerModal");
  const iframe = document.getElementById("trailerFrame");

  iframe.src = ""; // Stop video
  modal.style.display = "none";
}

// Optional: close modal when clicking outside content
window.addEventListener("click", function (e) {
  const modal = document.getElementById("trailerModal");
  if (e.target === modal) {
    closeTrailer();
  }
});



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

