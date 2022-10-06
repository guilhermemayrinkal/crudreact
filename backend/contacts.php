<?php
header('Access-Control-Allow-Origin: *'); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
$host = "localhost"; 
$user = "mkwebd86_crud"; 
$password = "Enigm@159"; 
$dbname = "mkwebd86_crudpoo"; 
$id = '';
 
$con = mysqli_connect($host, $user, $password,$dbname);
 
$method = $_SERVER['REQUEST_METHOD'];
 
 
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
 
 
switch ($method) {
    case 'GET':
      if(isset($_GET["id"])){
        $id = $_GET['id'];  
      }     
      $sql = "select * from clientes".($id?" where id=$id":''); 
      break;
    case 'POST':
        if(isset($_GET["id"])){
            $id = $_GET['id'];  
            $name = $_POST["name"];
            $cpf = $_POST["cpf"];
            $cep = $_POST["cep"];
            $logradouro = $_POST["logradouro"];
            $numero = $_POST["numero"];
            $bairro = $_POST["bairro"];
            $complemento = $_POST["complemento"];
            $cidade = $_POST["cidade"];
            $email = $_POST["email"];
            $data_nascimento = $_POST["data_nascimento"];
            
            $sql = "UPDATE clientes SET name='$name', cpf='$cpf', cep='$cep', logradouro='$logradouro', numero='$numero', 
            bairro='$bairro', complemento='$complemento', cidade='$cidade', email='$email', data_nascimento='$data_nascimento' WHERE id = $id"; 
            
        }else if(isset($_GET["delete"])){
            $delete = $_GET['delete'];  
            $sql = "DELETE FROM clientes WHERE id = $delete"; 
        }else{  
            $name = $_POST["name"];
            $cpf = $_POST["cpf"];
            $cep = $_POST["cep"];
            $logradouro = $_POST["logradouro"];
            $numero = $_POST["numero"];
            $bairro = $_POST["bairro"];
            $complemento = $_POST["complemento"];
            $cidade = $_POST["cidade"];
            $email = $_POST["email"];
            $data_nascimento = $_POST["data_nascimento"];
 
          $sql = "insert into clientes (name, cpf, cep, logradouro, numero, bairro, complemento, cidade, email, data_nascimento) 
          values ('$name', '$cpf', '$cep', '$logradouro', '$numero', '$bairro', '$complemento', '$cidade', '$email', '$data_nascimento')"; 
        }
      break;
}
 
// run SQL statement
$result = mysqli_query($con,$sql);
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
 
if ($method == 'GET') {
    if (!$id) echo '[';
      for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
        echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
      }
    if (!$id) echo ']';
} elseif ($method == 'POST') {
    echo json_encode($result);
} else {
    echo mysqli_affected_rows($con);
}
 
$con->close();