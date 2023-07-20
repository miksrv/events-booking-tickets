<?php namespace App\Entities;

use CodeIgniter\Entity\Entity;

class EventMember extends Entity
{
    protected $casts = [
        'event'    => 'string',
        'member'   => 'string',
        'adults'   => 'integer',
        'children' => 'integer',
    ];
}
