<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketsSeeder extends Seeder
{
    public function run(): void
    {
        $ID_user = [1,2,3,4,5];

        $ID_session = [1,2,3,4,5];

        $sala = [
            "Sala 1",
            "Sala 2",
            "Sala 3",
            "Sala 4",
            "Sala 5"
        ];

        for ($i=0; $i < 10; $i++) {
            DB::table('tickets')->insert([
                'ID_user' => $ID_user[rand(0, 4)],
                'ID_session' => $ID_session[rand(0, 4)],
                'sala' => $sala[rand(0, 4)],
                'seats' => json_encode([
                    [
                        'id' => ++$i,
                        'row' => 1,
                    ],
                ]),
                'total' => rand(6, 100),
            ]);
        }
    }
}
