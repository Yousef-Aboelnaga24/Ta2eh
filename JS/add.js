let buttonMain = document.getElementById("btn-main");

buttonMain.addEventListener("click", (e) => {
  e.preventDefault();
  let image = document.getElementById("personImage").value.trim();
  let namePerson = document.getElementById("personName").value.trim();
  let agePerson = Number(document.getElementById("age").value.trim());
  let governorate = document.getElementById("governorate").value.trim();
  let phone = document.getElementById("phoneNumber").value.trim();
  let lastSeen = document.getElementById("lastSeen").value.trim();
  let details = document.getElementById("details").value.trim();
  let reporter = document.getElementById("reporterName").value.trim();

  let fields = [image, phone, governorate, reporter, details, lastSeen, namePerson];
  let empty = fields.some((fields) => fields === "");
  if (empty) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "أملآ جميع الحقول",
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
      text: "رقم الهاتف يجب أن يتكون من 11 أرقام",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "حسنا",
    });
    return;
  }
  let person = {
    img: image,
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
    text: "نجحت في إضافة البلاغ ",
    confirmButtonText: "حسنا",
  });
  setTimeout(() => {
    window.location.href = "search.html";
  }, 2000);
});
// function viewDetails(person) {
//   localStorage.setItem("selectedPerson", JSON.stringify(person));
//   window.location.href = "details.html";
// }