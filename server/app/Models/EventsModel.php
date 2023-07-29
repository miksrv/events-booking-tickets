<?php namespace App\Models;

use App\Entities\Event;

class EventsModel extends MyBaseModel
{
    protected $table      = 'events';
    protected $primaryKey = 'id';

    protected $useAutoIncrement = false;

    protected $returnType     = Event::class;
    protected $useSoftDeletes = true;

    protected array $hiddenFields = ['created_at', 'updated_at', 'deleted_at'];

    // The updatable fields
    protected $allowedFields = [
        'title',
        'text',
        'address',
        'address_link',
        'image',
        'date',
        'views',
        'members',
        'registration_limit',
        'registration_enable',
        'registration_start',
        'registration_stop'
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules = [];
    protected $validationMessages   = [];
    protected $skipValidation       = true;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = ['beforeInsert'];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = ['prepareOutput'];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    protected function beforeInsert(array $data): array
    {
        $data['data']['id'] = uniqid();

        return $data;
    }
}