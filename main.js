const seatContainer = document.querySelector(".seat-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
//console.log(seats);
const count = document.querySelector(".count");
const total = document.querySelector(".total");
const movieSelected = document.querySelector("select");
// console.log(movieSelected);
// console.log(movieSelected.value);
//console.log(typeof movieSelected.value);
let ticketPrice = +movieSelected.value;

// Update selectd seats and total price
function updateCountAndTotal() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const newCount = selectedSeats.length;
  count.textContent = newCount;
  total.textContent = newCount * ticketPrice;
}

// EventLister - seat select
seatContainer.addEventListener("click", (e) => {
  //console.log(e);
  //console.log(e.target);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    //console.log(e.target);
    e.target.classList.toggle("selected");
    updateCountAndTotal();
  }
});