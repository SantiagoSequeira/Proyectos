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
const db = (opc,nota=null,id=null,val=null) =>{
  var x = new FormData();
  x.append( "opc", opc );
  x.append( "nota", nota );
  x.append( "id", id );
  x.append( "val", val );
  if(opc == 0) {
  fetch("db.php",
  {
      method: "POST",
      body: x
  })
  .then(function(res){ return res.json(); })
  .then(function(data){
    arrayActividades = data;
    ImprimirNotas();
   })
 } else {
   fetch("db.php",
   {
       method: "POST",
       body: x
   })
   .then(function(res){ db(0);})

 }
}

  const ImprimirNotas = () => {
    listaNotas.innerHTML ="";
    let estado = false;
    if(arrayActividades.length == 0){
      arrayActividades = [];
      listaNotas.innerHTML += `<div class="alert alert-warning" role="alert"><b>No tienes notas!</b></div>`;
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

  //eventListener
  formNotas.addEventListener('submit',function(e){
    e.preventDefault();
    let nota = document.querySelector("#nota").value;
    db(1,nota);
    formNotas.reset();

  });

  document.addEventListener('DOMContentLoaded', db(0));

  listaNotas.addEventListener('click', (e)=> {
    e.preventDefault();
    let id= e.path[2].childNodes[0].innerHTML;
    if (e.target.innerHTML == "done_all"){
      let estatus= e.path[2].childNodes[4].innerHTML;
      db(3,null,id,estatus);
    } else if(e.target.innerHTML == "delete_forever"){
      db(2,null,id);
    } else if(e.target.innerHTML == "autorenew"){
      let estatus= e.path[2].childNodes[4].innerHTML;
      db(3,null,id,estatus);
    } else if(e.target.innerHTML == "create"){
      let text = e.path[2].childNodes[2].innerHTML;
      let newText = prompt("Editar:",text);
      if(!(text == newText || newText === null)){
        db(4,null,id,newText);
      }
    }
  });
  </script>
</body>
</html>
