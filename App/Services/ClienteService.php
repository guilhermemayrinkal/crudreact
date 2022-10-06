<?php

namespace App\Services;

use App\Models\Clientes;

class ClienteService
{
    private $Clientes;
    public function __construct()
    {
        $this->Clientes = new Clientes;
    }
    public function get($id = null)
    {
        if ($id) {
            return $this->Clientes->select($id);
        } else {
            return $this->Clientes->selectAll();
        }
    }

    public function post()
    {
        $data = $_POST;

        if (isset($_GET['id'])) {

            $id = $_GET['id'];
            $this->Clientes->delete($id);
        } else if ($data['method'] == "update") {
            return $this->Clientes->update($data);
        } else {

            return $this->Clientes->insert($data);
        }
    }
}
