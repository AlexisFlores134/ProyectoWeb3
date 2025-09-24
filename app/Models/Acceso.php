<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acceso extends Model
{
    use HasFactory;

    protected $table = 'accesos';

    protected $fillable = [
        'tarjeta_rfid_id',
        'ubicacion',
        'acceso_permitido',
        'fecha_acceso'
    ];

    public function tarjetaRfid()
    {
        return $this->belongsTo(TarjetaRfid::class, 'tarjeta_rfid_id');
    }
}