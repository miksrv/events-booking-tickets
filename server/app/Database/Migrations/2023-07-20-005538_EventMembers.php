<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class EventMembers extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'       => 'VARCHAR',
                'constraint' => 15,
                'null'       => false,
                'unique'     => true
            ],
            'event' => [
                'type'       => 'VARCHAR',
                'constraint' => 15,
                'null'       => false,
            ],
            'member' => [
                'type'       => 'VARCHAR',
                'constraint' => 15,
                'null'       => false,
            ],
            'adults' => [
                'type'       => 'TINYINT',
                'constraint' => 1,
                'null'       => false,
                'default'    => 1
            ],
            'children' => [
                'type'       => 'TINYINT',
                'constraint' => 2,
                'null'       => false,
                'default'    => 0
            ],
            'created_at DATETIME default current_timestamp',
            'updated_at DATETIME default current_timestamp',
            'deleted_at' => [
                'type' => 'DATETIME',
                'null' => true
            ]
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('event', 'events', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('member', 'members', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('event_members');
    }

    public function down()
    {
        $this->forge->dropTable('event_members');
    }
}
