<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\BadgesController;
use App\Http\Controllers\Catalog\CatalogItemsController;
use App\Http\Controllers\Catalog\CatalogPagesController;
use App\Http\Controllers\RconController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Users\UsersController;
use App\Http\Controllers\WordFilterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('users')->group(function () {
        Route::get('/manage-accounts', UsersController::class);
        Route::delete('/user/{id}', [UsersController::class, 'destroy'])->name('users.destroy');
        Route::put('/user/{id}', [UsersController::class, 'update'])->name('users.update');
    });

    Route::prefix('badges')->group(function () {
       Route::get('/', BadgesController::class)->name('badges.index');
    });
        

    Route::prefix('articles')->group(function () {
        Route::get('/', [ArticlesController::class, 'index'])->name('articles.index');
        Route::delete('/{id}', [ArticlesController::class, 'destroy'])->name('articles.destroy');
        Route::post('/', [ArticlesController::class, 'store'])->name('articles.store');
        Route::get('/create', [ArticlesController::class, 'create'])->name('articles.create');
    });

    Route::prefix('word-filter')->group(function () {
        Route::get('/', WordFilterController::class)->name('wordfilter.index');
        Route::delete('/{id}', [WordFilterController::class, 'destroy'])->name('wordfilter.destroy');
        Route::post('/', [WordFilterController::class, 'store'])->name('wordfilter.store');
        Route::put('/{id}', [WordFilterController::class, 'update'])->name('wordfilter.update');
    });

    Route::prefix('catalog')->group(function () {
        Route::get('/pages', [CatalogPagesController::class, 'show'])->name('catalog.pages');
        Route::get('/create-page', [CatalogPagesController::class, 'create'])->name('catalog.create');
        Route::post('/create-page', [CatalogPagesController::class, 'store'])->name('catalog.store');
        Route::delete('/page/{id}', [CatalogPagesController::class, 'destroy'])->name('catalog.destroy');
        Route::put('/page/{id}', [CatalogPagesController::class, 'update'])->name('catalog.update');

        Route::get('/items', CatalogItemsController::class)->name('catalog.items');
        Route::get('/items/add', [CatalogItemsController::class, 'create'])->name('catalog.items.add');
        Route::delete('/items/{id}', [CatalogItemsController::class, 'destroy'])->name('catalog.destroy');
        Route::put('/items/{id}', [CatalogItemsController::class, 'update'])->name('catalog.update');
        Route::post('/items/create', [CatalogItemsController::class, 'store'])->name('catalog.items.create');
    });

    Route::prefix('rcon')->group(function () {
        Route::post('/reload-catalog', [RconController::class, 'reloadCatalog'])->name('rcon.reload-catalog');
        Route::post('/ban-user', [RconController::class, 'banUserIp'])->name('rcon.ban-user');
    });

    Route::prefix('users')->group(function () {
        Route::get('/{id}', [UsersController::class, 'getUsernameById'])->name('users.getUsernameById');
    });
});
