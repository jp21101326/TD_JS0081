// ==== Config ====
const API = 'https://api.escuelajs.co/api/v1';
const STATE = {
   accessToken: localStorage.getItem('access_token') || null,
   email: localStorage.getItem('email') || null,
   offset: 0,
   limit: 20,
   page: 1,
   categories: []
};

// ========
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const toast = (msg, type='info') => {
   const t = $('#toast');
   t.textContent = msg;
   t.classList.remove('hidden');
   t.style.borderColor = type==='error' ? '#802027' : type==='ok' ? '#1d4d2c' : '#1a2a42';
   setTimeout(()=> t.classList.add('hidden'), 2600);
};

async function apiFetch(path, {method='GET', body, auth=false, params} = {}) {
   const url = new URL(API + path);
   if (params) Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, v));
   const headers = {'Content-Type':'application/json'};
   if (auth && STATE.accessToken) headers['Authorization'] = `Bearer ${STATE.accessToken}`;
   const res = await fetch(url, {method, headers, body: body ? JSON.stringify(body) : undefined});
   if (!res.ok) {
     const errText = await res.text().catch(()=> '');
     throw new Error(`HTTP ${res.status} ${res.statusText} — ${errText}`);
   }
   const text = await res.text();
   return text ? JSON.parse(text) : null;
}

function requireAuth() {
   if (!STATE.accessToken) throw new Error('Debe iniciar sesión para esta acción.');
}

// ==== accessToken ====
async function login(email, password) {
   const data = await apiFetch('/auth/login', {method:'POST', body: {email, password}});
   STATE.accessToken = data.access_token;
   STATE.email = email;
   localStorage.setItem('access_token', data.access_token);
   localStorage.setItem('email', email);
   renderAuth();
   MostrarAviso('Sesión iniciada', 'success');
}

function logout() {
   STATE.accessToken = null;
   STATE.email = null;
   localStorage.removeItem('access_token');
   localStorage.removeItem('email');
   renderAuth();
   MostrarAviso('Sesión cerrada', 'info');
}

function renderAuth() {
   if (STATE.accessToken) {
       $('#loginForm').classList.add('hidden');
       $('#authInfo').classList.remove('hidden');
       $('#userEmail').textContent = STATE.email;
   } else {
       $('#authInfo').classList.add('hidden');
       $('#loginForm').classList.remove('hidden');
   }
}

// ==== Carga Data  ====
async function loadCategories() {
   const cats = await apiFetch('/categories', {params:{offset:0, limit:50}});
   STATE.categories = cats;
   const sel = $('#categoryId');
   sel.innerHTML = cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

async function loadProducts() {
   const {offset, limit} = STATE;
   const products = await apiFetch('/products', {params:{offset, limit}});
   renderTable(products);
   $('#pageInfo').textContent = `Página ${STATE.page} • offset ${offset}, límite ${limit}`;
}

 function renderTable(items) {
    const tbody = $('#tbody');
    tbody.innerHTML = items.map(p => {
    const imgs = (p.images || []).slice(0,3).map(src => `<img src="${src}" alt="img">`).join('');
    return `
      <tr>
        <td>${p.id}</td>
        <td>${escapeHtml(p.title)}</td>
        <td>$${Number(p.price).toFixed(2)}</td>
        <td style="text-align: center;"><span class="badge text-bg-warning text-wrap">${p?.category?.name ?? '-'}</span></td>
        <td><div class="imgs">${imgs}</div></td>
        <td class="actions">
          <button class="btn btn-primary" data-action="edit"   data-id="${p.id}">Editar</button>
          <button class="btn btn-danger"  data-action="delete" data-id="${p.id}">Eliminar</button>
        </td>
      </tr>
    `;
   }).join('');
 }

 // ==== Modal / Form ====
 function openModal() { $('#productModal').showModal(); }
 function closeModal() { $('#productModal').close(); }

 function clearForm() {
   $('#prodId').value = '';
   $('#title').value = '';
   $('#price').value = '';
   $('#description').value = '';
   $('#images').value = '';
   const sel = $('#categoryId');
   if (sel.options.length) sel.selectedIndex = 0;
 }

 async function openNew() {
   $('#formTitle').textContent = 'Nuevo producto';
   clearForm();
   openModal();
 }

 async function openEdit(id) {
   const p = await apiFetch(`/products/${id}`);
   $('#formTitle').textContent = `Editar Producto:  #${p.id}`;
   $('#prodId').value = p.id;
   $('#title').value = p.title || '';
   $('#price').value = p.price || '';
   $('#description').value = p.description || '';
   $('#images').value = (p.images || []).join(', ');
   // seleccionar categoría coincidente
   const sel = $('#categoryId');
   const idx = [...sel.options].findIndex(o => Number(o.value) === Number(p?.category?.id));
   if (idx >= 0) sel.selectedIndex = idx;
   openModal();
 }

 function parseImages(value) {
   if (!value) return [];
   return value.split(',').map(s => s.trim()).filter(Boolean);
 }

 async function onSubmitForm(e) {
   e.preventDefault();
   try {
    requireAuth();
    const id = $('#prodId').value.trim();
    const body = {
      title: $('#title').value.trim(),
      price: Number($('#price').value),
      description: $('#description').value.trim(),
      categoryId: Number($('#categoryId').value),
      images: parseImages($('#images').value)
    };
    // Validación simple
     if (!body.title || !body.description || !body.categoryId || Number.isNaN(body.price)) {
       MostrarAviso('Favor completar los campos requeridos', 'warning');
       return;
    } 
    if (!body.images.length) {
       MostrarAviso('Favor agregar al menos 1 URL de imagen', 'warning');
       return;
    }
    if (id) {
      const updated = await apiFetch(`/products/${id}`, {method:'PUT', body, auth:true});
      MostrarAviso(`Producto Actualizado #${updated.id}`, 'success');
    } else {
      const created = await apiFetch('/products/', {method:'POST', body, auth:true});
      MostrarAviso(`Producto Creado #${created.id}`, 'success');
    }
    closeModal();
    await loadProducts();
  } catch (err) {
    //console.error(err);
    MostrarAviso("Error de Aplicación", 'error');
  }
 }

async function onDelete(id) {
  try {
    requireAuth();
    if (!id) return;

    // Confirmación con SweetAlert
    const result = await Swal.fire({
      title: `¿Eliminar producto #${id}?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;
    // Ejecutar eliminación
    await apiFetch(`/products/${id}`, {method:'DELETE', auth:true});
    // Aviso de éxito
    Swal.fire({
      title: "Eliminado",
      text: `Producto #${id} eliminado con éxito`,
      icon: "success",
      confirmButtonColor: "#198754"
    });
    await loadProducts();
  } catch (err) {
    console.error(err);
    Swal.fire("Error", err.message, "error");
  }
}

// ==== Events + UI ====
 function escapeHtml(s){ return s?.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])) ?? ''; }

 function bindEvents() {
  // Login
   $('#loginForm').addEventListener('submit', async (e) => {
       e.preventDefault();
       const email = $('#email').value.trim();
       const password = $('#password').value;
       try { await login(email, password); }
       catch (err) { console.error(err); MostrarAviso('Error Login: ' + err.message, 'error'); }
   });
   $('#logoutBtn').addEventListener('click', logout);

  // Toolbar
  $('#newBtn').addEventListener('click', openNew);
  $('#refreshBtn').addEventListener('click', loadProducts);
  $('#limitSelect').addEventListener('change', (e) => {
     STATE.limit = Number(e.target.value);
     STATE.offset = 0; STATE.page = 1;
    loadProducts();
  });

  // Tabla: delegación
  $('#tbody').addEventListener('click', (e) => {
     const btn = e.target.closest('button');
     if (!btn) return;
     const id = btn.dataset.id;
     if (btn.dataset.action === 'edit') openEdit(id);
     if (btn.dataset.action === 'delete') {
        onDelete(id); 
     }
  });

  // Paginación
  $('#prevPage').addEventListener('click', () => {
     if (STATE.offset === 0) return;
     STATE.offset = Math.max(0, STATE.offset - STATE.limit);
     STATE.page = Math.max(1, STATE.page - 1);
     loadProducts();
  });
  $('#nextPage').addEventListener('click', () => {
     STATE.offset += STATE.limit;
     STATE.page += 1;
     loadProducts();
  });

  // Modal
   $('#closeModal').addEventListener('click', closeModal);
   $('#productForm').addEventListener('submit', onSubmitForm);
}

// ==== Init ====
(async function init(){
  try {
    renderAuth();
    bindEvents();
    await loadCategories();
    await loadProducts();
  } catch(err) {
    console.error(err);
    MostrarAviso("Error inicial: " + err.message, 'error');
  }
})();

// Mostrar aviso
function MostrarAviso(mensaje, icono){
   Swal.fire({
     title: mensaje,
     draggable: true,
     icon: icono
   });
}