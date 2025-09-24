<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    public function run()
    {
        $usuarios = [
            [
                'nombre' => 'Administrador Principal',
                'email' => 'admin@empresa.com',
                'password' => Hash::make('password123'),
                'rol' => 'admin'
            ],
            [
                'nombre' => 'Juan Pérez López',
                'email' => 'juan.perez@empresa.com',
                'password' => Hash::make('password123'),
                'rol' => 'usuario'
            ],
            [
                'nombre' => 'María García Hernández',
                'email' => 'maria.garcia@empresa.com',
                'password' => Hash::make('password123'),
                'rol' => 'usuario'
            ],
            [
                'nombre' => 'Carlos Rodríguez Martínez',
                'email' => 'carlos.rodriguez@empresa.com',
                'password' => Hash::make('password123'),
                'rol' => 'usuario'
            ],
            [
                'nombre' => 'Ana López Díaz',
                'email' => 'ana.lopez@empresa.com',
                'password' => Hash::make('password123'),
                'rol' => 'usuario'
            ],
            [
                'nombre' => 'Pedro Sánchez Ruiz',
                'email' => 'pedro.sanchez@empresa.com',
                'password' => Hash::make('password123'),
                'rol' => 'usuario'
            ],
            [
                'nombre' => 'Laura Martínez Vargas',
                'email' => 'laura.martinez@empresa.com',
                'password' => Hash::make('password123'),
                'rol' => 'usuario'
            ],
            [
                'nombre' => 'Miguel Ángel Torres',
                'email' => 'miguel.torres@empresa.com',
                'password' => Hash::make('password123'),
                'rol' => 'usuario'
            ],
            [
                'nombre' => 'Sofía Ramírez Jiménez',
                'email' => 'sofia.ramirez@empresa.com',
                'password' => Hash::make('password123'),
                'rol' => 'usuario'
            ],
            [
                'nombre' => 'Roberto Navarro Castro',
                'email' => 'roberto.navarro@empresa.com',
                'password' => Hash::make('password123'),
                'rol' => 'usuario'
            ]
        ];

        foreach ($usuarios as $usuario) {
            Usuario::create($usuario);
        }

        $this->command->info('✅ 10 usuarios creados exitosamente!');
        $this->command->info('👤 Admin: admin@empresa.com / password123');
    }
}