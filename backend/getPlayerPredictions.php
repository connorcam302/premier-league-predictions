<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/AuthMiddleware.php';
require __DIR__ . '/classes/JsonResponse.php';
require __DIR__ . '/classes/Database.php';

$db_connection = new Database();
$conn = $db_connection->dbConnection();

if ((isset($_GET['year']) && (isset($_GET['id'])))) {
    $year = $_GET['year'];
    $id = $_GET['id'];

    if ($year != 2022 || $year != 2023) {
        $fetch_teams = "SELECT teamid, name from teams order by placement_" . $year . " ASC LIMIT 20";
        $fetch_teams_res = $conn->query($fetch_teams);
        $teams = $fetch_teams_res->fetchAll(PDO::FETCH_ASSOC);

        $fetch_player_predictions = "SELECT * FROM predictions WHERE userid = :userid AND season = :year";
        $fetch_player_predictions_res = $conn->prepare($fetch_player_predictions);
        $fetch_player_predictions_res->bindValue(':userid', $id, PDO::PARAM_STR);
        $fetch_player_predictions_res->bindValue(':year', $year, PDO::PARAM_STR);
        $fetch_player_predictions_res->execute();
        if($fetch_player_predictions_res->rowCount() == 0) {
            $response = new JsonResponse(200, "No predictions found for this user", $teams);
            echo json_encode($response->makeResponse());
            return;
        }
        $prediction = json_decode($fetch_player_predictions_res->fetchAll(PDO::FETCH_ASSOC)[0]['prediction'], true);
        $new_prediction = [];

        foreach($prediction as $pred) {
            foreach($teams as $team) {
                if ($pred['teamid'] == $team['teamid']) {
                    array_push($new_prediction, ["teamid" => $pred['teamid'], "name" => $team['name'], "position" => $pred['position']]);
                }
            }
        }

        $response = new JsonResponse(200, "Ok", $new_prediction);
    } else {
        $response = new JsonResponse(404, "Year must be 2022 or 2023");
    }
} else {
    $response = new JsonResponse(404, "Include year and id in parameters");
} 
echo json_encode($response->makeResponse());
?>