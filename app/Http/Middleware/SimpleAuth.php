<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Symfony\Component\HttpFoundation\Response;

class SimpleAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('Authorization');
        
        if (!$token) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        }

        // Extraer el token (formato: "Bearer {token}")
        $token = str_replace('Bearer ', '', $token);
        
        // Buscar usuario por token (puedes ajustar esta lógica)
        $usuario = Usuario::where('remember_token', $token)->first();
        
        if (!$usuario) {
            return response()->json(['error' => 'Token inválido'], 401);
        }

        // Agregar el usuario a la request para uso en controladores
        $request->merge(['usuario' => $usuario]);
        $request->setUserResolver(function () use ($usuario) {
            return $usuario;
        });

        return $next($request);
    }
}