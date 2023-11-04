function loadDados() {
  return new Promise((resolve, reject) => {
    let spinner = document.getElementById("lista-loading");
    spinner.classList.remove("d-none");
    ids = JSON.parse(localStorage.getItem("favoritos") ?? "[]");
    fetchAnimaisPorID(ids).then(() => {
      spinner.classList.add("d-none");
      resolve();
    });
  });
}

function inserirAnimal(animal) {
  // Assuming "elemento" is the ID of the div you want to append to
  const colDiv = document.createElement("div");
  colDiv.className =
    "col-lg-4 col-sm-12 col-12 d-flex justify-content-center align-items-center p-3";
  const cardDiv = document.createElement("div");
  cardDiv.className = "card card-animal";
  cardDiv.dataset.id = animal.id;

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
        <button class="btn btn-light mt-2 btn-favorito btn-lista-favoritos" data-id="${
          animal.id
        }">
        Favorito
        </button>
    </div>
  `;

  colDiv.appendChild(cardDiv);
  return colDiv;
}

function inserirAnimais() {
  let lista = document.getElementById("lista");

  if (animais_para_inserir.length === 0) {
    lista.innerHTML = `
    <div class="col-12">
      <p class="text-center">Nenhum animal nos favoritos</p>
    </div>
    `;
    return;
  } else if (lista.children.length > 1) {
    const colDiv = document.createElement("div");
    colDiv.className = "col-12 text-center";
    colDiv.innerText = `Chegou ao fim da lista de animais disponíveis`;
    lista.appendChild(colDiv);
  }

  if (lista.children.length === 1) {
    lista.innerHTML = "";
  }

  for (let i = 0; i < animais_para_inserir.length; i++) {
    if (i % 3 === 0) {
      var rowDiv = document.createElement("div");
      rowDiv.className = "row";
      elemento.appendChild(rowDiv);
    }
    let card = inserirAnimal(animais_para_inserir[i]);
    rowDiv.appendChild(card);
  }
  animais_para_inserir = [];
  addListenerCards();
}

window.addEventListener("load", function () {
  loadDados().then(() => {
    inserirAnimais();
    addListenerCards();
  });
});
