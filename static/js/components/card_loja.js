function onClickAdicionarContador(e) {
  let novo_valor =
    parseInt(
      e.target.parentElement.parentElement.parentElement.querySelector(
        ".contador"
      ).innerText
    ) + 1;
  e.target.parentElement.parentElement.parentElement.querySelector(
    ".contador"
  ).innerText = novo_valor;

  if (novo_valor > 1) {
    e.target.parentElement.parentElement.parentElement.querySelector(
      ".btn-remover"
    ).disabled = false;
  }

  localStorage.setItem(
    "carrinho",
    JSON.stringify(
      JSON.parse(localStorage.getItem("carrinho") ?? "[]")
        .filter((obj) => {
          return (
            obj.id !==
            parseInt(
              e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".card-actions"
              ).dataset.id
            )
          );
        })
        .concat([
          {
            id: parseInt(
              e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".card-actions"
              ).dataset.id
            ),
            quantidade: parseInt(
              e.target.parentElement.parentElement.parentElement.querySelector(
                ".contador"
              ).innerText
            ),
          },
        ])
    )
  );
}

function onClickRemoverContador(e) {
  let novo_valor =
    parseInt(
      e.target.parentElement.parentElement.parentElement.querySelector(
        ".contador"
      ).innerText
    ) - 1;

  e.target.parentElement.parentElement.parentElement.querySelector(
    ".contador"
  ).innerText = novo_valor;

  if (novo_valor > 1) {
    e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
      ".btn-remover"
    ).disabled = false;
  } else {
    e.target.parentElement.parentElement.parentElement.querySelector(
      ".btn-remover"
    ).disabled = true;
  }

  localStorage.setItem(
    "carrinho",
    JSON.stringify(
      JSON.parse(localStorage.getItem("carrinho") ?? "[]")
        .filter((obj) => {
          return (
            obj.id !==
            parseInt(
              e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".card-actions"
              ).dataset.id
            )
          );
        })
        .concat([
          {
            id: parseInt(
              e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".card-actions"
              ).dataset.id
            ),
            quantidade: parseInt(
              e.target.parentElement.parentElement.parentElement.querySelector(
                ".contador"
              ).innerText
            ),
          },
        ])
    )
  );
}

function onClickContador(e) {
  localStorage.setItem(
    "carrinho",
    JSON.stringify(
      JSON.parse(localStorage.getItem("carrinho") ?? "[]").filter(
        (item) =>
          item.id !== parseInt(e.target.parentElement.parentElement.dataset.id)
      )
    )
  );

  e.target.parentElement.parentElement.classList.remove("mt-2");
  e.target.parentElement.parentElement.innerHTML = `
    <div class="col">
      <button class="btn w-100 btn-light mt-2 btn-comprar">
        Adicionar ao carrinho
      </button>
    </div>
  `;
  addListenerEventsLoja();
}

function onHoverContador(e) {
  e.target.dataset.contador = e.target.innerText;
  e.target.classList.add("btn-remover-carrinho");
  e.target.innerText = "Remover do carrinho";
}

function onLeaveContador(e) {
  e.target.innerText = e.target.dataset.contador;
  e.target.classList.remove("btn-remover-carrinho");
}

function onClickAdicionar(e) {
  localStorage.setItem(
    "carrinho",
    JSON.stringify(
      JSON.parse(localStorage.getItem("carrinho") ?? "[]").concat([
        {
          id: parseInt(e.target.parentElement.parentElement.dataset.id),
          quantidade: 1,
        },
      ])
    )
  );

  e.target.parentElement.parentElement.classList.add("mt-2");
  e.target.parentElement.parentElement.innerHTML = `
    <div class="col-8">
        <div class="btn w-100 btn-light contador">
        1
        </div>
    </div>
    <div class="col-2">
        <button class="btn w-100 btn-light btn-adicionar">
          <i class="fa-solid fa-plus"></i>
        </button>
    </div>
    <div class="col-2">
        <button class="btn w-100 btn-light btn-remover" disabled>
          <i class="fa-solid fa-minus"></i>
        </button>
    </div>
  `;
  addListenerEventsLoja();
}

function addListenerEventsLoja() {
  document.querySelectorAll(".btn-adicionar").forEach((btn) => {
    btn.addEventListener("click", onClickAdicionarContador);
  });
  document.querySelectorAll(".btn-remover").forEach((btn) => {
    btn.addEventListener("click", onClickRemoverContador);
  });
  document.querySelectorAll(".contador").forEach((contador) => {
    contador.addEventListener("mouseover", onHoverContador);
    contador.addEventListener("mouseleave", onLeaveContador);
    contador.addEventListener("click", onClickContador);
  });
  document.querySelectorAll(".btn-comprar").forEach((btn) => {
    btn.addEventListener("click", onClickAdicionar);
  });
}
