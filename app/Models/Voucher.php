<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    protected $table = "vouchers";

    public $timestamps = false;

    protected $fillable = [
        "type",
        "data",
        "created_by",
        "code",
    ];
}
