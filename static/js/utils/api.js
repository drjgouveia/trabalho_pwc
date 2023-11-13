var next_link = "";
var animais_para_inserir = [];
const PER_PAGE = 12;
var current_page = 1;
var total = 0;

function obterToken(force = false) {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    if (token === null || force) {
      fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        body:
          "grant_type=client_credentials&client_id=VCyR2g0ZwUlLuzrj5Jb5LE1EN8RGCF2nfHDncOtFUa2Y6dpdaD&client_secret=NedKoPPpa1saKJjZiS7xHM6W7AZ3jNJolusLyzTz",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("token", data.access_token);
          resolve(localStorage.getItem("token"));
        });
    } else {
      resolve(localStorage.getItem("token"));
    }
  });
}

async function fetchAnimaisPorID(ids) {
  return new Promise((resolve, reject) => {
    obterToken(true).then(async (token) => {
      for (let i = 0; i < ids.length; i++) {
        if (ids[i] !== null) {
          await fetch(`https://api.petfinder.com/v2/animals/${ids[i]}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => {
              if (response.status === 401) {
                obterToken(true).then(() => {
                  fetchAnimaisPorID(ids);
                  resolve();
                });
              } else if (response.status === 404) {
                localStorage.setItem(
                  "favoritos",
                  JSON.stringify(
                    JSON.parse(
                      localStorage.getItem("favoritos") ?? "[]"
                    ).filter((id) => id !== ids[i] && id !== null)
                  )
                );
                return null;
              } else {
                return response.json();
              }
            })
            .then((data) => {
              if (data !== null) {
                animais_para_inserir.push(data.animal);
              }
            });
        } else {
          localStorage.setItem(
            "favoritos",
            JSON.stringify(
              JSON.parse(localStorage.getItem("favoritos") ?? "[]").filter(
                (id) => id !== null
              )
            )
          );
        }
      }
      resolve();
    });
  });
}

function fetchAnimais() {
  return new Promise((resolve, reject) => {
    let spinner = document.getElementById("lista-loading");
    spinner.classList.remove("d-none");
    const token = obterToken().then((token) => {
      fetch(
        next_link
          ? "https://api.petfinder.com" + next_link
          : `https://api.petfinder.com/v2/animals?sort=recent&limit=${PER_PAGE}&type=dog&status=adoptable`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .catch((error) => {
          let lista = document.getElementById("lista");
          lista.innerHTML = `
            <div class="col-12">
              <h6 class="text-center">Não foi possível procurar nenhum animal</h6>
            </div>
          `;
        })
        .then((response) => {
          if (response.status === 401) {
            obterToken(true).then(() => {
              fetchAnimais();
              resolve();
            });
          } else {
            return response.json();
          }
        })
        .then((data) => {
          next_link = data.pagination._links.next.href;
          current_page = data.pagination.current_page;
          total = data.pagination.total_count;
          animais_para_inserir.push(...data.animals);
          spinner.classList.add("d-none");
          resolve();
        });
    });
  });
}
