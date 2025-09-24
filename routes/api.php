<?php

use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\TarjetaRFIDController;
use App\Http\Controllers\AccesoController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('usuarios', UsuarioController::class);
    Route::apiResource('tarjetas', TarjetaRFIDController::class);
    Route::apiResource('accesos', AccesoController::class);
    
    Route::get('/accesos/stats', [AccesoController::class, 'stats']);
});