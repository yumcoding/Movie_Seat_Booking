const movieSelector = document.querySelector("select");
const seatContainer = document.querySelector(".seat-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".count");
const total = document.querySelector(".total");

let ticketPrice = +movieSelector.value;

populateUI();

//Update count and total
function updateCountAndTotal() {
  //get movie index
  const movieIndex = movieSelector.selectedIndex;

  // get # of selected seats
  const selectedSeatsArr = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsNum = selectedSeatsArr.length;
  count.textContent = selectedSeatsNum;

  // get total price
  ticketPrice = +movieSelector.value;
  const totalPrice = selectedSeatsNum * ticketPrice;
  total.textContent = totalPrice;

  setMovieData(movieIndex, selectedSeatsArr, ticketPrice, selectedSeatsNum);
}

function setMovieData(
  movieIndex,
  selectedSeatsArr,
  ticketPrice,
  selectedSeatsNum
) {
  // set movie index
  localStorage.setItem("movieIndex", movieIndex);

  // set setas index
  const seatsIndex = [...selectedSeatsArr].map((seat) =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem("selectedSeatsIndex", JSON.stringify(seatsIndex));

  // set ticket price
  localStorage.setItem("ticketPrice", ticketPrice);

  // set # of seats
  localStorage.setItem("selectedSeatsNum", selectedSeatsNum);
}

function populateUI() {
  // show slected Movie
  const selectedMovie = localStorage.getItem("movieIndex");
  movieSelector.selectedIndex = selectedMovie;

  // show selected seats
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeatsIndex"));
  seats.forEach(function (seat, index) {
    if (selectedSeats.indexOf(index) > -1) {
      seat.classList.add("selected");
    }
  });
  // show count and total
  updateCountAndTotal();
}

// Event Listener for selecting seats
seatContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountAndTotal();
  }
});

// Event Listener for changing a movie
movieSelector.addEventListener("change", (e) => {
  updateCountAndTotal();
});
