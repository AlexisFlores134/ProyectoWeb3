<?php

use App\Http\Controllers\AccesoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TarjetaRfidController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas públicas
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verificar-acceso', [TarjetaRfidController::class, 'verificarAcceso']);

// Rutas protegidas - Middleware aplicado aquí
Route::middleware('auth.simple')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/usuario', [AuthController::class, 'usuario']);

    // Rutas para tarjetas RFID (excepto verificarAcceso que es pública)
    Route::apiResource('tarjetas-rfid', TarjetaRfidController::class)->except(['verificarAcceso']);

    // Rutas para historial de acceso
    Route::get('accesos', [AccesoController::class, 'index']);
    Route::get('estadisticas-accesos', [AccesoController::class, 'estadisticas']);
});