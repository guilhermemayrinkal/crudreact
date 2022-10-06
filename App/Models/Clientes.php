<?php

namespace App\Models;

class Clientes
{
    private $conn;
    private static $table = 'clientes';

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

        $sql = 'INSERT INTO ' . self::$table . '  (name, cpf, cep, logradouro, numero, bairro, complemento, cidade, email, data_nascimento) 
        VALUES (:name, :cpf, :cep, :logradouro, :numero, :bairro, :complemento, :cidade, :email, :data_nascimento)';
        $stmt =  $this->conn->prepare($sql);
        $stmt->bindValue(':name', $data['name']);
        $stmt->bindValue(':cpf', $data['cpf']);
        $stmt->bindValue(':cep', $data['cep']);
        $stmt->bindValue(':logradouro', $data['logradouro']);
        $stmt->bindValue(':numero', $data['numero']);
        $stmt->bindValue(':bairro', $data['bairro']);
        $stmt->bindValue(':complemento', $data['complemento']);
        $stmt->bindValue(':cidade', $data['cidade']);
        $stmt->bindValue(':email', $data['email']);
        $stmt->bindValue(':data_nascimento', $data['data_nascimento']);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return 'Usuário(a) inserido com sucesso!';
        } else {
            throw new \Exception("Falha ao inserir usuário(a)!");
        }
    }
    public function update($data)
    {

        //        parse_str(file_get_contents("php://input"),$data);

        $sql = 'UPDATE ' . self::$table . ' SET name = :name, cpf = :cpf, cep = :cep, logradouro = :logradouro, numero = :numero, 
        bairro = :bairro, complemento = :complemento, cidade = :cidade, email = :email, data_nascimento = :data_nascimento WHERE id = :id';
        $stmt = $this->conn->prepare($sql);


        $stmt->bindParam(':id', $data['id_cliente']);
        $stmt->bindValue(':name', $data['name']);
        $stmt->bindValue(':cpf', $data['cpf']);
        $stmt->bindValue(':cep', $data['cep']);
        $stmt->bindValue(':logradouro', $data['logradouro']);
        $stmt->bindValue(':numero', $data['numero']);
        $stmt->bindValue(':bairro', $data['bairro']);
        $stmt->bindValue(':complemento', $data['complemento']);
        $stmt->bindValue(':cidade', $data['cidade']);
        $stmt->bindValue(':email', $data['email']);
        $stmt->bindValue(':data_nascimento', $data['data_nascimento']);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return 'Usuário(a) atualizado com sucesso!';
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
