let image = document.getElementById("personImage");
let preview = "";

// Raed Files For Images
image.addEventListener("change", () => {
  let file = image.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      preview = e.target.result;
      localStorage.setItem("previewImagePerson", preview);
    };
    reader.readAsDataURL(file);
  }
});

let buttonMain = document.getElementById("btn-main");

// Valedition Form
buttonMain.addEventListener("click", (e) => {
  e.preventDefault();

  let namePerson = document.getElementById("personName").value.trim();
  let agePerson = Number(document.getElementById("age").value.trim());
  let governorate = document.getElementById("governorate").value.trim();
  let phone = document.getElementById("phoneNumber").value.trim();
  let lastSeen = document.getElementById("lastSeen").value.trim();
  let details = document.getElementById("details").value.trim();
  let reporter = document.getElementById("reporterName").value.trim();

  if (!preview) {
    preview = localStorage.getItem("previewImagePerson") || "";
  }

  let fields = [
    preview,
    phone,
    governorate,
    reporter,
    details,
    lastSeen,
    namePerson,
  ];

  let empty = fields.some((field) => field === "");
  if (empty) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "أملأ جميع الحقول",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "حسنا",
    });
    return;
  }

  if (isNaN(agePerson) || agePerson < 0) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "الرجاء إدخال عمر صحيح",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "حسنا",
    });
    return;
  }

  if (!/^\d{11}$/.test(phone)) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "رقم الهاتف يجب أن يتكون من 11 رقمًا",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "حسنا",
    });
    return;
  }

  let reportDate = new Date();
  localStorage.setItem("reportDate", reportDate.toISOString());

  let person = {
    img: preview,
    name: namePerson,
    age: agePerson,
    governorate: governorate,
    phone: phone,
    lastSeen: lastSeen,
    details: details,
    reporter: reporter,
  };

  let persons = JSON.parse(localStorage.getItem("persons")) || [];
  persons.push(person);
  localStorage.setItem("persons", JSON.stringify(persons));

  Swal.fire({
    icon: "success",
    title: "تم الإضافة بنجاح",
    text: "نجحت في إضافة البلاغ",
    confirmButtonText: "حسنا",
  });

  setTimeout(() => {
    window.location.href = "missing.html";
  }, 2000);
});

function letterOnly(input) {
  var regex = /[^a-z أ-ي]/gi;
  input.value = input.value.replace(regex, "");
}
function numberOnly(input) {
  var regex = /[^0-9]/g;
  input.value = input.value.replace(regex, "");
}
