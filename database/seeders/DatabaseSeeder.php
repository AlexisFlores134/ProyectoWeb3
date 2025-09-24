<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UsuarioSeeder::class,
            TarjetaRfidSeeder::class,
            AccesoSeeder::class,
        ]);

        $this->command->info('🎉 ¡Base de datos poblada exitosamente!');
        $this->command->info('👤 Usuarios: 10 (1 admin, 9 usuarios)');
        $this->command->info('💳 Tarjetas RFID: 10 (8 activas, 2 desactivadas)');
        $this->command->info('🚪 Accesos: 150 registros de los últimos 7 días');
        $this->command->info('');
        $this->command->info('🔑 Credenciales para pruebas:');
        $this->command->info('   Admin: admin@empresa.com / password123');
        $this->command->info('   Usuario: juan.perez@empresa.com / password123');
        $this->command->info('');
        $this->command->info('📋 UIDs de tarjetas para probar:');
        $this->command->info('   ✅ Activa: A1B2C3D4E5F6');
        $this->command->info('   ❌ Desactivada: D4E5F6G7H8I9');
    }
}