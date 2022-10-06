<?php

namespace App\Models;

class Vendas
{
    private $conn;
    private static $table = 'vendas';

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
            throw new \Exception("Nenhuma vena encontrado!");
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
            throw new \Exception("Nenhuma venda encontrado!");
        }
    }

    public function insert($data)
    {

        $sql = 'INSERT INTO ' . self::$table . '  (cliente, produto, total) VALUES (:cliente, :produto, :total)';
        $stmt =  $this->conn->prepare($sql);
        $stmt->bindValue(':cliente', $data['cliente']);
        $stmt->bindValue(':produto', $data['produto']);
        $stmt->bindValue(':total', $data['total']);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return 'Venda inserida com sucesso!';
        } else {
            throw new \Exception("Falha ao inserir venda!");
        }
    }
    public function update($data)
    {

        //        parse_str(file_get_contents("php://input"),$data);

        $sql = 'UPDATE ' . self::$table . ' SET cliente = :cliente, produto = :produto, total = :total WHERE id = :id';
        $stmt = $this->conn->prepare($sql);


        $stmt->bindParam(':id', $data['id_venda']);
        $stmt->bindValue(':cliente', $data['cliente']);
        $stmt->bindValue(':produto', $data['produto']);
        $stmt->bindValue(':total', $data['total']);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return 'Usuário(a) inserido com sucesso!';
        } else {
            throw new \Exception("Falha ao atualizar venda!");
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
