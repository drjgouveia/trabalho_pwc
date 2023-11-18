var next_link = "";
var animais_para_inserir = [];
const PER_PAGE = 12;
var current_page = 1;
var total = 0;

/**
 * Função responsável por adquirir o token de acesso da API
 * @param {boolean} force - forçar a obtenção de um novo token
 * @returns
 */
function obterToken(force = false) {
  return new Promise(async (resolve, reject) => {
    let token = localStorage.getItem("token");
    if (token === null || force) {
      await $.ajax({
        url: "https://api.petfinder.com/v2/oauth2/token",
        type: "POST",
        crossDomain: true,
        data: {
          grant_type: "client_credentials",
          client_id: "VCyR2g0ZwUlLuzrj5Jb5LE1EN8RGCF2nfHDncOtFUa2Y6dpdaD",
          client_secret: "NedKoPPpa1saKJjZiS7xHM6W7AZ3jNJolusLyzTz",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
        success: function (data) {
          localStorage.setItem("token", data.access_token);
          resolve(localStorage.getItem("token"));
        },
        error: function (error) {
          reject(error);
        },
      });
    } else {
      resolve(localStorage.getItem("token"));
    }
  });
}

/**
 * Função responsável por ir buscar os animais à API por IDs
 * @param {any[]} ids
 * @returns {Promise} - Promise
 */
async function fetchAnimaisPorID(ids) {
  return new Promise((resolve, reject) => {
    obterToken(true).then(async (token) => {
      for (let i = 0; i < ids.length; i++) {
        if (ids[i] !== null) {
          await $.ajax({
            url: `https://api.petfinder.com/v2/animals/${ids[i]}`,
            type: "GET",
            crossDomain: true,
            headers: {
              Authorization: "Bearer " + token,
            },
            success: function (data) {
              if (data !== null) {
                animais_para_inserir.push(data.animal);
              }
            },

            statusCode: {
              401: function () {
                obterToken(true).then(() => {
                  fetchAnimaisPorID(ids).then(() => {
                    resolve();
                  });
                });
              },
              404: function () {
                localStorage.setItem(
                  "favoritos",
                  JSON.stringify(
                    JSON.parse(
                      localStorage.getItem("favoritos") ?? "[]"
                    ).filter((id) => id !== ids[i] && id !== null)
                  )
                );
              },
            },
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

/**
 * Função responsável por ir buscar os animais à API
 * @returns {Promise}
 */
function fetchAnimais() {
  return new Promise((resolve, reject) => {
    let spinner = document.getElementById("lista-loading");
    spinner.classList.remove("d-none");
    const token = obterToken().then(async (token) => {
      await $.ajax({
        url: next_link
          ? "https://api.petfinder.com" + next_link
          : `https://api.petfinder.com/v2/animals?sort=recent&limit=${PER_PAGE}&type=dog&status=adoptable`,
        type: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        crossDomain: true,
        statusCode: {
          401: function () {
            obterToken(true).then(() => {
              fetchAnimais().then(() => {
                resolve();
              });
            });
          },
        },
        error: function (error) {
          let lista = document.getElementById("lista");
          lista.innerHTML = `
            <div class="col-12">
              <p class="text-center">Não foi possível procurar nenhum animal</p>
            </div>
          `;
        },
        success: function (data) {
          next_link = data.pagination._links.next.href;
          current_page = data.pagination.current_page;
          total = data.pagination.total_count;
          animais_para_inserir.push(...data.animals);
          $(spinner).addClass("d-none");
          resolve();
        },
      });
    });
  });
}
