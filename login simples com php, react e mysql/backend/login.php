<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    header('Content-Type: application/json');
    $host = "localhost";
    $dbname = "acampamento_sistema";
    $username = "root";
    $password = "Qcf@1316";

    $data = json_decode(file_get_contents("php://input"));
    $usuario = $data->usuario;
    $senha = $data->senha;

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE nome_usuario = :nome_usuario");
        $stmt->bindParam(':nome_usuario', $usuario);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && $senha == $user['senha']) {
            echo json_encode(["success" => true, "message" => "Login bem-sucedido!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Usuário ou senha incorretos."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Erro: " . $e->getMessage()]);
    }

?>
