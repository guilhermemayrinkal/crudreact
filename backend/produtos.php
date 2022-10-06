<?php
header('Access-Control-Allow-Origin: *'); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
$host = "localhost";
$user = "root";
$password = "";
$dbname = "reactcrud";
$id = '';

$con = mysqli_connect($host, $user, $password, $dbname);

$method = $_SERVER['REQUEST_METHOD'];


if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
    case 'GET':
        if (isset($_GET["id"])) {
            $id = $_GET['id'];
        }
        $sql = "select * from produtos" . ($id ? " where id=$id" : '');
        break;
    case 'POST':
        if (isset($_GET["id"])) {
            $id = $_GET['id'];
            $nome = $_POST["nome"];
            $valor_unit = $_POST["valor_unit"];

            $sql = "UPDATE produtos SET nome='$nome', valor_unit='$valor_unit' WHERE id = $id";
        } else if (isset($_GET["delete"])) {
            $delete = $_GET['delete'];
            $sql = "DELETE FROM produtos WHERE id = $delete";
        } else {
            $nome = $_POST["nome"];
            $valor_unit = $_POST["valor_unit"];

            $sql = "insert into produtos (nome, valor_unit) 
          values ('$nome', '$valor_unit')";
        }
        break;
}

// run SQL statement
$result = mysqli_query($con, $sql);

// die if SQL statement failed
if (!$result) {
    http_response_code(404);
    die(mysqli_error($con));
}

if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
} elseif ($method == 'POST') {
    echo json_encode($result);
} else {
    echo mysqli_affected_rows($con);
}

$con->close();
