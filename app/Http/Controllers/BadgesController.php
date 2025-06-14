<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;

class BadgesController extends Controller
{
    protected Filesystem $ftp;
    protected string $externalTextsPath = '/wwwroot/hapixel-cms/public/nitro-assets/gamedata/ExternalTexts.json';

    public function __construct()
    {
        $this->ftp = Storage::disk("ftp");
    }

    public function __invoke(Request $request)
    {
        if (!$this->ftp->exists($this->externalTextsPath)) {
            return redirect()->back()->with('message', 'ExternalTexts not found.');
        }

        $externalTexts = $this->ftp->get($this->externalTextsPath);
        $data = json_decode($externalTexts, true);

        $badges = [];

        foreach ($data as $key => $value) {
            if (str_starts_with($key, 'badge_name_')) {
                $code = substr($key, strlen('badge_name_'));
                $badges[$code]["badge_name_{$code}"] = $value;
            }

            if (str_starts_with($key, 'badge_desc_')) {
                $code = substr($key, strlen('badge_desc_'));
                $badges[$code]["badge_desc_{$code}"] = $value;
            }
        }

        $badgeData = array_values($badges);

        if ($request->has('search') && $request->search != null) {
            $search = mb_strtolower($request->search);

            $badgeData = array_filter($badgeData, function ($badge) use ($search) {
                foreach ($badge as $text) {
                    if (mb_stripos($text, $search) !== false) {
                        return true;
                    }
                }
                return false;
            });

            $badgeData = array_values($badgeData);
        }

        $currentPage = Paginator::resolveCurrentPage() ?: 1;
        $perPage = 10;

        $collection = collect($badgeData);

        $currentPageItems = $collection->slice(($currentPage - 1) * $perPage, $perPage)->values();

        $paginatedBadges = new LengthAwarePaginator(
            $currentPageItems,
            $collection->count(),
            $perPage,
            $currentPage,
            [
                'path' => Paginator::resolveCurrentPath(),
                'query' => $request->query(),
            ]
        );

        return Inertia::render("badges", [
            "badges" => $paginatedBadges,
        ]);
    }

}
