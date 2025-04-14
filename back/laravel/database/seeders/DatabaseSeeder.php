<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('admins')->insert([
            'email' => "admin@test.com",
            'password' => bcrypt('admin1234'),
        ]);
        $this->call([
            ClienteSeeder::class,
            FuncionesSeeder::class,
            TicketsSeeder::class,
        ]);
    }
}
