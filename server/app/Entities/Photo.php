<?php namespace App\Entities;

use CodeIgniter\Entity\Entity;

class Photo extends Entity
{
    protected $casts = [
        'event'       => 'string',
        'title'       => 'string',
        'description' => 'string',
        'width'       => 'integer',
        'height'      => 'integer',
        'image'       => 'string',
    ];
}
