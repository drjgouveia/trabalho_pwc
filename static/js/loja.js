const data = [
  {
    id: 1,
    nome: "Ração Purina One",
    preco: 8.99,
    image_url:
      "https://www.continente.pt/dw/image/v2/BDVS_PRD/on/demandware.static/-/Sites-col-master-catalog/default/dwc788e51d/images/zu/708/7081814-frente.jpg?sw=2000&sh=2000",
  },
  {
    id: 2,
    nome: "Ração Pedigree",
    preco: 10.99,
    image_url:
      "https://www.continente.pt/dw/image/v2/BDVS_PRD/on/demandware.static/-/Sites-col-master-catalog/default/dw48fcb82a/images/col/651/6515248-esquerdo.jpg?sw=2000&sh=2000",
  },
  {
    id: 3,
    nome: "Coleira rosa",
    preco: 3.55,
    image_url:
      "https://www.kiwoko.pt/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw9559cd3d/images/outech_paseo_perro_KWK14039.jpg?sw=780&sh=780&q=85",
  },
  {
    id: 4,
    nome: "Coleira preta",
    preco: 3.55,
    image_url:
      "https://www.lojadocao.pt/image/cache/data/coleiras_RD/N_red_preto-800x800.jpg",
  },
  {
    id: 5,
    nome: "Harness",
    preco: 13.25,
    image_url:
      "https://hurtta.com/cdn/shop/products/42be1543f9dc5f68128ba05487a28e75_600x.jpg?v=1674032976",
  },
  {
    id: 6,
    nome: "Ração Salvaje",
    preco: 19.99,
    image_url:
      "https://www.tiendanimal.pt/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw7c00c137/images/pienso_perros_adultos_salvaje_original_pollo_SAJ14971_M.jpg?sw=780&sh=780&q=85",
  },
  {
    id: 7,
    nome: "Ração Pétis",
    preco: 12.99,
    image_url:
      "https://petnow.pt/83041-large_default/petis-natural-racao-seca-para-cao-adulto-pequeno-frango.jpg",
  },
  {
    id: 8,
    nome: "Ração Petlife",
    preco: 15.99,
    image_url: "https://imgs.casasbahia.com.br/1560716955/1xg.jpg",
  },
  {
    id: 9,
    nome: "Ração Petlove",
    preco: 13.99,
    image_url: "https://placehold.co/600x400?text=Sem%20imagem",
  },
];

function insertProduct(product) {
  let obj =
    JSON.parse(localStorage.getItem("carrinho") ?? "[]").filter((obj) => {
      return product.id === obj.id;
    }).length > 0
      ? JSON.parse(localStorage.getItem("carrinho") ?? "[]").filter((obj) => {
          return product.id === obj.id;
        })[0]
      : null;

  let colDiv;
  let cardDiv;
  if (obj) {
    colDiv = document.createElement("div");
    colDiv.className =
      "col-lg-4 col-sm-12 col-12 d-flex justify-content-center align-items-center p-3";
    cardDiv = document.createElement("div");
    cardDiv.className = "card card-loja";

    cardDiv.innerHTML = `
        <img
            src="${product.image_url}"
            class="card-img-top"
        />
        <div class="card-body">
            <div class="card-loja-link" data-href="https://example.com">
                <h5 class="card-title">
                    ${product.nome}
                </h5>
                <h6 class="card-subtitle text-success">
                    ${product.preco} €
                </h6>
            </div>
            <div class="card-actions row mt-2" data-id="${product.id}">
                <div class="col-8">
                    <div class="btn w-100 btn-light contador">
                        ${obj.quantidade}
                    </div>
                </div>
                <div class="col-2">
                    <button class="btn w-100 btn-light btn-adicionar">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div class="col-2">
                    <button class="btn w-100 btn-light btn-remover" ${
                      obj.quantidade > 1 ? "" : "disabled"
                    }>
                        <i class="fa-solid fa-minus"></i>
                    </button>
                </div>
              </div>
        </div>`;
  } else {
    colDiv = document.createElement("div");
    colDiv.className =
      "col-lg-4 col-sm-12 col-12 d-flex justify-content-center align-items-center p-3";
    cardDiv = document.createElement("div");
    cardDiv.className = "card card-loja";

    cardDiv.innerHTML = `
        <img
            src="${product.image_url}"
            class="card-img-top"
        />
        <div class="card-body">
            <div class="card-loja-link" data-href="https://example.com">
                <h5 class="card-title">
                    ${product.nome}
                </h5>
                <h6 class="card-subtitle text-success">
                    ${product.preco} €
                </h6>
            </div>
            <div class="card-actions row" data-id="${product.id}">
                <div class="col">
                    <button class="btn w-100 btn-light mt-2 btn-comprar">
                    Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>`;
  }

  colDiv.appendChild(cardDiv);
  return colDiv;
}

function inserirProdutos() {
  document.getElementById("lista-loading").classList.remove("d-none");
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  let rowDiv = document.createElement("div");
  if (data.length < 1) {
    const colDiv = document.createElement("div");
    colDiv.className = "col-12 text-center";
    colDiv.innerText = `Chegou ao fim da lista de produtos disponíveis`;
    rowDiv.appendChild(colDiv);
    lista.appendChild(rowDiv);
    return;
  }

  for (let i = 0; i < data.length; i++) {
    if (i % 3 === 0) {
      rowDiv = document.createElement("div");
      rowDiv.className = "row";
      lista.appendChild(rowDiv);
    }

    rowDiv.appendChild(insertProduct(data[i]));
  }

  document.getElementById("lista-loading").classList.add("d-none");
}

window.addEventListener("load", function () {
  inserirProdutos();
  addListenerEventsLoja();
});
