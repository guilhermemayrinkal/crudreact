<?php

namespace App\Services;

use App\Models\Vendas;

class Vendaservice
{
    private $Vendas;
    public function __construct()
    {
        $this->Vendas = new Vendas;
    }
    public function get($id = null)
    {
        if ($id) {
            return $this->Vendas->select($id);
        } else {
            return $this->Vendas->selectAll();
        }
    }
    public function post()
    {
        $data = $_POST;

        if (isset($_GET['id'])) {

            $id = $_GET['id'];
            $this->Vendas->delete($id);
        } else if ($data['method'] == "update") {
            return $this->Vendas->update($data);
        } else {

            return $this->Vendas->insert($data);
        }
    }
}
