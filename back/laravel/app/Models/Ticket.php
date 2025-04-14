<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    protected $fillable = [
        'ID_user', 'ID_session', 'sala', 'seats', 'total'
    ];

    public function sessions(): BelongsTo
    {
        return $this->belongsTo(SessionMovie::class, 'ID_session', 'id');
    }

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class, 'ID_user', 'id');
    }
}
