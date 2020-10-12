const url = "http://www.omdbapi.com/?apikey=22e38317";
let busqueda = "";
let anyo = "";
let tipo = "";
let newUrl = "";
let randomUrl = "";
let opciones = "";
let poster = "";
let resultado = "";
let listaFavoritos = [];
let listaTemporal = []
/*----------------------------------------- Declaración de variables -----------------------------------------*/

/*----------------------------------------- Funciones -----------------------------------------*/

function search() {
  listaTemporal = []
  opciones = "";
  busqueda = document.getElementById("busqueda").value;
  anyo = document.getElementById("anyo").value;
  tipo = document.getElementById("tipo").value;
  fetch(finalUrl(busqueda, anyo, tipo))
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      if (datos.Response === "False") {
        window.alert("Ha habido un error, por favor, vuelve a intentarlo");
      } else {
        for (let i = 0; i < datos.Search.length; i++) {
          listaTemporal.push (datos.Search[i].imdbID)
          opciones += `<div class="polaroid">
        <img id="Poster" src="${
          datos.Search[i].Poster
        }" style="width: 100%" ; />
        <div class="container">
          <h2 id="titulo"><a onclick="peliID(${
            datos.Search[i].imdbID
          })" href="">${datos.Search[i].Title}</a></h2>
          <h4 id="anno">${datos.Search[i].Year}</h4>
        </div>
        <div id="favorito">
          <i onclick="hacerFavorito(${i})" id="favorito" class="material-icons">${esFavorito(datos.Search[i].imdbID)}</i>
        </div>
      </div>
      `;
        }
        console.log( typeof datos.Search[0].imdbID )
        document.getElementById("div2").innerHTML = opciones;
      }
    });
}

/* function peliID(id) {
  fetch(url + "&i=" + id)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(url + "&i=" + id);
      document.getElementById("div2").innerHTML = `
      <h1>${datos.Title}</h1>
      <img src="${datos.Poster}" alt="${datos.Title}" />
      <h3>${datos.Director}</h3>`;
    });
} */

function finalUrl(string, anyo, tipo) {
  if (anyo !== "") {
    newUrl = url + "&s=" + string + "&y=" + anyo + "&type=" + tipo;
  } else {
    newUrl = url + "&s=" + string + "&type=" + tipo;
  }
  return newUrl;
}



function randomPeli() {
  randomUrl = url + "&s=" + letrasRandom(2);
  fetch("http://www.omdbapi.com/?apikey=22e38317&s=Batman")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let random = Math.floor(Math.random() * datos.Search.length);
      poster = datos.Search[random].Poster;
      titulo = datos.Search[random].Title;
      anno = datos.Search[random].Year;

      document.getElementById("Poster").src = poster;
      document.getElementById("titulo").innerHTML = titulo;
      document.getElementById("anno").innerHTML = anno;
    });
}

function letrasRandom(tamano) {
  let resultado = "";
  let letras = "abcdefghijklmnopqrstuvwxyz";
  let longitud = letras.length;
  for (var i = 0; i < tamano; i++) {
    resultado += letras.charAt(Math.floor(Math.random() * longitud));
  }
  return resultado;
}





function esFavorito(id) {
  for (let i = 0; i <= listaFavoritos.length; i++) {
    if (listaFavoritos[i] == id) {
      return "favorite";
    } else {
      return "favorite_border";
    }
  }
}

function hacerFavorito(id) {
  listaFavoritos.push(listaTemporal[id]);
  localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos));
}
