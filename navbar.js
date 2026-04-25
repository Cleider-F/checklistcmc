export function carregarNavbar() {

  const navbarHTML = `
    <div class="navbar">

      <div class="nav-item" data-page="index.html">
        <div>🏠</div>
        <small>Home</small>
      </div>

      <div class="nav-item" data-page="inspecao.html">
        <div>🔍</div>
        <small>Inspeção</small>
      </div>

      <div class="nav-item" data-page="manutencao.html">
        <div>🔧</div>
        <small>Manutenção</small>
      </div>

      <div class="nav-item" data-page="tecnico.html">
        <div>🛠️</div>
        <small>Técnico</small>
      </div>

    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", navbarHTML);

  // 🔁 navegação
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      const pagina = item.getAttribute("data-page");
      window.location = pagina;
    });
  });

  // ⭐ destacar ativo
  const path = window.location.pathname;

  document.querySelectorAll(".nav-item").forEach(item => {
    const pagina = item.getAttribute("data-page");

    if (path.includes(pagina)) {
      item.classList.add("ativo");
    }
  });
}