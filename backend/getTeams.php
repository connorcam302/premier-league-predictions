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

if(!isset($_GET['year'])){
    $fetch_teams = "SELECT * FROM teams";
    $query_stmt = $conn->query($fetch_teams);
    $result = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($result) >= 20):
        $response = new JsonResponse(200, "Ok", $result);
        echo json_encode($response->makeResponse());
    else:
        $response = new JsonResponse(404, "No data found in database");
        echo json_encode($response->makeResponse());
    endif;
} else {
    $fetch_teams = "SELECT teamid, name, placement_" . $_GET["year"] . ", placement_" . $_GET["year"]-1 . " FROM teams ORDER BY placement_" . $_GET['year'] . " ASC LIMIT 20";
    $query_stmt = $conn->query($fetch_teams);
    $result = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (count($result) <= 20):
        $response = new JsonResponse(200, "Ok", $result);
        echo json_encode($response->makeResponse());
    else:
        $response = new JsonResponse(404, "No data found in database");
        echo json_encode($response->makeResponse());
    endif;
}
?>