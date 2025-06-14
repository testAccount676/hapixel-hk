<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\CatalogItemRequest;
use App\Http\Requests\CatalogPagesRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class CatalogItemsController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $query = DB::table('catalog_items')
            ->leftJoin('furniture', 'catalog_items.item_ids', '=', 'furniture.id')
            ->select(
                'catalog_items.*',
                'furniture.item_name as furniture_item_name'
            )
            ->orderBy('catalog_items.id');

        if ($request->has('search') && $request->search != null) {
            $search = $request->search;

            $query->where(function ($query) use ($search) {
                $query->where('catalog_items.page_id', 'like', '%' . $search . '%')
                    ->orWhere('catalog_items.catalog_name', 'like', '%' . $search . '%')
                    ->orWhere('catalog_items.id', 'like', '%' . $search . '%');
            });
        }

        $catalogItems = $query->paginate(10)->withQueryString();

        return Inertia::render('catalog/items/index', [
            'catalogItems' => $catalogItems,
        ]);
    }

    public function destroy($id): JsonResponse|RedirectResponse
    {
        $catalogItem = DB::table('catalog_items')->where('id', $id)->first();

        if (!$catalogItem) {
            return response()->json([
                'message' => 'Catalog item not found',
            ]);
        }

        DB::table('catalog_items')->where('id', $id)->delete();

        return to_route('catalog.items');
    }

    public function create(): Response
    {
        $pages = DB::table('catalog_pages')->select('id', 'caption')->get();

        return Inertia::render('catalog/items/add-item', [
            'pages' => $pages,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'catalog_name' => 'required',
            'item_ids' => 'required',
            'page_id' => 'required',
            'cost_credits' => 'required',
            'cost_diamonds' => 'required',
            'cost_pixels' => 'required',
        ]);

        DB::table('catalog_items')->insert([
            'catalog_name' => $request->get('catalog_name'),
            'item_ids' => $request->get('item_ids'),
            'page_id' => $request->get('page_id'),
            'cost_credits' => $request->get('cost_credits'),
            'cost_diamonds' => $request->get('cost_diamonds'),
            'cost_pixels' => $request->get('cost_pixels'),
        ]);

        Session::flash('message', 'Item inserido no catálogo com sucesso!');

        return redirect()->route('catalog.pages');
    }

    public function update(CatalogItemRequest $request, $id)
    {
        $catalogItem = DB::table('catalog_items')->where('id', $id)->first();

        if (!$catalogItem) {
            return redirect()->route('catalog.pages')->withErrors('Item não encontrada');
        }

        DB::table('catalog_items')->where('id', $id)->update([
            'catalog_name' => $request->catalog_name,
            'amount' => $request->amount,
            'cost_credits' => $request->cost_credits,
            'cost_diamonds' => $request->cost_diamonds,
            'cost_pixels' => $request->cost_pixels,
            'item_ids' => $request->item_ids,
            'page_id' => $request->page_id,
        ]);

        Session::flash('message', 'Item atualizado com sucesso!');

        return redirect()->route('catalog.pages');
    }
}
