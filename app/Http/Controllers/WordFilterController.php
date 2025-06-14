<?php

namespace App\Http\Controllers;

use App\Models\WordFilter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class WordFilterController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $query = WordFilter::query()->orderBy('id');

        if ($request->has('search') && $request->search != null) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('word', 'like', "%{$search}%")
                    ->orWhere('replacement', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%");
            });
        }

        $words = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('wordfilter/index', [
            'words' => $words,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'word' => ['required', 'string'],
            'replacement' => ['required', 'string'],
        ]);

        $wordAlreadyExists = WordFilter::query()->where('word', $request->get('word'))->exists();

        if ($wordAlreadyExists) {
            return redirect()->back()->with('message', 'A palavra ' . $request->get('word') . ' já existe.');
        }

        WordFilter::query()->create([
            'word' => $request->get('word'),
            'replacement' => $request->get('replacement'),
        ]);

        return redirect()->back()->with('message', 'Palavra ' . $request->get('word') . ' foi inserida no filtro com sucesso.');
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'word' => ['required', 'string'],
            'replacement' => ['required', 'string'],
        ]);

        WordFilter::query()->find($id)->update([
            'word' => $request->get('word'),
            'replacement' => $request->get('replacement'),
        ]);

        return redirect()->back()->with('message', 'Palavra atualizada com sucesso.');
    }

    public function destroy($id): RedirectResponse
    {
        WordFilter::query()->find($id)->delete();

        return redirect()->back()->with('message', 'Palavra removida do filtro com sucesso.');
    }
}
