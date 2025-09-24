<?php

namespace Database\Seeders;

use App\Models\TarjetaRfid;
use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class TarjetaRfidSeeder extends Seeder
{
    public function run()
    {
        // Obtener todos los usuarios excepto el admin
        $usuarios = Usuario::where('rol', 'usuario')->get();

        $tarjetas = [
            [
                'uid' => 'A1B2C3D4E5F6',
                'usuario_id' => $usuarios[0]->id,
                'activa' => true,
                'fecha_registro' => Carbon::now()->subMonths(2)
            ],
            [
                'uid' => 'B2C3D4E5F6G7',
                'usuario_id' => $usuarios[1]->id,
                'activa' => true,
                'fecha_registro' => Carbon::now()->subMonths(3)
            ],
            [
                'uid' => 'C3D4E5F6G7H8',
                'usuario_id' => $usuarios[2]->id,
                'activa' => true,
                'fecha_registro' => Carbon::now()->subMonths(1)
            ],
            [
                'uid' => 'D4E5F6G7H8I9',
                'usuario_id' => $usuarios[3]->id,
                'activa' => false, // Tarjeta desactivada
                'fecha_registro' => Carbon::now()->subMonths(4)
            ],
            [
                'uid' => 'E5F6G7H8I9J0',
                'usuario_id' => $usuarios[4]->id,
                'activa' => true,
                'fecha_registro' => Carbon::now()->subWeeks(2)
            ],
            [
                'uid' => 'F6G7H8I9J0K1',
                'usuario_id' => $usuarios[5]->id,
                'activa' => true,
                'fecha_registro' => Carbon::now()->subWeeks(3)
            ],
            [
                'uid' => 'G7H8I9J0K1L2',
                'usuario_id' => $usuarios[6]->id,
                'activa' => true,
                'fecha_registro' => Carbon::now()->subDays(5)
            ],
            [
                'uid' => 'H8I9J0K1L2M3',
                'usuario_id' => $usuarios[7]->id,
                'activa' => false, // Tarjeta desactivada
                'fecha_registro' => Carbon::now()->subMonths(2)
            ],
            [
                'uid' => 'I9J0K1L2M3N4',
                'usuario_id' => $usuarios[8]->id,
                'activa' => true,
                'fecha_registro' => Carbon::now()->subWeeks(1)
            ]
        ];

        foreach ($tarjetas as $tarjeta) {
            TarjetaRfid::create($tarjeta);
        }

        $this->command->info('✅ 10 tarjetas RFID creadas exitosamente!');
        $this->command->info('📊 8 tarjetas activas, 2 desactivadas');
    }
}