var is_loading = false;

/**
 * Função responsável por criar o card do animal e o coloca dentro de uma col.
 * @param {Object} animal - Objeto com os dados do animal.
 * @return {Element} Retorna o elemento.
 */
function inserirAnimal(animal) {
  const colDiv = document.createElement("div");
  colDiv.className =
    "col-lg-4 col-sm-12 col-12 d-flex justify-content-center align-items-center p-3";
  const cardDiv = document.createElement("div");
  cardDiv.className = "card card-animal";
  cardDiv.dataset.id = animal.id;

  let is_favorito =
    JSON.parse(localStorage.getItem("favoritos") ?? "[]").filter((id) => {
      return id === animal.id;
    }).length > 0;

  cardDiv.innerHTML = `
    <img data-href="/detalhes.html?id=${animal.id}" src="${
    animal.primary_photo_cropped
      ? animal.primary_photo_cropped.full
      : "https://placehold.co/600x400?text=Sem%20imagem"
  }" class="card-img-top card-animal-link" alt="Imagem de um cão" />
    <div class="card-body">
        <div class="card-animal-link" data-href="/detalhes.html?id=${
          animal.id
        }">
        <h5 class="card-title">
            ${animal.name} <i class="fa ${
    animal.gender === "Female" ? "fa-venus" : "fa-mars"
  }" aria-hidden="true"></i>
        </h5>
        <h6 class="card-subtitle text-success">
            ${
              animal.breeds.primary
                ? animal.breeds.primary
                : "Raça não informada"
            }
        </h6>
        </div>
        <button class="btn btn-light mt-2 btn-${
          is_favorito ? "" : "adicionar-"
        }favorito" data-id="${animal.id}">
        ${is_favorito ? "Favorito" : "Adicionar aos favoritos"}
        </button>
    </div>
  `;

  colDiv.appendChild(cardDiv);
  return colDiv;
}

/**
 * Função responsável por adicionar os animais à lista.
 * @return Não retorna nada.
 */
function inserirAnimais() {
  let lista = document.getElementById("lista");

  if (animais_para_inserir.length === 0 && lista.children.length === 1) {
    lista.innerHTML = `
    <div class="col-12">
      <h1 class="text-center">Nenhum animal encontrado</h1>
    </div>
    `;
    return;
  } else if (lista.children.length > 1 && animais_para_inserir.length === 0) {
    const colDiv = document.createElement("div");
    colDiv.className = "col-12 text-center";
    colDiv.innerText = `Chegou ao fim da lista de animais disponíveis`;
    lista.appendChild(colDiv);
  }

  if (lista.children.length === 1) {
    lista.innerHTML = "";
  }

  document.getElementById("count").innerText =
    current_page * PER_PAGE < total ? current_page * PER_PAGE : total;

  document.getElementById("total").innerText = total;

  for (let i = 0; i < animais_para_inserir.length; i++) {
    if (i % 3 === 0) {
      var rowDiv = document.createElement("div");
      rowDiv.className = "row";
      lista.appendChild(rowDiv);
    }
    let card = inserirAnimal(animais_para_inserir[i]);
    rowDiv.appendChild(card);
  }
  animais_para_inserir = [];
  addListenerCards();
}

/**
 * Função responsável por lidar com o scroll infinito.
 * @return Não retorna nada.
 */
const handleScrollInfinito = () => {
  const endOfPage =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;

  if (endOfPage && !is_loading) {
    is_loading = true;
    fetchAnimais();
    setTimeout(function () {
      inserirAnimais();
      is_loading = false;
    }, 3000);
  }
};

window.addEventListener("scroll", handleScrollInfinito);
window.addEventListener("load", function () {
  fetchAnimais().then(() => {
    inserirAnimais();
    addListenerCards();
  });
});
