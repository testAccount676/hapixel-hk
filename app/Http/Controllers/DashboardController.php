<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the dashboard root page.
     */
    public function index(Request $request): Response
    {

        return Inertia::render('dashboard', [
            'roomsCount' => DB::table('rooms')->count(),
            'totalUsersRegistered' => DB::table('players')->count(),
            'furnisCount' => DB::table('furniture')->count(),
        ]);
    }
}
