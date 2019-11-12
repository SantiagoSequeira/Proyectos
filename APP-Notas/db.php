<?php

  $dsn = 'mysql:host=localhost;dbname=test';
  $nombre_usuario = 'root';
  $contraseña = '';
  $db = new PDO($dsn, $nombre_usuario, $contraseña);
  $headers = getallheaders();

  if(isset($_SERVER['HTTP_ORIGIN']) && isset($headers["Origin"])){

  if ($_SERVER['HTTP_ORIGIN'] != $headers["Origin"]){
    echo '400 - No Remote Access Allowed';
  } else {
    if($_POST){
      if($_POST["opc"] == 2){
        $sql = $db->prepare("DELETE FROM notas WHERE id= :id");
        $sql->bindValue("id",$_POST["id"]);
        $sql->execute();
      } else if($_POST["opc"] == 3){
        if($_POST["val"] == "true"){
          $opcion = 0;
        } else {
          $opcion = 1;
        }
        $sql = $db->prepare("UPDATE notas SET Estado=:estado WHERE id=:id");
        $sql->bindValue("estado",$opcion);
        $sql->bindValue("id",$_POST["id"]);
        $sql->execute();
      } else if($_POST["opc"]== 1){
        $sql = $db->prepare("INSERT INTO notas (Nombre,Estado) VALUES (:nombre,0)");
        $sql->bindValue("nombre",$_POST["nota"]);
        $sql->execute();
      } else if($_POST["opc"]==4){
        $sql = $db->prepare("UPDATE notas SET Nombre=:nombre,Estado=0 WHERE id=:id");
        $sql->bindValue("id",$_POST["id"]);
        $sql->bindValue("nombre",$_POST["val"]);
        $sql->execute();
      } else if($_POST["opc"] == 0){
      $sql = $db->prepare("SELECT * FROM notas");
      $sql->execute();
      $res = $sql->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($res);
    }
  }
}} else {
  echo "ACCESO RESTRINGIDO";
}
