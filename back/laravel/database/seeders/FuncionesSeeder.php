<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FuncionesSeeder extends Seeder
{
    public function run(): void
    {
        $imdb = [
            'tt0096895',
            'tt0078346',
            'tt0371746',
            'tt0145487',
            'tt1375666',
            'tt0993846',
            'tt0409182',
            'tt0106062',
            'tt8355456',
            'tt1396484',
            'tt1854513',
            'tt0093870',
            'tt0462499'
        ];

        $title = [
            'Batman',
            'Superman',
            'Iron Man',
            'Spider-man',
            'Inception',
            'The Wolf of Wall Street',
            'Poseidon',
            'Matrix',
            'Neo',
            'It',
            'Blancanieves',
            'RoboCop',
            'Rambo'
        ];

        $time = [
            '16:00',
            '18:00',
            '20:00'
        ];

        $seat_id = 0;
        for ($i = 1; $i <= 12; $i++) {
            for ($j = 0; $j < 10; $j++) {
                $seat_id++;
                $seat = [
                    'id' => $seat_id,
                    'available' => true,
                    'row' => $i
                ];
                $seats[] = $seat;
            }
        }

        for ($i=0; $i < count($imdb); $i++) { 
            DB::table('session_movies')->insert([
                'imdb' => $imdb[$i],
                'title' => $title[$i],
                'time' => $time[$i % count($time)],
                'date' => now()->addDays(rand(0, 5))->toDateString(),
                'seats' => json_encode($seats),
                'vip' => $i % 2 === 0
            ]);
        }

    }
}
