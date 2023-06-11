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

if (isset($_GET['id']) && isset($_GET['year'])):
    $id = intval($_GET['id']);
    $year = intval($_GET['year']);

    $fetch_teams = "SELECT teamid,name, placement_" . $_GET["year"] . ", placement_" . $_GET["year"] - 1 . " 
                    FROM teams order by placement_" . $_GET["year"] . " ASC LIMIT 20";
    $fetch_teams_res = $conn->query($fetch_teams);
    $teams = $fetch_teams_res->fetchAll(PDO::FETCH_ASSOC);

    if (count($teams) <= 20):
        $fetch_prediction = "SELECT * FROM predictions where `userid` = :userid AND `season` = :year";
        $fetch_prediction_res = $conn->prepare($fetch_prediction);
        $fetch_prediction_res->bindValue(':userid', $id, PDO::PARAM_STR);
        $fetch_prediction_res->bindValue(':year', $year, PDO::PARAM_STR);
        $fetch_prediction_res->execute();

        $predictions = json_decode($fetch_prediction_res->fetchAll(PDO::FETCH_ASSOC)[0]['prediction'], true);

        function findTeamById($teamid, $teams)
        {
            foreach ($teams as $team) {
                if ($teamid == $team["id"]) {
                    return $team;
                }
            }
            return false;
        }

        $points = 0;
        foreach ($predictions as $prediction) {
            $team = findTeamById($prediction["teamid"], $teams);
            $points += (20 - abs($team["placement_" . $year] - $prediction["position"]));
        }
        $response = new JsonResponse(201, "Ok", $points);
    else:
        $response = new JsonResponse(404, "No team data found in database");

    endif;
else:
    if (!isset($_GET['id'])):
        $response = new JsonResponse(404, "No id found in request");
    endif;
    if (!isset($_GET['year'])):
        $response = new JsonResponse(404, "No year found in request");
    endif;
endif;

echo json_encode($response->makeResponse());
?>