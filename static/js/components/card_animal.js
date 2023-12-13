/**
 * Handler para o click no botão "adicionar aos favoritos".
 * @param {Event} e - evento.
 * @return {null} Não retorna nada
 */
function onClickAdicionarFavorito(e) {
  $(e.target).text("Favorito");
  $(e.target).addClass("btn-favorito");
  $(e.target).removeClass("btn-adicionar-favorito");
  $(e.target).removeClass("btn-remover-favorito");

  if (e.target.dataset.id !== null) {
    localStorage.setItem(
      "favoritos",
      JSON.stringify(
        JSON.parse(localStorage.getItem("favoritos") ?? "[]").concat([
          parseInt(e.target.dataset.id),
        ])
      )
    );
  }

  $(e.target).off();
  $(e.target).on("click", onClickFavorito);
  $(e.target).on("mouseout", onMouseOutFavorito);
  $(e.target).on("mouseover", onMouseoverFavorito);
}

/**
 * Handler para o fazer hover no botão "Favorito".
 * @summary Muda o texto do botão para "Remover dos favoritos" e adiciona a classe "btn-remover-favorito"
 * @param {Event} e - evento.
 * @return {null} Não retorna nada
 */
function onMouseoverFavorito(e) {
  $(e.target).text("Remover dos favoritos");
  $(e.target).addClass("btn-remover-favorito");
  $(e.target).removeClass("btn-favorito");
}

/**
 * Handler para o tirar o mouse do botão "Favorito".
 * @summary Muda o texto do botão para "Favorito" e adiciona a classe "btn-favorito"
 * @param {Event} e - evento.
 * @return {null} Não retorna nada
 */
function onMouseOutFavorito(e) {
  $(e.target).text("Favorito");
  $(e.target).removeClass("btn-remover-favorito");
  $(e.target).addClass("btn-favorito");
}

/**
 * Handler para o click no botão "Favorito".
 * @summary Muda o texto do botão para "Adicionar aos favoritos" e adiciona a classe "btn-adicionar-favorito", além de remover o id do animal do localStorage.
 * @param {Event} e - evento.
 * @return {null} Não retorna nada
 */
function onClickFavorito(e) {
  $(e.target).text("Adicionar aos favoritos");
  $(e.target).addClass("btn-adicionar-favorito");
  $(e.target).removeClass("btn-favorito");
  $(e.target).removeClass("btn-remover-favorito");

  localStorage.setItem(
    "favoritos",
    JSON.stringify(
      JSON.parse(localStorage.getItem("favoritos") ?? "[]").filter(
        (id) => id !== parseInt(e.target.dataset.id) && id !== null
      )
    )
  );

  $(e.target).off();
  $(e.target).on("click", onClickAdicionarFavorito);
}

/**
 * Handler para o click no botão "lista de favoritos".
 * @param {Event} e - evento.
 * @return {null} Não retorna nada
 */
function onClickListaFavoritos(e) {
  e.target.parentElement.parentElement.parentElement.remove();
}

/**
 * Função responsável por adicionar os listeners nos cards.
 * @return Não retorna nada.
 */
function addListenerCards() {
  $(".btn-adicionar-favorito").off();
  $(".btn-adicionar-favorito").on("click", onClickAdicionarFavorito);

  $(".btn-favorito").off();
  $(".btn-favorito")
    .on("click", onClickFavorito)
    .on("mouseout", onMouseOutFavorito)
    .on("mouseover", onMouseoverFavorito);

  $(".btn-lista-favorito").off();
  $(".btn-lista-favoritos").on("click", onClickListaFavoritos);

  $(".card-animal-link").off();
  $(".card-animal-link").on("click", function (e) {
    window.location.href = e.currentTarget.dataset.href;
  });
}

window.addEventListener("load", function () {
  addListenerCards();
});
