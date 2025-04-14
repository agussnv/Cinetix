<?php

use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SessionMovieController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClienteController;
use Illuminate\Support\Facades\Auth;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ==== AUTH ===================
Route::prefix('/auth')->group(function () {
    Route::post('/login-admin', [AdminController::class, 'login']);
    Route::post('/register', [ClienteController::class, 'store']);
    Route::post('/login', [ClienteController::class, 'login']);
    Route::middleware('auth:sanctum')->post('logout', function () {
        $user = Auth::user();

        if($user) {
            $user->tokens()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out'
        ], 200);
    });
});

Route::apiResource('/session', SessionMovieController::class);
Route::get('/allsessions', [SessionMovieController::class, 'getAll']);

Route::apiResource('/ticket', TicketController::class)->middleware('auth:sanctum');
Route::get('/getAllTickets', [TicketController::class, 'getAll'])->middleware('auth:sanctum');

Route::get('/test', function () {
    return 'Hello, API!';
});