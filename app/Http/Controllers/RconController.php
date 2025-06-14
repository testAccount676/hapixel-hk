<?php

namespace App\Http\Controllers;

use App\Services\RconService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RconController extends Controller
{
    protected RconService $rcon;
    public function __construct()
    {
        $this->rcon = new RconService();
    }

    public function reloadCatalog(Request $request): void
    {
        $userId = $request->input('user_id');
        $this->rcon->sendCatalogUpdate($userId);
    }

    public function banUserIp(Request $request): void
    {
        $username = $request->input('username');
        $bannerId = $request->input('bannerId');
        $bannerUsername = $request->input('bannerUsername');

        $this->rcon->banUserIp($username, $bannerId, $bannerUsername);
    }

    public function sendPacket(Request $request): void
    {
        $key = $request->input('key');
        $data = $request->input('data');

        if (!$key | !$data) return;

        $this->rcon->sendRconMessage($key, $data);
    }
}
