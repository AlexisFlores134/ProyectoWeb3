<?php

use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\TarjetaRfidController;
use App\Http\Controllers\AccesoController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas de autenticación
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Ruta pública para verificar acceso
Route::post('/tarjetas/verificar-acceso', [TarjetaRfidController::class, 'verificarAcceso']);

// Rutas sin autenticación (para desarrollo)
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);
Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);
Route::delete('/usuarios/{id}', [UsuarioController::class, 'destroy']);

// Tarjetas RFID
Route::get('/tarjetas', [TarjetaRfidController::class, 'index']);
Route::post('/tarjetas', [TarjetaRfidController::class, 'store']);
Route::put('/tarjetas/{tarjetaRfid}', [TarjetaRfidController::class, 'update']);
Route::delete('/tarjetas/{tarjetaRfid}', [TarjetaRfidController::class, 'destroy']);
Route::post('/tarjetas/verificar-acceso', [TarjetaRfidController::class, 'verificarAcceso']);

// Accesos
Route::get('/accesos', [AccesoController::class, 'index']);
Route::get('/accesos/estadisticas', [AccesoController::class, 'estadisticas']);