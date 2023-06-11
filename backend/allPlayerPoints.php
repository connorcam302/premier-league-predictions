<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
require __DIR__ . '/AuthMiddleware.php';
require __DIR__ . '/classes/JsonResponse.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

function findTeamById($teamid, $teams)
{
    foreach ($teams as $team) {
        if ($teamid == $team["teamid"]) {
            return $team;
        }
    }
    return false;
}

function calcPlayerPoints($id, $year, $teams, $conn)
{
    $fetch_prediction = "SELECT * FROM predictions where `userid` = :userid AND `season` = :year";
    $fetch_prediction_res = $conn->prepare($fetch_prediction);
    $fetch_prediction_res->bindValue(':userid', $id, PDO::PARAM_STR);
    $fetch_prediction_res->bindValue(':year', $year, PDO::PARAM_STR);
    $fetch_prediction_res->execute();

    $predictions = json_decode($fetch_prediction_res->fetchAll(PDO::FETCH_ASSOC)[0]['prediction'], true);
    $points = 0;
    foreach ($predictions as $prediction) {
        $team = findTeamById($prediction["teamid"], $teams);
        $points += (20 - abs($team["placement_" . $year] - $prediction["position"]));
    }
    return $points;
}

if (isset($_GET['year'])) {
    if ($_GET['year'] == "2022" || $_GET['year'] == "2023") {
        $year = intval($_GET['year']);

        $fetch_players = "SELECT users.userid, users.username, predictions.season 
                            FROM users INNER JOIN predictions ON users.userid = predictions.userid 
                            WHERE predictions.season = " . $year;
        $fetch_players_res = $conn->query($fetch_players);
        $players = $fetch_players_res->fetchAll(PDO::FETCH_ASSOC);

        if (count($players) > 0) {
            $fetch_teams = "SELECT teamid, name, placement_" . $year . " FROM teams";
            $fetch_teams_res = $conn->query($fetch_teams);
            $teams = $fetch_teams_res->fetchAll(PDO::FETCH_ASSOC);

            if (count($teams) >= 20) {
                $data = [];
                foreach ($players as $player) {
                    array_push($data, ["id" => $player["userid"], "username" => $player["username"], "points" => calcPlayerPoints($player["userid"], $year, $teams, $conn)]);
                }
                $points = array_column($data, 'points');

                array_multisort($points, SORT_DESC, $data);

                $response = new JsonResponse(201, "Ok", $data);
                echo json_encode($response->makeResponse());
            } else {
                $response = new JsonResponse(404, "No team data found in database");
                echo json_encode($response->makeResponse());
            }
        } else {
            $response = new JsonResponse(404, "No user data found in database");
            echo json_encode($response->makeResponse());
        }
    } else {
        $response = new JsonResponse(404, "Year must be either 2022 or 2023.");
        echo json_encode($response->makeResponse());
    }
} else {
    $response = new JsonResponse(404, "No year chosen.");
    echo json_encode($response->makeResponse());
}
?>