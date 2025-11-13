<?php

namespace App\Http\Controllers;

use App\Models\Acceso;
use Illuminate\Http\Request;
class AccesoController extends Controller
{

    /**
     * Muestra una lista de los recursos.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Acceso::with('tarjetaRfid.usuario');
        if ($request->filled('start_date')) {
            $query->whereDate('fecha_acceso', '>=', $request->start_date);
        }
        if ($request->filled('end_date')) {
            $query->whereDate('fecha_acceso', '<=', $request->end_date);
        }
        $accesos = $query->orderBy('fecha_acceso', 'desc')->get();

        return response()->json($accesos);
    }
    /**
     * Calcula y devuelve estadísticas de acceso.
     *
     * @return \Illuminate\Http\Response
     */
    public function estadisticas()
    {
        // Contamos los accesos permitidos
        $permitidos = Acceso::where('acceso_permitido', true)->count();
        
        // Contamos los accesos denegados
        $denegados = Acceso::where('acceso_permitido', false)->count();

        // Devolvemos la data en un formato simple
        return response()->json([
            'permitidos' => $permitidos,
            'denegados' => $denegados
        ]);
    }
}