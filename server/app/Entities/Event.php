<?php namespace App\Entities;

use CodeIgniter\Entity\Entity;

class Event extends Entity
{
    protected $casts = [
        'title'        => 'string',
        'text'         => 'string',
        'address'      => 'string',
        'address_link' => 'string',
        'image'        => 'string',
        'date'         => 'string',
        'views'        => 'integer',
        'members'      => 'integer',
        'registration_limit'  => 'integer',
        'registration_enable' => 'boolean',
        'registration_start'  => 'string',
        'registration_stop'   => 'string',
    ];
}
