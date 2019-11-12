<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet">
  <title>Mis notas</title>
</head>
<body>
  <div class="container">
    <h1 class="mt-5">NOTAS</h1>
    <form id="formNotas">
      <div class="form-group">
        <input type="text" class="form-control" id="nota" placeholder="Mi nota">
      </div>
      <button type="submit" class="btn btn-primary">Agregar</button>
    </form>
    <div class="mt-5" id="listaNotas">
    </div>
  </div>
  <script type="text/javascript">
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
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'db.php' , true);
        var params = "opc=new&nota=" + nota;
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
            actualizarDatos();
          }
        }
        xhttp.send(params);
  }
  }
   function actualizarDatos () {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'db.php', true);
    var params = "opc=list";
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        var datos = JSON.parse(this.responseText);
        arrayActividades = datos;
        console.log(this.responseText);
        ImprimirNotas();
      }
    }
    xhttp.send(params);
  }

  const Editar = (actividad,texto) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('POST', 'db.php' , true);
      var params = 'id=' + actividad +"&opc=" + "edit&val=" + texto;
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          actualizarDatos();
        }
      }
      xhttp.send(params);
  }

  const Change = (actividad,estado) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('POST', 'db.php' , true);
      var params = 'id=' + actividad +"&opc=" + "change&val=" + estado;
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          actualizarDatos();
        }
      }
      xhttp.send(params);
  }

  const ImprimirNotas = () => {
    listaNotas.innerHTML ="";
    let estado = false;
    if(arrayActividades === null){
      arrayActividades = [];
    } else {
      for(let i of arrayActividades){
        if(i.Estado == '1'){
          estado = true;
        } else {
          estado = false;
        }
        listaNotas.innerHTML += `<div class="alert ${estado ? "alert-success": "alert-danger"}" role="alert"><i>${i.id}</i> - <b>${i.Nombre}</b> - <i>${estado}</i><span class="float-right"><i class="material-icons">create</i><i class="material-icons">${estado ? "autorenew": "done_all" }</i><i class="material-icons">delete_forever</i></span></div>`;
      }
    }
  }

  const Eliminar = (actividad) => {
    let opc = confirm("Estas seguro de eliminar la actividad: " + actividad + " ?");
    if(opc){
      const xhttp = new XMLHttpRequest();
      xhttp.open('POST', 'db.php' , true);
      var params = 'id=' + actividad +"&opc=" + "del";
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          actualizarDatos();
        }
      }
      xhttp.send(params);
    }
    //Guardar();
  }

  //eventListener
  formNotas.addEventListener('submit',function(e){
    e.preventDefault();
    let nota = document.querySelector("#nota").value;
    agregar(nota);
    formNotas.reset();

  });

  document.addEventListener('DOMContentLoaded', actualizarDatos);

  listaNotas.addEventListener('click', (e)=> {
    e.preventDefault();
    if (e.target.innerHTML == "done_all"){
      Change(e.path[2].childNodes[0].innerHTML,e.path[2].childNodes[4].innerHTML);
    } else if(e.target.innerHTML == "delete_forever"){
      Eliminar(e.path[2].childNodes[0].innerHTML);
    } else if(e.target.innerHTML == "autorenew"){
      Change(e.path[2].childNodes[0].innerHTML,e.path[2].childNodes[4].innerHTML);
    } else if(e.target.innerHTML == "create"){
      let text = e.path[2].childNodes[2].innerHTML;
      let newText = prompt("Editar:",text);
      if(!(text == newText || newText === null)){
        Editar(e.path[2].childNodes[0].innerHTML,newText);
      }
    }
  });
  </script>
</body>
</html>
