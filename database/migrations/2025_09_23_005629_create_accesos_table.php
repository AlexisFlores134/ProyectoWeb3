<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('accesos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tarjeta_rfid_id')->nullable()->constrained('tarjeta_rfids')->onDelete('cascade');
            $table->string('ubicacion');
            $table->boolean('acceso_permitido')->default(false);
            $table->timestamp('fecha_acceso')->useCurrent();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('accesos');
    }
};