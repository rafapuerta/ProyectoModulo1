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
let listaTemporal2 = []
let favoritos = ""
let posicion
/*----------------------------------------- Declaración de variables -----------------------------------------*/

actualizaFavoritos()

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
          <h3 id="titulo"><a onclick="peliID(${i})">${datos.Search[i].Title}</a></h3>
          <h5 id="anno">${datos.Search[i].Year}</h5>
        </div>
        <div id="favorito">
          <i onclick="hacerFavorito(${i})" id="favorito" class="material-icons">${esFavorito(datos.Search[i].imdbID)}</i>
        </div>
      </div>
      `;
        }
        document.getElementById("div2").innerHTML = opciones;
      }
    });
}

function peliID(id) {
  console.log(listaTemporal[id])
  abrePop();
  fetch(url + "&i=" + listaTemporal[id])
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      document.getElementById("infoPeli").innerHTML = 
      `<div id="peliFavorita">
      <div id="peliFavoritaPoster2">
        <img src="${datos.Poster}" alt="${datos.Title}"/>
      </div>
      <div id="peliFavoritaDatos">
        <h3>${datos.Title}</h3>
        <h4>${datos.Year}</h4>
        <h6><strong> Duración:</strong> ${datos.Runtime}</h6>
        <h6><strong> Director:</strong>  ${datos.Director}</h6>
        <h6><strong> Premios:</strong>  ${datos.Awards}</h6>
        <h6><strong> Puntuancion:</strong>  Rotten Tomatoes: ${datos.Ratings[1].Value}</h6>
        <p>${datos.Plot}</p>
        
      </div>
    </div>`;
    });
}

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
      /* document.getElementById("titulo").innerHTML = titulo;
      document.getElementById("anno").innerHTML = anno; */
    });
}

function letrasRandom(tamano) {
  let resultado = "";
  let letras = "abcdefghijklmnopqrstuvwxyz";
  let longitud = letras.length;
  for (let i = 0; i < tamano; i++) {
    resultado += letras.charAt(Math.floor(Math.random() * longitud));
  }
  return resultado;
}



function actualizaFavoritos (){
  if (localStorage.getItem('listaFavoritos') == null){
    localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos))
  }
  listaFavoritos = JSON.parse(localStorage.getItem('listaFavoritos'))
}

function esFavorito(id) {
  if (listaFavoritos.includes(id)){
      return "favorite";
    } else {
      return "favorite_border";
    }
}

function hacerFavorito(id) {
    /* console.log(id)
    console.log(listaFavoritos)
    console.log(listaTemporal[id]) */
    if ( !listaFavoritos.includes(listaTemporal[id])){
      listaFavoritos.push(listaTemporal[id]);
      localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos));
    }else{
      listaFavoritos.splice(listaFavoritos.indexOf(listaTemporal[id]),listaFavoritos.indexOf(listaTemporal[id])+1)
      localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos));
    }
}

function ensenaFavoritos(){
  listaTemporal = []
  actualizaFavoritos();
  if (listaFavoritos[0] !== undefined){
    for (let i = 0 ; i< listaFavoritos.length ; i++){
      fetch(url + "&i=" + listaFavoritos[i])
        .then(function (respuesta) {
          return respuesta.json();
        })
        .then(function (datos) {
          listaTemporal.push(datos.imdbID)
          favoritos += `<div id="peliFavorita">
          <div id="peliFavoritaPoster">
            <img src="${datos.Poster}" alt="${datos.Title}"/>
            <i onclick="hacerFavorito(${i})" id="favorito" class="material-icons">${esFavorito(datos.imdbID)}</i>
          </div>
          <div id="peliFavoritaDatos">
            <h3>${datos.Title}</h3>
            <h4>${datos.Year}</h4>
            <h6><strong> Duración:</strong> ${datos.Runtime}</h6>
            <h6><strong> Director:</strong>  ${datos.Director}</h6>
            <h6><strong> Premios:</strong>  ${datos.Awards}</h6>
            <h6><strong> Puntuancion:</strong>  Rotten Tomatoes: ${datos.Ratings[1].Value}</h6>
            <p>${datos.Plot}</p>
            
          </div>
        </div>`
        document.getElementById("divFavoritos").innerHTML = favoritos
    })
  };
  }else{
    document.getElementById("divFavoritos").innerHTML = "<h1>Oops!</h1><h4>No tienes favoritos guardados</h4>"
  }
  
}

function abrePop() {
  document.getElementById("popup").style.display = "block";
}

function cierraPop() {
  document.getElementById("popup").style.display = "none";
}