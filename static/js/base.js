/**
 * Função para carregar o header e o footer em todas as páginas
 */
$(document).ready(function () {
  const headerContainer = $("#header");
  const footerContainer = $("#footer");

  $.ajax({
    url: "components/header.html",
    success: function (data) {
      headerContainer.html(data);
      definirActiveClassHeader();
    },
  });

  $.ajax({
    url: "components/footer.html",
    success: function (data) {
      footerContainer.html(data);
    },
  });
});
