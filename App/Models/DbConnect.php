<?php 
    namespace App\Models;
	class DbConnect {
		private $host = 'localhost';
		private $dbName = 'mkwebd86_crudpoo';
		private $user = 'mkwebd86_crud';
		private $pass = 'Enigm@159';

		public function connect() {
			try {
				$conn = new \PDO('mysql:host=' . $this->host . '; dbname=' . $this->dbName, $this->user, $this->pass);
				$conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch( \PDOException $e) {
				echo 'Database Error: ' . $e->getMessage();
			}
		}
	}
 ?>