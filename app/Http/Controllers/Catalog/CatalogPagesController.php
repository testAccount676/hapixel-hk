<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\CatalogPagesRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Session;

class CatalogPagesController extends Controller
{
    public function show(Request $request): Response
    {
        $query = DB::table('catalog_pages')->orderBy('id');

        if ($request->has('search') && $request->search != null) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('caption', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%")
                    ->orWhere('parent_id', 'like', "%{$search}%");
            });
        }

        $catalogPages = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('catalog/pages', [
            'catalogPages' => $catalogPages,

        ]);
    }

    public function destroy($id): JsonResponse|RedirectResponse
    {
        $catalogPage = DB::table('catalog_pages')->where('id', $id)->first();

        if (!$catalogPage)
            return response()->json(['message' => 'Página não encontrada'], 404);

        DB::table('catalog_pages')->where('id', $id)->delete();

        return to_route('catalog.pages')->with('message', 'Página deletada com sucesso!');
    }

    public function create(): Response
    {
        return Inertia::render('catalog/create-page');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'caption' => ['required', 'string'],
            'min_rank' => 'required',
            'enabled' => 'required',
            'visible' => 'required',
            'order_num' => 'required',
        ]);

        DB::table('catalog_pages')->insert([
            'caption' => $request->caption,
            'min_rank' => $request->min_rank,
            'enabled' => $request->enabled,
            'visible' => $request->visible,
            'order_num' => $request->order_num,
        ]);

        Session::flash('message', 'Página criada com sucesso!');

        return redirect()->route('catalog.pages');
    }

    public function update(CatalogPagesRequest $request, $id)
    {
        $catalogPage = DB::table('catalog_pages')->where('id', $id)->first();

        if (!$catalogPage) {
            return redirect()->route('catalog.pages')->withErrors('Página não encontrada');
        }

        DB::table('catalog_pages')->where('id', $id)->update([
            'parent_id' => $request->input('parent_id'),
            'caption' => $request->input('caption'),
            'page_layout' => $request->input('page_layout'),
            'min_rank' => $request->input('min_rank'),
            'enabled' => $request->input('enabled'),
            'visible' => $request->input('visible'),
        ]);

        Session::flash('message', 'Página atualizada com sucesso!');

        return redirect()->route('catalog.pages');
    }
}
