<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TarjetaRfid extends Model
{
    use HasFactory;

    protected $table = 'tarjeta_rfids';

    protected $fillable = [
        'uid',
        'usuario_id',
        'activa'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function accesos()
    {
        return $this->hasMany(Acceso::class, 'tarjeta_rfid_id');
    }
}