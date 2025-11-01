let persons = JSON.parse(localStorage.getItem("persons")) || [];

function showConfirmation(e) {
  e.preventDefault();
  document.getElementById("confirmation").classList.remove("d-none");
}

// Count Missing Persons
// -------------------------------------
let countMissing = document.getElementById("countMissing");

countMissing.innerHTML = persons.length;
// --------------------------------------
let lastMissing = document.getElementById("lastMissing");

let lastThreePersons = persons.slice(-3).reverse();

lastMissing.innerHTML = "";

lastThreePersons.forEach((person, index) => {
  lastMissing.innerHTML += `
  <div class="col-md-4">
    <div class="card missing-card shadow-sm border-0 h-100 transition">
      <img src="${person.img}" class="card-img-top" alt="شخص مفقود">
      <div class="card-body text-center">
        <h5 class="card-title fw-bold fs-4 text-dark">
          <i class="fas fa-user-circle me-1 text-success"></i> ${person.name}
        </h5>
        <p class="card-text"><i class="fas fa-birthday-cake me-1 text-muted"></i> العمر: ${person.age} سنة</p>
        <p class="card-text"><i class="fas fa-map-marker-alt me-1 text-muted"></i> المدينة: ${person.governorate}</p>
        <button class="btn-detail btn btn-outline-success rounded-pill mt-2" data-index="${index}">تفاصيل أكثر</button>
      </div>
    </div>
  </div>`;
});

// إضافة حدث لكل زرار
document.querySelectorAll(".btn-detail").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // نجيب الـ index من data attribute
    let index = e.target.getAttribute("data-index");
    let person = lastThreePersons[index];
    localStorage.setItem("selectedPerson", JSON.stringify(person));
    window.location.href = "./HTML/details.html";
  });
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("dragstart", (e) => {
  e.preventDefault();
});

document.addEventListener("selectstart", (e) => {
  e.preventDefault();
});

document.addEventListener("keydown", (e) => {
  if (
    e.key &&
    (e.ctrlKey === "c" || e.key === "v" || e.key === "u" || e.key === "w")
  ) {
    e.preventDefault();
  }

  if (e.keyCode === 123) {
    e.preventDefault();
  }
});
