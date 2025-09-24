<?php

namespace Database\Seeders;

use App\Models\Acceso;
use App\Models\TarjetaRfid;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class AccesoSeeder extends Seeder
{
    public function run()
    {
        $tarjetas = TarjetaRfid::all();

        if ($tarjetas->isEmpty()) {
            $this->command->error('❌ No hay tarjetas RFID disponibles para generar accesos.');
            return;
        }

        $ubicaciones = ['Entrada Principal', 'Salida Principal', 'Área de Oficinas', 'Laboratorio', 'Almacén', 'Sala de Servidores'];
        $accesos = [];

        // Generar accesos de los últimos 7 días (menos registros para evitar problemas)
        for ($i = 0; $i < 50; $i++) { // Reducido a 50 registros
            $tarjeta = $tarjetas->random();
            $accesoPermitido = rand(0, 10) > 1; // 90% de accesos permitidos
            $ubicacion = $ubicaciones[array_rand($ubicaciones)];
            
            // Fecha aleatoria en los últimos 7 días
            $fechaAcceso = Carbon::now()
                ->subDays(rand(0, 7))
                ->subHours(rand(0, 23))
                ->subMinutes(rand(0, 59));

            // Para tarjetas desactivadas, forzar acceso denegado
            if (!$tarjeta->activa) {
                $accesoPermitido = false;
            }

            $accesos[] = [
                'tarjeta_rfid_id' => $tarjeta->id,
                'ubicacion' => $ubicacion,
                'acceso_permitido' => $accesoPermitido,
                'fecha_acceso' => $fechaAcceso,
                'created_at' => $fechaAcceso,
                'updated_at' => $fechaAcceso
            ];
        }

        // Insertar uno por uno para evitar problemas de claves duplicadas
        $contador = 0;
        foreach ($accesos as $acceso) {
            try {
                Acceso::create($acceso);
                $contador++;
            } catch (\Exception $e) {
                $this->command->error("❌ Error creando acceso: " . $e->getMessage());
            }
        }

        $accesosPermitidos = Acceso::where('acceso_permitido', true)->count();
        $accesosDenegados = Acceso::where('acceso_permitido', false)->count();

        $this->command->info("✅ $contador registros de acceso creados exitosamente!");
        $this->command->info("✅ Accesos permitidos: $accesosPermitidos");
        $this->command->info("❌ Accesos denegados: $accesosDenegados");
    }
}