<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use App\Services\RconService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VoucherController extends Controller
{
    private RconService $rconService;

    public function __construct()
    {
        $this->rconService = new RconService();
    }

    public function __invoke(Request $request)
    {
        $vouchers = Voucher::all();

        return Inertia::render("vouchers", [
            "vouchers" => $vouchers,
        ]);
    }
    public function store(Request $request)
    {
        $code = $this->generateCode();
        $voucherType = $request->input("type");

        Voucher::create([
            "type" => $voucherType,
            "code" => $code,
            "data" => $request->input("data"),
            "created_by" => Auth::user()->id,
        ]);

        $messageOne = "Um novo voucher foi publicado!";

        if ($voucherType == "VIP") {
            $messageOne = "Novo voucher VIP 7 dias foi publicado!";
        }

        $this->rconService->sendGlobalNotification(
            Auth::user()->username,
            "voucher",
            $messageOne,
        );
        $this->rconService->sendGlobalNotification(
            Auth::user()->username,
            "voucher",
            "Resgate o código: " . $code
        );

        return back()->with('message', 'Voucher criado com sucesso!');
    }

    function generateCode($length = 6)
    {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $code = '';
        for ($i = 0; $i < $length; $i++) {
            $code .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $code;
    }

    public function destroy($id)
    {
        $voucher = Voucher::find($id);

        if ($voucher) {
            $voucher->delete();
            return back()->with('message', 'Voucher deletado com sucesso!');
        } else {
            return back(404)->with('message', 'Voucher não encontrado.');
        }
    }
}
