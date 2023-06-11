<?php
class JsonResponse
{

    protected $status;
    protected $message;
    protected $data;
    public function __construct($status, $message, $data = null)
    {
        $this->status = $status;
        $this->message = $message;
        $this->data = $data;
    }

    public function makeResponse()
    {
        return array("status" => $this->status, "message" => $this->message, "data" => $this->data);
    }
}
?>