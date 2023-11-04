window.onload = function () {
  const headerContainer = document.getElementById("header");
  const footerContainer = document.getElementById("footer");

  fetch("components/header.html")
    .then((response) => response.text())
    .then((data) => {
      headerContainer.innerHTML = data;
      definirActiveClassHeader();
    });
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerContainer.innerHTML = data;
    });
};
