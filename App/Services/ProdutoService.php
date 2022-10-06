<?php

namespace App\Services;

use App\Models\Produtos;

class Produtoservice
{
    private $Produtos;
    public function __construct()
    {
        $this->Produtos = new Produtos;
    }
    public function get($id = null)
    {
        if ($id) {
            return $this->Produtos->select($id);
        } else {
            return $this->Produtos->selectAll();
        }
    }
    public function post()
    {
        $data = $_POST;

        if (isset($_GET['id'])) {

            $id = $_GET['id'];
            $this->Produtos->delete($id);
        } else if ($data['method'] == "update") {
            return $this->Produtos->update($data);
        } else {

            return $this->Produtos->insert($data);
        }
    }
}
