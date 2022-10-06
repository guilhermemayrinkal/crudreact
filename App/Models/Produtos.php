<?php

namespace App\Models;

class Produtos
{
    private $conn;
    private static $table = 'produtos';

    public function __construct()
    {
        require_once('DbConnect.php');
        $conn = new DbConnect;
        $this->conn = $conn->connect();
    }

    public function select(int $id)
    {

        $sql = 'SELECT * FROM ' . self::$table . ' WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(\PDO::FETCH_ASSOC);
        } else {
            throw new \Exception("Nenhum usuário encontrado!");
        }
    }

    public function selectAll()
    {

        $sql = 'SELECT * FROM ' . self::$table;
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } else {
            throw new \Exception("Nenhum usuário encontrado!");
        }
    }

    public function insert($data)
    {

        $sql = 'INSERT INTO ' . self::$table . '  (nome, valor_unit) VALUES (:nome, :valor_unit)';
        $stmt =  $this->conn->prepare($sql);
        $stmt->bindValue(':nome', $data['nome']);
        $stmt->bindValue(':valor_unit', $data['valor_unit']);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return 'Produto inserido com sucesso!';
        } else {
            throw new \Exception("Falha ao inserir produto!");
        }
    }
    public function update($data)
    {

        //        parse_str(file_get_contents("php://input"),$data);

        $sql = 'UPDATE ' . self::$table . ' SET nome = :nome, valor_unit = :valor_unit WHERE id = :id';
        $stmt = $this->conn->prepare($sql);


        $stmt->bindParam(':id', $data['id_produto']);
        $stmt->bindValue(':nome', $data['nome']);
        $stmt->bindValue(':valor_unit', $data['valor_unit']);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return 'Usuário(a) inserido com sucesso!';
        } else {
            throw new \Exception("Falha ao atualizar usuário(a)!");
        }
    }
    public function delete($id)
    {

        $sql = 'DELETE FROM ' . self::$table . ' WHERE id = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return 'Deletado com sucesso!';
        } else {
            throw new \Exception("Falha ao deletar usuário(a)!");
        }
    }
}
