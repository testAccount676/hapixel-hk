<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\CatalogItemRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $userQuery = User::query()->orderBy('id');

        if ($request->has('search') && $request->search != null) {
            $search = $request->search;

            $userQuery->where(function ($query) use ($search) {
                $query->where('username', 'like', '%' . $search . '%')
                    ->orWhere('motto', 'like', '%' . $search . '%')
                    ->orWhere('id', 'like', '%' . $search . '%');
            });
        }

        $users = $userQuery->paginate(10)->withQueryString();

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    public function destroy($userId): RedirectResponse
    {
        try {
            $user = User::query()->findOrFail($userId);
            $user->delete();
            return redirect()->back();
        } catch (ModelNotFoundException) {
            abort(404);
        }
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'username' => 'required',
            'motto' => 'required',
            'rank' => 'required',
            'email' => 'required',
        ]);

        $user = DB::table('players')->where('id', $id)->first();

        if (!$user) {
            return redirect()->back();
        }

        DB::table('players')->where('id', $id)->update([
            'username' => $request->username,
            'motto' => $request->motto,
            'email' => $request->email,
            'rank' => $request->rank,
        ]);

        Session::flash('message', 'Usuário atualizado com sucesso!');

        return redirect()->back();
    }
}
