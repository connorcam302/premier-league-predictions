<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__."/classes/Database.php";
require __DIR__."/classes/JwtHandler.php";

function msg($success,$status,$message,$extra = []){
    return array_merge([
        "success" => $success,
        "status" => $status,
        "message" => $message
    ],$extra);
}

$db_connection = new Database();
$conn = $db_connection->dbConnection();

$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT EQUAL TO POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,"Request must be post.");

// CHECKING EMPTY FIELDS
elseif(!isset($data->username) 
    || !isset($data->password)
    || empty(trim($data->username))
    || empty(trim($data->password))
    ):

    $fields = ["fields" => ["username","password"]];
    $returnData = msg(0,422,"Please Fill in all Required Fields.",$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    $username = trim($data->username);
    $password = trim($data->password);
    
    // IF PASSWORD IS LESS THAN 8 THE SHOW THE ERROR
    if(strlen($password) < 6):
        $returnData = msg(0,422,"Your password must be at least 6 characters long.");

    // THE USER IS ABLE TO PERFORM THE LOGIN ACTION
    else:
        try{
            
            $fetch_user_by_username = "SELECT * FROM `users` WHERE `username`=:username";
            $query_stmt = $conn->prepare($fetch_user_by_username);
            $query_stmt->bindValue(":username", $username,PDO::PARAM_STR);
            $query_stmt->execute();

            if($query_stmt->rowCount()):
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($password, $row["password"]);

                if($check_password):

                    $jwt = new JwtHandler();
                    $token = $jwt->jwtEncodeData(
                        "http://localhost/premier-league-pred-back/",
                        array("user_id"=> $row["userid"], "username" => $row["username"])
                    );
                    
                    $returnData = [
                        "success" => 1,
                        "message" => "You have successfully logged in.",
                        "token" => $token
                    ];

                // IF INVALID PASSWORD
                else:
                    $returnData = msg(0,422,"Invalid password.");
                endif;

            // IF THE USER IS NOT FOUNDED BY EMAIL THEN SHOW THE FOLLOWING ERROR
            else:
                $returnData = msg(0,422,"Invalid username.");
            endif;
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }

    endif;

endif;

echo json_encode($returnData);