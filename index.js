const url = "http://www.omdbapi.com/?apikey=22e38317";
let busqueda = ""
let newUrl = ""
let opciones = ""
/* Declaración de variables */

/* Funciones */

function searchTitle() {
  busqueda = document.getElementById("busqueda").value;
  console.log(busqueda);
  newUrl = url + "?s=" + busqueda
  console.log(newUrl)
  fetch(newUrl)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      for (let i = 0; i < datos.Search.length; i++) {
        opciones += `<p>${datos.Search[i].Title}</p>`;
      }
      document.getElementById("div").innerHTML = opciones;
    });
}
