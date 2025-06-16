<?php

namespace App\Services;

use Socket;

class RconService
{
    protected Socket $socket;
    protected bool $connected;

    public function sendRconMessage($key, $data)
    {
        if (!$this->connect()) {
            return false;
        }

        $data = json_encode(['key' => $key, 'data' => $data]);

        if (!@socket_write($this->socket, $data, strlen($data))) {
            abort(500, socket_strerror(socket_last_error($this->socket)));
        }

        $response = socket_read($this->socket, 2048);

        return json_decode($response);
    }

    public function sendCatalogUpdate($userId)
    {
        return $this->sendRconMessage('reloadcatalog', [
            'user_id' => $userId
        ]);
    }

    public function banUserIp($username, $bannerId, $bannerUsername)
    {
        return $this->sendRconMessage('ipban', [
            'username' => $username,
            'bannerId' => $bannerId,
            'bannerUsername' => $bannerUsername,
        ]);
    }

    public function sendGlobalNotification($user, $image, $message)
    {
        return $this->sendRconMessage('notification', [
            'user' => $user,
            'image' => $image,
            'message' => $message,
        ]);
    }

    public function connect(): bool
    {
        if (!function_exists("socket_create")) {
            return false;
        }

        $this->socket = @socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

        $socket_connect = @socket_connect($this->socket, env('RCON_HOST', '127.0.0.1'), env('RCON_PORT', 30001));

        if (!$socket_connect) {
            return false;
        }

        return $this->connected = true;
    }
}
