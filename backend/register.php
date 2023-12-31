<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") :

    $returnData = msg(0, 404, 'Request must be post.');

elseif (
    !isset($data->username)
    || !isset($data->password)
    || empty(trim($data->username))
    || empty(trim($data->password))
) :

    $fields = ['fields' => ['username', 'password']];
    $returnData = msg(0, 422, 'Please Fill in all Required Fields.', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :
    $username = trim($data->username);
    $password = trim($data->password);

    if (strlen($password) < 6) :
        $returnData = msg(0, 422, 'Your password must be at least 6 characters long.');

    elseif (strlen($username) < 2) :
        $returnData = msg(0, 422, 'Your username must be at least 2 characters long!');

    else :
        try {

            $check_username = "SELECT `username` FROM `users` WHERE `username`=:username";
            $check_username_stmt = $conn->prepare($check_username);
            $check_username_stmt->bindValue(':username', $username, PDO::PARAM_STR);
            $check_username_stmt->execute();

            if ($check_username_stmt->rowCount()) :
                $returnData = msg(0, 422, 'This username is already in use!');

            else :
                $insert_query = "INSERT INTO `users`(`username`,`password`) VALUES(:username,:password)";

                $insert_stmt = $conn->prepare($insert_query);

                // DATA BINDING
                $insert_stmt->bindValue(':username', htmlspecialchars(strip_tags($username)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);

                $insert_stmt->execute();

                $returnData = msg(1, 201, 'You have successfully registered.');

            endif;
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    endif;
endif;

echo json_encode($returnData);