<?php

namespace App\Http\Controllers;

use App\Models\TarjetaRfid;
use App\Models\Acceso;
use Illuminate\Http\Request;

class TarjetaRfidController extends Controller
{
    public function index()
    {
        $tarjetas = TarjetaRfid::with('usuario')->get();
        return response()->json($tarjetas);
    }

    public function store(Request $request)
    {
        $request->validate([
            'uid' => 'required|unique:tarjeta_rfids',
            'usuario_id' => 'required|exists:usuarios,id',
        ]);

        $tarjeta = TarjetaRfid::create([
            'uid' => $request->uid,
            'usuario_id' => $request->usuario_id,
            'activa' => true
        ]);

        return response()->json($tarjeta, 201);
    }

    public function update(Request $request, TarjetaRfid $tarjetaRfid)
    {
        $request->validate([
            'activa' => 'required|boolean'
        ]);

        $tarjetaRfid->update(['activa' => $request->activa]);

        return response()->json($tarjetaRfid);
    }

    public function destroy(TarjetaRfid $tarjetaRfid)
    {
        $tarjetaRfid->delete();
        return response()->json(null, 204);
    }

public function verificarAcceso(Request $request)
{
    $request->validate([
        'uid' => 'required',
        'ubicacion' => 'required|string'
    ]);

    $tarjeta = TarjetaRfid::with('usuario')->where('uid', $request->uid)->first();

    if (!$tarjeta) {
        $acceso = Acceso::create([
            'tarjeta_rfid_id' => null,
            'ubicacion' => $request->ubicacion,
            'acceso_permitido' => false,
            'fecha_acceso' => now()
        ]);

        return response()->json([
            'acceso_permitido' => false,
            'mensaje' => 'Tarjeta no registrada'
        ]);
    }

    if (!$tarjeta->activa) {
        $acceso = Acceso::create([
            'tarjeta_rfid_id' => $tarjeta->id,
            'ubicacion' => $request->ubicacion,
            'acceso_permitido' => false,
            'fecha_acceso' => now()
        ]);

        return response()->json([
            'acceso_permitido' => false,
            'mensaje' => 'Tarjeta desactivada'
        ]);
    }

    $acceso = Acceso::create([
        'tarjeta_rfid_id' => $tarjeta->id,
        'ubicacion' => $request->ubicacion,
        'acceso_permitido' => true,
        'fecha_acceso' => now()
    ]);

    return response()->json([
        'acceso_permitido' => true,
        'usuario' => $tarjeta->usuario,
        'mensaje' => 'Acceso permitido'
    ]);
}
}