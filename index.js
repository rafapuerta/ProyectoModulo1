const url = "http://www.omdbapi.com/?apikey=22e38317";
let busqueda = "";
let anyo = ""
let tipo = ""
let newUrl = "";
let randomUrl = "";
let opciones = "";
let poster = "";
let resultado = ""
/*----------------------------------------- Declaración de variables -----------------------------------------*/
window.onload = randomPeli();

/*----------------------------------------- Funciones -----------------------------------------*/

function search() {
  opciones = ""
  busqueda = document.getElementById("busqueda").value;
  anyo = document.getElementById("anyo").value
  tipo = document.getElementById("tipo").value
  fetch(finalUrl(busqueda, anyo, tipo))
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(newUrl)
      for (let i = 0; i < datos.Search.length; i++) {
        opciones += `<tr><td><img src="${datos.Search[i].Poster}" alt=""/></td><td><a href="peliID(${datos.Search[i].imdbID})">${datos.Search[i].Title}</a></td></tr>`;/*hacer que el link llame a la funcion peliID(id)*/
      }
      
      document.getElementById("div").innerHTML = `
      <table>
      <thead>
      <tr></tr>
      <tr></tr>
      </thead>
      <tbody>
      ${opciones}
      </tbody>
      </table>`
    });
}

function peliID(id){
  fetch(url + "&i=" + id)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      document.getElementById("div2").innerHTML = `
      <h1>${datos.Title}</h1>
      <img src="${datos.Poster}" alt="${datos.Title}" />
      <h3>${datos.Director}</h3>`
    });
  }

function finalUrl(string,anyo,tipo){
  if ( anyo !== ""){
    newUrl = url + "&s=" + string + "&y=" + anyo + "&type=" + tipo
  }else{
    newUrl = url + "&s=" + string + "&type=" + tipo
  }
  return  newUrl
}

function randomPeli() {
  randomUrl = url + "&s=" + letrasRandom(2);
  fetch("http://www.omdbapi.com/?apikey=22e38317&s=Batman")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let random = Math.floor(Math.random() * datos.Search.length)
      poster = datos.Search[random].Poster;
      titulo = datos.Search[random].Title
      anno = datos.Search[random].Year

      document.getElementById('Poster').src = poster
      document.getElementById("titulo").innerHTML = titulo
      document.getElementById("anno").innerHTML = anno
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

