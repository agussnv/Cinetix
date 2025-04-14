<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use function PHPUnit\Framework\assertJson;

class ClienteControllerTest extends TestCase
{

    private string $token = '';

    public function test_registro_inicio_y_logout_cliente(): void
    {
        $dataRegister = [
            'name' => "name_test",
            'phone' => "12345678ef",
            'email' => "email@test.com",
            'password' => "password_test"
        ];

        $response = $this->postJson('/api/auth/register', $dataRegister);

        $dataLogin = [
            'email' => "email@test.com",
            'password' => "password_test"
        ];

        $response = $this->postJson('/api/auth/login', $dataLogin);

        $this->token = $response->json('token');
        $this->assertNotEmpty($this->token);

        // $response->assertStatus(status: 200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
                 ->postJson('/api/auth/logout');

        $response->assertStatus(200);

        // Verificar el mensaje de logout
        $response->assertJson([
            'success' => true,
            'message' => 'Logged out'
        ]);
    }
}