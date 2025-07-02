const form = document.getElementById("inventory-form");
const list = document.getElementById("inventory-list");
const msg = document.getElementById("message");
let inventory = [];

function showMessage(text, type="success") {
  msg.textContent = text;
  msg.style.color = type === "success" ? "green" : "red";
  setTimeout(() => msg.textContent = "", 2000);
}

function renderList() {
  list.innerHTML = "";
  inventory.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.serial}</td>
      <td>${item.qty}</td>
      <td><button class="delete-btn" onclick="deleteItem(${index})">ลบ</button></td>
    `;
    list.appendChild(tr);
  });
}

function deleteItem(idx) {
  inventory.splice(idx, 1);
  renderList();
  showMessage("ลบรายการแล้ว", "success");
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = form.name.value.trim();
  const serial = form.serial.value.trim();
  const qty = parseInt(form.qty.value);
  if (!name || !serial || qty < 1) {
    showMessage("กรุณากรอกข้อมูลให้ถูกต้อง", "error");
    return;
  }
  inventory.push({ name, serial, qty });
  renderList();
  form.reset();
  showMessage("เพิ่มรายการสำเร็จ", "success");
});
