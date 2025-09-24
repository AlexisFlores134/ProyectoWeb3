<?php

namespace App\Http\Controllers;

use App\Models\Acceso;
use Illuminate\Http\Request;

class AccesoController extends Controller
{
    public function index(Request $request)
    {
        $usuario = $request->usuario;
        
        $query = Acceso::with(['tarjetaRfid.usuario']);

        if (!$usuario->esAdministrador()) {
            $query->whereHas('tarjetaRfid', function($q) use ($usuario) {
                $q->where('usuario_id', $usuario->id);
            });
        }

        if ($request->has('fecha_inicio') && $request->has('fecha_fin')) {
            $query->whereBetween('fecha_acceso', [
                $request->fecha_inicio,
                $request->fecha_fin
            ]);
        }

        if ($request->has('usuario_id') && $usuario->esAdministrador()) {
            $query->whereHas('tarjetaRfid.usuario', function($q) use ($request) {
                $q->where('id', $request->usuario_id);
            });
        }

        if ($request->has('ubicacion')) {
            $query->where('ubicacion', 'like', '%' . $request->ubicacion . '%');
        }

        $accesos = $query->orderBy('fecha_acceso', 'desc')->paginate(50);

        return response()->json($accesos);
    }

    public function estadisticas(Request $request)
    {
        $usuario = $request->usuario;
        
        $query = Acceso::query();

        if (!$usuario->esAdministrador()) {
            $query->whereHas('tarjetaRfid', function($q) use ($usuario) {
                $q->where('usuario_id', $usuario->id);
            });
        }

        $totalAccesos = $query->count();
        $accesosPermitidos = $query->clone()->where('acceso_permitido', true)->count();
        $accesosDenegados = $totalAccesos - $accesosPermitidos;

        $estadisticasUbicacion = $query->clone()
            ->select('ubicacion')
            ->selectRaw('COUNT(*) as total')
            ->selectRaw('SUM(CASE WHEN acceso_permitido = true THEN 1 ELSE 0 END) as permitidos')
            ->selectRaw('SUM(CASE WHEN acceso_permitido = false THEN 1 ELSE 0 END) as denegados')
            ->groupBy('ubicacion')
            ->get();

        return response()->json([
            'total_accesos' => $totalAccesos,
            'accesos_permitidos' => $accesosPermitidos,
            'accesos_denegados' => $accesosDenegados,
            'estadisticas_ubicacion' => $estadisticasUbicacion
        ]);
    }
}