var numero = 5; // asignacion basica
var _Numero = 10; // _al inicio
var numeroDos = 13; //camelCase
var numero_tres = 14; // _ para separar

const numero2 = 10; //Constantes

var numero = 88; //reasignacion

//console.log(numero); //impresion en consola

let edad = 60; //Inicializar solo una vez
//var edad = 33; Error

let i = 50; // i fuera del scope del for

for (let i = 0; i < 5; i++) {
  //console.log(i); // i solo vive en el for
}

// [i = 50]

if (true) {
  let numero = 55;
}
// [numero = is not defined]


//const miNumero;
//console.log(miNumero); Missing initializer

//const a = 0;
//const a = 0; Error no se pueden reasignar

const arr = [55,66,33];
//arr = [55,66,33,10]; no se puede
arr.push(10); //propiedad valida, se puede agregar valores

////////////      DOM

let h1 = document.getElementById('titulo');

//console.log(h1.innerHTML); //innertHTML es el texto del ID titulo

h1.innerHTML = "Mi nuevo titulo"; //Modificar el texto

h1.style.color = "red"; //Modificar colores del 'ID'


let parrafo = document.getElementById('parrafo');// By ID
let parrafo2 = document.getElementsByClassName('lead'); // By Class

let boton = document.getElementById('button');

function cambiar () {
  parrafo.style.color = "olive";
}

boton.onclick = function (){
  parrafo.style.color = "olive";
  // cambiar;
}

let miParrafo = document.querySelector('p'); //mi primer parrafo
let misParrafos = document.querySelectorAll('p'); //mis parrafo


boton.addEventListener('click',function(){
  console.log("cliiiick");
});

function saludar (nombre){ //funcion tradicional
  return "Hola " + nombre;
}

h1.innerHTML = saludar("Santy");

// function arrow

var saludar2 = nombre => "Hola " + nombre;

h1.innerHTML = saludar2("pedrito");

let resultado = document.getElementById('suma');

var sumar = (numero1,numero2) => {
  return numero1 + numero2
};

resultado.innerHTML += sumar(2,10);

//OBJETOS

let objeto = {
  nombre: 'HTML',
  duracion: 15,
  estado: true,
  caps: {
    nombre: "Intro",
    duracion: 20
  }
}

//Array de objetos
let arrObjetos = [
  {
    nombre: "A",
    estado: true
  },
  {
    nombre: "B",
    estado: false
  },
  {
    nombre: "C",
    estado: true
  }
];

for(let i of arrObjetos){
  if(i.estado){
    //console.log(i);
  }
};


//console.log(objeto["nombre"]); [ HTML ]
//console.log(objeto.nombre); [ HTML ]

//CONSUMO DE APIs
let contenido = document.querySelector('#contenido');
boton.addEventListener('click',function(){
  fetch('https://randomuser.me/api/')
  .then(data => data.json())
  .then(data => {
    let result = data.results[0];
    contenido.innerHTML = `
    <img src="${result.picture.large}">
    <p>
    Nombre: ${result.name.first}
    </p>
    `;
  });
});

let danger = document.getElementById('dangerButton');
let contenidoTabla = document.getElementById('contenidoTabla');

danger.addEventListener('click',completarTabla);

function completarTabla (){
  fetch ('tabla.json')
    .then(res=> res.json())
    .then(data =>{
      imprimirDatos(data);

    });
  };

function imprimirDatos(tabla){
  contenidoTabla.innerHTML = "";
  for( let i of tabla){
    contenidoTabla.innerHTML += `
    <tr class="${i.activo ? "table-primary" : "table-danger"}">
      <th scope="row">${i.id}</th>
      <td>${i.nombre}</td>
      <td>${i.apellido}</td>
      <td>${i.activo ? "Si" : "No"}</td>
    </tr>
    `
  }
};
//USAR FETCH CON POST PARA ENVIAR DATOS
let form = document.getElementById("formulario");
let alert = document.getElementById("alert");
form.addEventListener("submit",function(e){
  e.preventDefault();
  var datos = new FormData(form);
  fetch("post.php",{
    method: 'POST',
    body: datos
  })
  .then(res => res.json())
  .then(data => {
    if(data === 'error'){
      alert.innerHTML = `<div class="alert alert-danger" role="alert" id="alert">Llena todos los campos!</div>`;
    } else {
      alert.innerHTML = `<div class="alert alert-primary" role="alert" id="alert">${data}</div>`;
    }
  })

});

//OBJETO LITERAL

const Peli = {
  nombre: "Harry",
  id: 0,
  reproducir(){
    return `HOLAAAAAA ${this.nombre}`
  }
}

//POO

class Pelicula {
  constructor(nombre,id=1){
    this.nombre = nombre;
    this.id = id;
  }
  reproducir(){
    return `Reproduciendo ${this.nombre}`;
  }
}
class Serie extends Pelicula {
  constructor(nombre,id,cap){
    super(nombre,id);
    this.cap = cap;
  }
  reproducirCap(){
    return `Reproduciendo serie ${this.nombre}(${this.id}) en el capitulo ${this.cap}`;
  }
}
const harry = new Serie("Flash",01,13);
const spiderMan = new Pelicula("SpiderMan",02);

//AJAX

let btnAjax = document.getElementById('ajaxBTN');
let respuesta = document.querySelector('.respuesta');
btnAjax.addEventListener("click", function(){
//  console.log("Click!");
  const xhttp = new XMLHttpRequest();

  xhttp.open('GET', 'archivo.txt', true);
  xhttp.send();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      respuesta.innerHTML = `${this.responseText}`;
    }
  }
});

//AJAX JSON
let resp = document.getElementById('res');
document.querySelector("#jsonBTN").addEventListener('click', function(){
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'tabla.json', true);
  xhttp.send();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      let datos = JSON.parse(this.responseText);
      resp.innerHTML = "";
      for( let i of datos){
        resp.innerHTML += `
        <tr>
          <th scope="row">${i.id}</th>
          <td>${i.nombre}</td>
        </tr>
        `;
      }
    }
  }
});


//AJAX API
let ul = document.querySelector("#myUL");
document.querySelector('#dolar').addEventListener('click', function(){
  obtenerDatos("dolar");
});
document.querySelector('#euro').addEventListener('click', function(){
  obtenerDatos("euro");
});
function obtenerDatos(opc){
  const xhttp = new XMLHttpRequest();
  let url = `https://mindicador.cl/api/${opc}`;
  xhttp.open('GET', url , true);
  xhttp.send();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      let datos = JSON.parse(this.responseText);
      ul.innerHTML = "";
      let cont = 0;
      for(let i of datos.serie){
        cont++;
        ul.innerHTML += `
          <li>${i.fecha.substr(0,10)} -> ${i.valor}</li>
        `;
        if(cont>10){
          break;
        }
      }
    }
  }
}


//iife

(function suscribete(){
  //console.log("ahre");
})();

((nombre = "") => {
  //console.log(`aaaaahrreeee ${nombre}`);
})("juanito");


// EVENT DELEGATION

const btnAgregar = document.getElementById('btnAgregar');
const botones = document.querySelector('#botones');
const fondo = document.querySelector('#fondo');
function delegacion(e){
  e.preventDefault();
  const color = e.target.classList[1];
  switch (color) {
    case ('btn-primary'):
      fondo.className= 'bg-primary';
      break;
    case ('btn-secondary'):
      fondo.className= 'bg-secondary'
      break;
    case ('btn-danger'):
      fondo.className= 'bg-danger'
      break;
    case ('btn-success'):
      fondo.className= 'bg-success'
      break;
    case ('btn-warning'):
      fondo.className= 'bg-warning'
      break;
    default:
    fondo.className= 'bg-dark'
  }
  localStorage.setItem("fondo",fondo.className);
}
botones.addEventListener('click',delegacion);

(()=> {
  const color = localStorage.getItem("fondo");
  if(color === null){
    fondo.className = 'bg-dark';
  } else {
    fondo.className = color;
  }
  btnAgregar.addEventListener('click', function(e){
    e.preventDefault();
    botones.innerHTML = `
      <button class="btn btn-primary" >primary</button>
      <button class="btn btn-secondary" >secondary</button>
      <button class="btn btn-danger" >danger</button>
      <button class="btn btn-success" >success</button>
      <button class="btn btn-warning" >warning</button>
    `;
  });

})();

//LocalStorage: guarda cadenas de texto clave => valor

const nombre = "Santiago";

localStorage.setItem('nombre-user', nombre );
const lget = localStorage.getItem('nombre-user');


// console.log(lget);
//localStorage.removeItem('nombre-user');


//////////////////////////////  NOTAS



//variables
const formNotas = document.querySelector('#formNotas');
const listaNotas = document.getElementById('listaNotas');
let arrayActividades = [];
class Actividad {
  constructor(actividad){
    this.actividad = actividad;
    this.estado = false;
  }
}

//funciones

const agregar = (nota) => {
  if(nota != ''){
    let actividad = new Actividad(nota);
    arrayActividades.push(actividad);
    Guardar();
}
}

const Guardar = () => {
    localStorage.setItem('Notas', JSON.stringify(arrayActividades));
    ImprimirNotas();
  }

const Completar = (actividad) => {
  let indexArr = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad );
  if (arrayActividades[indexArr].estado){
    arrayActividades[indexArr].estado = false;
  } else {
    arrayActividades[indexArr].estado  = true;
  }

  Guardar();
}

const ImprimirNotas = () => {
  listaNotas.innerHTML ="";
  arrayActividades = JSON.parse(localStorage.getItem('Notas'));
  if(arrayActividades === null){
    arrayActividades = [];
  } else {
    for(let i of arrayActividades){
      listaNotas.innerHTML += `<div class="alert ${i.estado ? "alert-success": "alert-danger" } role="alert"><b>${i.actividad}</b> - ${i.estado}<span class="float-right"><i class="material-icons">${i.estado ? "autorenew": "done_all" }</i><i class="material-icons">delete_forever</i></span></div>`;
    }
  }
}

const Eliminar = (actividad) => {
  let indexArr;
  arrayActividades.forEach((elemento,index)=> {
    if(elemento.actividad === actividad){
      indexArr = index;
    }
  });
  arrayActividades.splice(indexArr,1);
  Guardar();
}

//eventListener
formNotas.addEventListener('submit',function(e){
  e.preventDefault();
  let nota = document.querySelector("#nota").value;
  agregar(nota);
  formNotas.reset();

});

document.addEventListener('DOMContentLoaded', ImprimirNotas);

listaNotas.addEventListener('click', (e)=> {
  e.preventDefault();
  if (e.target.innerHTML == "done_all"){
    Completar(e.path[2].childNodes[0].innerHTML);
  } else if(e.target.innerHTML == "delete_forever"){
    Eliminar(e.path[2].childNodes[0].innerHTML);
  } else if(e.target.innerHTML == "autorenew"){
    Completar(e.path[2].childNodes[0].innerHTML);
  }
});




//////////////////// BUSCADOR IndexOF

const buscador = document.querySelector("#buscador");
const resBusqueda = document.querySelector("#resultadoBusqueda");

const productos = [
  {nombre:"Platanos", Valor: 75},
  {nombre:"Pera", Valor: 71},
  {nombre:"Sandia", Valor: 20},
  {nombre:"Melon", Valor: 65},
  {nombre:"Frutillas", Valor: 45}
];

buscador.addEventListener('keyup', () => {
  let texto = buscador.value.toLowerCase();
  resBusqueda.innerHTML = "";
  for( let producto of productos){
    let nombre = producto.nombre.toLowerCase();
    if(nombre.indexOf(texto) !== -1){
      resBusqueda.innerHTML += `<li>${producto.nombre} - Valor: ${producto.Valor}</li>`;
    }
  }
  if (resBusqueda.innerHTML === ""){
    resBusqueda.innerHTML = `<li>Producto no encontrado</li>`;
  }
});



// Select the node that will be observed for mutations
const targetNode = document.getElementById('checkthis');

targetNode.addEventListener('keyup',function(){
  window.alert("ke");
})






















//--
