<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ArticlesController extends Controller
{
    public function index(Request $request): Response
    {
        $query = DB::table('articles')
            ->join('players', 'articles.author_id', '=', 'players.id')
            ->select(
                'articles.*',
                'players.username as author'
            )
            ->orderBy('articles.id');

        if ($request->has('search') && $request->search != null) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('articles.title', 'like', "%{$search}%")
                    ->orWhere('articles.short_story', 'like', "%{$search}%")
                    ->orWhere('articles.category', 'like', "%{$search}%");
            });
        }

        $articles = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('articles/index', [
            'articles' => $articles,
        ]);
    }

    public function destroy($id): RedirectResponse|JsonResponse
    {
        $article = DB::table('articles')->where('id', $id)->first();

        if (!$article) return response()->json(['message' => 'Notícia não encontrada'], 404);

        DB::table('articles')->where('id', $id)->delete();

        return to_route('articles.index')->with('message', 'Notícia deletada com sucesso!');
    }

    public function create(): Response
    {
        return Inertia::render('articles/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'short_story' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(['General', 'Updates', 'Activity', 'Promotion'])],
            'long_story' => ['required', 'string'],
            'image' => ['required', 'image', 'max:2048'],
        ]);

        $file = $request->file('image');
        $path = $file->store('articles', 'public');

        DB::table('articles')->insert([
            'author_id' => Auth::id(),
            'title' => $request->title,
            'short_story' => $request->short_story,
            'long_story' => $request->long_story,
            'category' => $request->category,
            'image' => $path,
        ]);

        return redirect()->back();
    }
}
