<?php

use App\Http\Controllers\RconController;
use Illuminate\Support\Facades\Route;

Route::post('/rcon/reload-catalog', [RconController::class, 'reloadCatalog'])->name('rcon.reload-catalog');
