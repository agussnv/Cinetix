<?php

namespace Tests\Feature;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;

class AdminControllerTest extends TestCase
{
    private string $token = '';
    
    public function test_registro_inicio_y_logout_admin(): void
    {
        DB::table('admins')->insert([
            'email' => "admin@test.com",
            'password' => bcrypt('admin1234'),
        ]);

        $dataLogin = [
            'email' => "admin@test.com",
            'password' => "admin1234"
        ];

        $response = $this->postJson('/api/auth/login-admin', $dataLogin);

        $this->token = $response->json('token');
        $this->assertNotEmpty($this->token);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
                 ->postJson('/api/auth/logout');

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Logged out'
        ]);
    }
}
