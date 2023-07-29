<?php namespace App\Controllers;

use App\Models\EventsModel;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PATCH');
header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');

if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
    die();
}

class Events extends ResourceController
{
    use ResponseTrait;

    public function list(): ResponseInterface
    {
        $modelEvents = new EventsModel();
        $dataEvents  = $modelEvents->orderBy('date', 'DESC')->findAll();

        return $this->respond([
            'items' => $dataEvents,
            'total' => $modelEvents->countAllResults()
        ]);
    }
}