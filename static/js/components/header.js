/**
 * Função para definir a classe active no link do header e ser correspondente com a página atual
 * @summary Função para definir a classe active no link do header
 */
function definirActiveClassHeader() {
  let path = window.location.pathname.slice(1);
  path = path.split("/")[path.split("/").length - 1];
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
