document.addEventListener("click", (e) => {
  if (e.target.classList.contains("open-project")) {
    const id = e.target.dataset.id;
    loadProjectModal(id);
  }
});

function loadProjectModal(id) {
  const data = projectData[id];

  // Header
  document.getElementById("modal-header-dynamic").innerHTML = `
    <div>
      <h4 class="modal-title fw-semibold">${data.title}</h4>
      <p class="small mb-0">${data.subtitle}</p>
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
  `;
  document.getElementById("modal-header-dynamic").style.background = "#0d6efd";
  document.getElementById("modal-header-dynamic").style.color = "white";

  // Body
  document.getElementById("modal-body-dynamic").innerHTML = `
    <p style="text-align: justify;">${data.description}</p>

    <h6 class="fw-bold mt-3">Características Principales</h6>
    <ul class="small text-secondary">
      ${data.features.map(f => `<li>${f}</li>`).join("")}
    </ul>

    <h6 class="fw-bold mt-4">Tecnologías Utilizadas</h6>
    <div class="d-flex flex-wrap gap-2 small">
      ${data.tech.map(t => `<span class="badge bg-light text-dark border">${t}</span>`).join("")}
    </div>

    <div class="mt-4">
      <p class="small text-muted mb-1">Acceso al proyecto:</p>
      <a href="${data.link}" target="_blank" class="btn btn-primary btn-sm px-3">Ver Proyecto</a>
    </div>
  `;

  // Footer
  document.getElementById("modal-footer-dynamic").innerHTML = `
    <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">Cerrar</button>
  `;
  document.getElementById("modal-footer-dynamic").style.background = "#f1f1f1";

  //const modal = new bootstrap.Modal(document.getElementById("projectModal"));
  //modal.show();
}
