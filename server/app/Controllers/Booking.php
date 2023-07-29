<?php namespace App\Controllers;

use App\Models\EventMembersModel;
use App\Models\EventsModel;
use App\Models\MembersModel;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PATCH');
header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');

if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
    die();
}

class Booking extends ResourceController
{
    use ResponseTrait;

    public function create($id = null): ResponseInterface
    {
        $input = $this->request->getJSON(true);
        $rules = [
            'event'    => 'required',
            'name'     => 'required|min_length[3]|max_length[100]',
            'email'    => 'required|min_length[6]|max_length[50]|valid_email',
            'phone'    => 'numeric',
            'adults'   => 'integer|required|greater_than[0]|less_than[10]',
            'children' => 'integer|less_than[10]',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $modelEvents = new EventsModel();
        $dataEvent = $modelEvents->find($input['event']);

        if (!$dataEvent) {
            return $this->failNotFound('Такого мероприятия не существует');
        }

        try {
            $modelMembers = new MembersModel();
            $dataMembers  = $modelMembers->where(['email' => $input['email']])->first();
            $dataUpdate   = [
                'email' => $input['email'],
                'phone' => $input['phone'],
                'name'  => $input['name'],
            ];

            if ($dataMembers) {
                $modelMembers->update($dataMembers->id, [
                    'phone' => $input['phone'],
                    'name'  => $input['name'],
                ]);
                $memberId = $dataMembers->id;
            } else {
                $modelMembers->insert($dataUpdate);
                $memberId = $modelMembers->getInsertID();
            }

            $modelEventMembers = new EventMembersModel();
            $dataEventMembers  = $modelEventMembers
                ->where(['member' => $memberId, 'event' => $input['event']])
                ->first();

            if ($dataEventMembers) {
                return $this->failResourceExists('Вы уже зарегистрированы на это мероприятие');
            }

            $modelEventMembers->insert([
                'event'    => $input['event'],
                'member'   => $memberId,
                'adults'   => $input['adults'],
                'children' => $input['children'],
            ]);

            $modelEvents->update($dataEvent->id, ['members' => $dataEvent->members + $input['adults'] + $input['children']]);

            return $this->respondCreated(['booking_id' => $modelEventMembers->getInsertID()]);
        } catch (Exception|\ReflectionException $e) {
            log_message('error', '{exception}', ['exception' => $e]);

            return $this->failServerError();
        }
    }
}