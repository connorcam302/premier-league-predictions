<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
require __DIR__ . '/AuthMiddleware.php';
require __DIR__ . '/classes/JsonResponse.php';

$allHeaders = getallheaders();
$db_connection = new Database();

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0, 404, "Request must be post.");
elseif (
    !isset($data->user)
    || !isset($data->prediction)
    || empty(trim($data->user))
    || (count($data->prediction) === 0)
):

    $fields = ["fields" => ["user", "prediction"]];
    $returnData = new JsonResponse(0, 422, "Response missing field.");
else:
    $user = trim($data->user);
    $prediction = $data->prediction;

    $conn = $db_connection->dbConnection();
    $fetch_user_by_id = "SELECT * FROM `users` WHERE `userid`=:user_id";
    $fetch_user_by_id_res = $conn->prepare($fetch_user_by_id);
    $fetch_user_by_id_res->bindValue(":user_id", $user, PDO::PARAM_STR);
    $fetch_user_by_id_res->execute();

    if ($fetch_user_by_id_res->rowCount()):
        $fetch_predictions_by_id = "SELECT * FROM `predictions` WHERE `userid`=:user_id AND `season`= 2023";
        $fetch_predictions_by_id_res = $conn->prepare($fetch_predictions_by_id);
        $fetch_predictions_by_id_res->bindValue(":user_id", $user, PDO::PARAM_STR);
        $fetch_predictions_by_id_res->execute();

        if ($fetch_predictions_by_id_res->rowCount()):
            $alter_predictions_by_id = "UPDATE `predictions` SET prediction = :prediction WHERE `userid`=:user;";
            $alter_predictions_by_id_res = $conn->prepare($alter_predictions_by_id);
            $alter_predictions_by_id_res->bindValue(':user', htmlspecialchars(strip_tags($user)), PDO::PARAM_STR);
            $alter_predictions_by_id_res->bindValue(':prediction', json_encode($prediction), PDO::PARAM_STR);
            
            $alter_predictions_by_id_res->execute();

            $returnData = new JsonResponse(1, 201, 'User ' . $user . ' prediction altered.');
        else:
            $insert_predictions_by_id = "INSERT INTO `predictions`(`userid`,`prediction`, `season`) VALUES(:user, :prediction, 2023);";
            $insert_predictions_by_id_res = $conn->prepare($insert_predictions_by_id);
            $insert_predictions_by_id_res->bindValue(':user', htmlspecialchars(strip_tags($user)), PDO::PARAM_STR);
            $insert_predictions_by_id_res->bindValue(':prediction', json_encode($prediction), PDO::PARAM_STR);

            $insert_predictions_by_id_res->execute();

            $returnData = new JsonResponse(1, 201, 'Prediction submitted.');
        endif;
    else:
        $returnData = new JsonResponse(0, 422, 'User not found.');
    endif;
endif;

echo json_encode($returnData->makeResponse());
?>