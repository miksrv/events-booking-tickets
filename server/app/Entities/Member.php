<?php namespace App\Entities;

use CodeIgniter\Entity\Entity;

class Member extends Entity
{
    protected $casts = [
        'email'    => 'string',
        'phone'    => 'string',
        'name'     => 'string',
        'password' => 'string'
    ];
}
