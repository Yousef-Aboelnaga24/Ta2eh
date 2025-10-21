document.addEventListener("DOMContentLoaded", () => {
  let storePerson = JSON.parse(localStorage.getItem("persons")) || [];
  let listPerson = document.getElementById("missing-list");

  if (!listPerson) return;
  if (storePerson.length === 0) {
    listPerson.innerHTML = "<p>لا توجد بلاغات مفقودين حتى الآن.</p>";
  } else {
    storePerson.forEach((person) => {
      let card = document.createElement("div");
      card.className = "col-md-3";
      card.innerHTML = `
        <div class="card missing-card h-100 shadow border-0 rounded-3">
  <!-- صورة الشخص -->
  <img src="${
    person.img
  }" loading="lazy" class="card-img-top preview rounded-top" alt="صورة ${
        person.name
      }" />

  <!-- بيانات -->
  <div class="card-body text-center">
    <!-- الاسم -->
    <h5 class="card-title fw-bold fs-4 mb-2">
      <i class="fa-solid fa-user me-1 text-success"></i> ${person.name}
    </h5>

    <!-- العمر -->
    <p class="card-text text-muted mb-1">
      <i class="fa-solid fa-cake-candles text-warning me-1"></i> العمر: ${
        person.age
      } سنة
    </p>

    <!-- المحافظة -->
    <p class="card-text text-muted mb-1">
      <i class="fa-solid fa-location-dot text-danger me-1"></i> ${
        person.governorate
      }
    </p>

    <!-- تاريخ البلاغ -->
    <p class="card-text text-secondary small">
      <i class="fa-regular fa-clock me-1"></i>
      ${new Date(person.reportDate).toLocaleDateString("ar-EG")}
    </p>

    <!-- زر التفاصيل -->
    <button class="btn-detail btn btn-outline-success rounded-pill mt-2 px-4">
      <i class="fa-solid fa-circle-info me-1"></i> تفاصيل أكثر
    </button>
  </div>
</div>
`;
      // بعد ما تضيف الكرت، أربط الزر
      let btn = card.querySelector(".btn-detail");
      btn.addEventListener("click", () => {
        localStorage.setItem("selectedPerson", JSON.stringify(person));
        window.location.href = "details.html";
      });
      // localStorage.clear();

      // ضيف الكرت للصفحة
      listPerson.appendChild(card);
    });
  }
});

let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {
  let searchValue = searchInput.value.trim();
  let cards = document.querySelectorAll(".missing-card");

  cards.forEach((card) => {
    let title = card.querySelector(".card-title");
    let textValue = title.textContent || title.innerText;

    if (textValue.includes(searchValue)) {
      card.parentElement.style.display = ""; // parentElement = col-md-3
    } else {
      card.parentElement.style.display = "none";
    }
  });
});
