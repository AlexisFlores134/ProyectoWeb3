<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $usuario = Usuario::where('email', $request->email)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        return response()->json([
            'usuario' => $usuario,
            'mensaje' => 'Login exitoso'
        ]);
    }

    public function logout(Request $request)
    {
        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }

    public function usuario(Request $request)
    {
        $email = $request->header('X-User-Email');
        
        if (!$email) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $usuario = Usuario::where('email', $email)->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 401);
        }

        return response()->json($usuario);
    }
}