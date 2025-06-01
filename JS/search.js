document.addEventListener("DOMContentLoaded", () => {
  let storePerson = JSON.parse(localStorage.getItem("persons")) || [];
  let listPerson = document.getElementById("missingList");

  if (storePerson.length === 0) {
    listPerson.innerHTML = "<p>لا توجد بلاغات مفقودين حتى الآن.</p>";
  } else {
    storePerson.forEach((person) => {
      let card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
        <div class="card missing-card shadow">
          <img src="${person.img}" class="card-img-top" alt="شخص مفقود">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold fs-4">
            <i class="fas fa-user-circle me-1 text-success"></i>  ${person.name}
            </h5>
            <p class="card-text">العمر: ${person.age} سنة</p>
            <p class="card-text">المدينة: ${person.governorate}</p>
            <button class="btn-detail btn btn-outline-success rounded-pill mt-2">تفاصيل أكثر</button>
          </div>
        </div>`;

      // بعد ما تضيف الكرت، أربط الزر
      let btn = card.querySelector(".btn-detail");
      btn.addEventListener("click", () => {
        localStorage.setItem("selectedPerson", JSON.stringify(person));
        window.location.href = "details.html";
      });

      // ضيف الكرت للصفحة
      listPerson.appendChild(card);
    });
  }
});
