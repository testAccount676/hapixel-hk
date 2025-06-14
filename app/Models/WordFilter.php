<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WordFilter extends Model
{
    protected $table = 'wordfilter';

    protected $fillable = [
        'word',
        'replacement'
    ];
}
