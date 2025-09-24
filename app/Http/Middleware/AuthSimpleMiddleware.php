<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Symfony\Component\HttpFoundation\Response;

class AuthSimpleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $email = $request->header('X-User-Email');
        
        if (!$email) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $usuario = Usuario::where('email', $email)->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no válido'], 401);
        }

        $request->merge(['usuario' => $usuario]);

        return $next($request);
    }
}