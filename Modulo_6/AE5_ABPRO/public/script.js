const API_URL = "http://localhost:8020/products"; // Ajusta el puerto si tu server usa otro

// Cargar productos al inicio
document.addEventListener("DOMContentLoaded", loadProducts);

// Formulario agregar producto
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    id: parseInt(document.getElementById("id").value),
    nombre: document.getElementById("name").value,
    precio: parseFloat(document.getElementById("price").value),
    cantidad: parseInt(document.getElementById("quantity").value),
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  e.target.reset();
  loadProducts();
});

// Cargar productos en la tabla
async function loadProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();

  const table = document.getElementById("productsTable");
  table.innerHTML = "";

  products.forEach((p) => {
    table.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>${p.cantidad}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="openEdit(${p.id}, '${p.nombre}', ${p.precio}, ${p.cantidad})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// Abrir modal de edición
function openEdit(id, name, price, quantity) {
  document.getElementById("editId").value = id;
  document.getElementById("editName").value = name;
  document.getElementById("editPrice").value = price;
  document.getElementById("editQuantity").value = quantity;

  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}

// Guardar cambios en producto editado
document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editId").value;
  const updatedProduct = {
    nombre: document.getElementById("editName").value,
    precio: parseFloat(document.getElementById("editPrice").value),
    cantidad: parseInt(document.getElementById("editQuantity").value),
  };

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedProduct),
  });

  const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
  modal.hide();

  loadProducts();
});

// Eliminar producto
async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadProducts();
}
