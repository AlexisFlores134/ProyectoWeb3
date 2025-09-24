<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $usuario = Usuario::where('email', $request->email)->first();

        if ($usuario && password_verify($request->password, $usuario->password)) {
            return response()->json([
                'success' => true,
                'user' => $usuario,
                'message' => 'Login exitoso'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Credenciales incorrectas'
        ], 401);
    }

    public function logout(Request $request)
    {
        return response()->json(['message' => 'Logout exitoso']);
    }
}