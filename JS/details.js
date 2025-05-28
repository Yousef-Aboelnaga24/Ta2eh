function buttonDetails() {
  let person = JSON.parse(localStorage.getItem("selectedPerson"));
  let listDetails = document.getElementById("detailsContainer");

  listDetails.innerHTML = "";
  let cardDetails = `<div class="card p-4">
      <div class="row">
        <div class="col-md-4">
          <div class="info-box text-center">
            <img src="${person.img}" alt="صورة المفقود" class="img-fluid">
          </div>
        </div>
        <div class="col-md-8">
          <div class="info-box">
            <p><strong>الاسم:</strong>
              <span>${person.name}</span>
            </p>
            <p><strong>العمر:</strong>
              <span>${person.age} سنة</span>
            </p>
            <p><strong>آخر مكان شوهد فيه:</strong>
              <span>${person.lastSeen}</span>
            </p>
            <p><strong>تفاصيل إضافية:</strong>
              <span>${person.details}</span>
            </p>
            <p><strong>رقم التواصل:</strong>
              <span>${person.phone}</span>
            </p>
            <p><strong>تم الإبلاغ في:</strong>
              <span>26 مايو 2025</span>
              </p>
          </div>
        </div>
      </div>
    </div>`;
  listDetails.innerHTML += cardDetails;
}
window.onload = buttonDetails;
