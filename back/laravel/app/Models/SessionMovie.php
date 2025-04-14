<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SessionMovie extends Model
{
    protected $fillable = [
        'imdb', 'title', 'time', 'date', 'seats', 'vip'
    ];

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class, 'ID_session', 'id');
    }
}
