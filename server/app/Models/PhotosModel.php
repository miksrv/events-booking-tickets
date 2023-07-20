<?php namespace App\Models;

use App\Entities\Photo;

class PhotosModel extends MyBaseModel
{
    protected $table      = 'photos';
    protected $primaryKey = 'id';

    protected $useAutoIncrement = false;

    protected $returnType     = Photo::class;
    protected $useSoftDeletes = true;

    protected array $hiddenFields = ['created_at', 'updated_at', 'deleted_at'];

    // The updatable fields
    protected $allowedFields = [
        'event',
        'title',
        'description',
        'width',
        'height',
        'image',
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