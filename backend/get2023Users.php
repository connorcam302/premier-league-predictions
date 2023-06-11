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

$fetch_teams = "SELECT users.userid, predictions.userid, predictions.season, users.username 
                FROM predictions LEFT JOIN users ON predictions.userid = users.userid WHERE predictions.season = 2023";
$query_stmt = $conn->query($fetch_teams);
$result = $query_stmt->fetchAll(PDO::FETCH_ASSOC);

$response = new JsonResponse(200, "Ok", $result);

echo json_encode($response->makeResponse());
?>