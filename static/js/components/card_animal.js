/**
 * Handler para o click no botão "adicionar aos favoritos".
 * @param {Event} e - evento.
 * @return {null} Não retorna nada
 */
function onClickAdicionarFavorito(e) {
  e.target.innerHTML = "Favorito";
  e.target.classList.add("btn-favorito");
  e.target.classList.remove("btn-adicionar-favorito");
  e.target.classList.remove("btn-remover-favorito");

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

  e.target.removeEventListener("click", onClickAdicionarFavorito, false);
  e.target.addEventListener("click", onClickFavorito, false);
  e.target.addEventListener("mouseout", onMouseOutFavorito, false);
  e.target.addEventListener("mouseover", onMouseoverFavorito, false);
}

/**
 * Handler para o fazer hover no botão "Favorito".
 * @summary Muda o texto do botão para "Remover dos favoritos" e adiciona a classe "btn-remover-favorito"
 * @param {Event} e - evento.
 * @return {null} Não retorna nada
 */
function onMouseoverFavorito(e) {
  e.target.innerHTML = "Remover dos favoritos";
  e.target.classList.add("btn-remover-favorito");
  e.target.classList.remove("btn-favorito");
}

/**
 * Handler para o tirar o mouse do botão "Favorito".
 * @summary Muda o texto do botão para "Favorito" e adiciona a classe "btn-favorito"
 * @param {Event} e - evento.
 * @return {null} Não retorna nada
 */
function onMouseOutFavorito(e) {
  e.target.innerHTML = "Favorito";
  e.target.classList.remove("btn-remover-favorito");
  e.target.classList.add("btn-favorito");
  e.target.addEventListener("mouseover", onMouseoverFavorito, false);
}

/**
 * Handler para o click no botão "Favorito".
 * @summary Muda o texto do botão para "Adicionar aos favoritos" e adiciona a classe "btn-adicionar-favorito", além de remover o id do animal do localStorage.
 * @param {Event} e - evento.
 * @return {null} Não retorna nada
 */
function onClickFavorito(e) {
  e.target.innerHTML = "Adicionar aos favoritos";
  e.target.classList.add("btn-adicionar-favorito");
  e.target.classList.remove("btn-favorito");
  e.target.classList.remove("btn-remover-favorito");

  localStorage.setItem(
    "favoritos",
    JSON.stringify(
      JSON.parse(localStorage.getItem("favoritos") ?? "[]").filter(
        (id) => id !== parseInt(e.target.dataset.id) && id !== null
      )
    )
  );

  e.target.removeEventListener("click", onClickFavorito, false);
  e.target.addEventListener("click", onClickAdicionarFavorito, false);
  e.target.removeEventListener("mouseover", onMouseoverFavorito, false);
  e.target.removeEventListener("mouseout", onMouseOutFavorito, false);
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
  var button_adicionar_favorito_elementos = document.getElementsByClassName(
    "btn-adicionar-favorito"
  );
  for (var i = 0; i < button_adicionar_favorito_elementos.length; i++) {
    button_adicionar_favorito_elementos[i].addEventListener(
      "click",
      onClickAdicionarFavorito,
      false
    );
  }

  var button_favorito_elementos = document.getElementsByClassName(
    "btn-favorito"
  );
  for (var i = 0; i < button_favorito_elementos.length; i++) {
    button_favorito_elementos[i].addEventListener(
      "click",
      onClickFavorito,
      false
    );

    button_favorito_elementos[i].addEventListener(
      "click",
      onClickFavorito,
      false
    );
    button_favorito_elementos[i].addEventListener(
      "mouseout",
      onMouseOutFavorito,
      false
    );

    button_favorito_elementos[i].addEventListener(
      "mouseover",
      onMouseoverFavorito,
      false
    );
  }

  var button_lista_favoritos = document.getElementsByClassName(
    "btn-lista-favoritos"
  );
  for (var i = 0; i < button_lista_favoritos.length; i++) {
    button_favorito_elementos[i].addEventListener(
      "click",
      onClickFavorito,
      false
    );

    button_favorito_elementos[i].addEventListener(
      "click",
      onClickListaFavoritos,
      false
    );
  }

  var card_animal_elements = document.getElementsByClassName(
    "card-animal-link"
  );

  for (var i = 0; i < card_animal_elements.length; i++) {
    card_animal_elements[i].addEventListener(
      "click",
      function (e) {
        window.location.href = e.currentTarget.dataset.href;
      },
      false
    );
  }
}

window.addEventListener("load", function () {
  addListenerCards();
});
