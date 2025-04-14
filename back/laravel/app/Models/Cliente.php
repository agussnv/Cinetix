<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;

class Cliente extends Model
{
    use HasApiTokens;
    protected $table = 'clientes';
    protected $fillable = [
        'name', 'phone', 'email', 'password'
    ];

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class, 'ID_user', 'id');
    }
}
