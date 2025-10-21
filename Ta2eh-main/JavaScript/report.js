let image = document.getElementById("personImage");
let preview = "";

// قراءة ملفات الصور
image.addEventListener("change", () => {
  let file = image.files[0];
  if (file) {
    if (!file.type || !file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "من فضلك ارفع صورة فقط",
        confirmButtonText: "حسنا",
      });
      image.value = "";
      return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
      preview = e.target.result;
      localStorage.setItem("previewImagePerson", preview);
    };
    reader.readAsDataURL(file);
  }
});

let buttonMain = document.getElementById("btn-main");

// التحقق من النموذج
buttonMain.addEventListener("click", (e) => {
  e.preventDefault();

  let namePerson = document.getElementById("personName").value.trim();
  let agePerson = Number(document.getElementById("age").value.trim());
  let governorate = document.getElementById("governorateInp").value.trim();
  let governorateList = Array.from(
    document.querySelectorAll("#governorate option")
  ).map((opt) => opt.value);
  let phone = document.getElementById("phoneNumber").value.trim();
  let lastSeen = document.getElementById("lastSeen").value.trim();
  let details = document.getElementById("details").value.trim();
  let reporter = document.getElementById("reporterName").value.trim();

  // التحقق من الصورة
  if (!preview) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "يجب رفع صورة للشخص المفقود",
      confirmButtonText: "حسنا",
    });
    return;
  }

  // التحقق من الحقول
  let fields = [
    preview,
    phone,
    governorate,
    reporter,
    details,
    lastSeen,
    namePerson,
  ];
  if (fields.some((field) => field === "")) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "أملأ جميع الحقول",
      confirmButtonText: "حسنا",
    });
    return;
  }

  // التحقق من العمر
  if (isNaN(agePerson) || agePerson < 1 || agePerson > 120) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "الرجاء إدخال عمر صحيح",
      confirmButtonText: "حسنا",
    });
    return;
  }

  // التحقق من المحافظة
  if (!governorateList.includes(governorate)) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "ادخل اسم المحافظة صحيح",
      confirmButtonText: "حسنا",
    });
    return;
  }

  // التحقق من رقم الهاتف
  if (!/^0\d{10}$/.test(phone)) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "رقم الهاتف يجب أن يتكون من 11 رقمًا ويبدأ بـ 0",
      confirmButtonText: "حسنا",
    });
    return;
  }

  // تخزين البلاغ
  let person = {
    img: preview,
    name: namePerson,
    age: agePerson,
    governorate: governorate,
    phone: phone,
    lastSeen: lastSeen,
    details: details,
    reporter: reporter,
    reportDate: new Date().toISOString(),
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

// منع إدخال غير الأحرف
function letterOnly(input) {
  var regex = /[^أ-ي-ء\s]/gi;
  input.value = input.value.replace(regex, "");
}
// منع إدخال غير الأرقام
function numberOnly(input) {
  var regex = /[^0-9\s]/g;
  input.value = input.value.replace(regex, "");
}
