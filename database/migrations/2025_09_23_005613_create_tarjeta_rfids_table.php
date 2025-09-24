<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tarjeta_rfids', function (Blueprint $table) {
            $table->id();
            $table->string('uid')->unique();
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('cascade');
            $table->boolean('activa')->default(true);
            $table->timestamp('fecha_registro')->useCurrent();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tarjeta_rfids');
    }
};