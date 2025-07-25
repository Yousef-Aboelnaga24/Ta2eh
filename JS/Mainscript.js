let persons = JSON.parse(localStorage.getItem("persons")) || [];

function showConfirmation(event) {
  event.preventDefault();
  document.getElementById("confirmation").classList.remove("d-none");
}
// -------------------------------------
let countMissing = document.getElementById("countMissing");

countMissing.innerHTML = persons.length;
// --------------------------------------
let lastMissing = document.getElementById("lastMissing");

let lastThreePersons = persons.slice(-3).reverse();

lastMissing.innerHTML = "";

lastThreePersons.forEach((person) => {
  lastMissing.innerHTML += `<div class="col-md-4">
                    <div class="card missing-card shadow-sm border-0 h-100 transition">
                        <img src="${person.img}" class="card-img-top" alt="شخص مفقود">
                        <div class="card-body text-center">
                            <h5 class="card-title fw-bold fs-4 text-dark">
                                <i class="fas fa-user-circle me-1 text-success"></i> ${person.name}
                            </h5>
                            <p class="card-text"><i class="fas fa-birthday-cake me-1 text-muted"></i> العمر: ${person.age} سنة</p>
                            <p class="card-text"><i class="fas fa-map-marker-alt me-1 text-muted"></i> المدينة: ${person.governorate}
                            </p>
                            <button class="btn btn-outline-success rounded-pill mt-2">تفاصيل أكثر</button>
                        </div>
                    </div>
                </div>`;
});
