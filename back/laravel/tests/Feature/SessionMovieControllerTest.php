<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SessionMovieControllerTest extends TestCase
{

    private string $token = '';

    public function test_poder_crear_sesiones_(): void
    {
        $dataLogin = [
            'email' => "admin@test.com",
            'password' => "admin1234"
        ];

        $responseLogin = $this->postJson('/api/auth/login-admin', $dataLogin);

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

        $dataMovie = [
            'imdb' => '1234imdbtest',
            'title' => 'testmovie',
            'time' => '16:00',
            'date' => '2025-03-25',
            'seats' => json_encode($seats),
            'vip' => true
        ];

        $responseCrear = $this->withHeader('Authorization', 'Bearer ' . $responseLogin->json('token'))
                        ->postJson('/api/session', $dataMovie);

        $responseCrear->assertStatus(201);
    }

    public function test_poder_ver_sesiones_activas(): void
    {
        $response = $this->getJson('/api/session');

        $response->assertStatus(200);
    }

    public function test_poder_mostrar_una_sesion(): void
    {
        $response = $this->getJson('/api/session/1234imdbtest');

        $response->assertStatus(200);
    }

    public function test_poder_eliminar_una_sesion(): void
    {
        $dataLogin = [
            'email' => "admin@test.com",
            'password' => "admin1234"
        ];

        $responseLogin = $this->postJson('/api/auth/login-admin', $dataLogin);
        $token = $responseLogin->json('token');

        $responseSession = $this->getJson('/api/session/1234imdbtest');

        $responseEliminar = $this->withHeader('Authorization', 'Bearer ' . $token)
                        ->deleteJson("/api/session/{$responseSession->json('data.id')}");

        $responseEliminar->assertStatus(200);
    }
}
