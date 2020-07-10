const seatContainer = document.querySelector(".seat-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".count");
const total = document.querySelector(".total");
const movieSelector = document.querySelector("select");

populateUI();

let ticketPrice = +movieSelector.value;
// Update selectd seats and total price
function updateCountAndTotal() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  //   console.log(seatsIndex);
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const newCount = selectedSeats.length;
  count.textContent = newCount;
  total.textContent = newCount * ticketPrice;
}

//save movie data to local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovie", movieIndex);
  localStorage.setItem("selectedPrice", moviePrice);
}

function populateUI() {
  const selectedSeatsIndex = JSON.stringify(
    localStorage.getItem("selectedSeats")
  );
  if (selectedSeatsIndex !== null && selectedSeatsIndex !== "") {
    seats.forEach(function (seat, index) {
      if (selectedSeatsIndex.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovie = localStorage.getItem("selectedMovie");
  if (selectedMovie !== null) {
    movieSelector.selectedIndex = selectedMovie;
  }
}

// EventLister - seat select
seatContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountAndTotal();
  }
});

// EventListener - movie change
movieSelector.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCountAndTotal();
});

updateCountAndTotal();
