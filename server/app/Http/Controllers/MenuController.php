<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $query = Menu::with('category')
            ->where('user_id', auth()->id());

        if ($request->filter === 'trashed') {
            $query->onlyTrashed();
        } elseif ($request->filter === 'all') {
            $query->withTrashed();
        }

        if($request->has('category_id') && $request->category_id != ''){
            $query->where('category_id', $request->category_id);
        }

        if($request->filled('search')){
            $search = $request->search;

            $query->where(function ($q) use ($search){
                $q->where('name', 'like', "%{$search}%");
            });
        };

        $menus = $query->latest()->paginate(12);

        return response()->json([
            'menus' => $menus
        ]);
    }

   public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:50',
        'category_id' => 'required|exists:categories,id',
        'description' => 'required|string|max:255',
        'cost' => 'required|numeric',
        'price' => 'required|numeric',
        'image' => 'required|image|mimes:jpg,png,svg,jpeg|max:2048'
    ]);

    $imagePath = $request->file('image')->store('menu', 'public');

    $costPrice = (float) $request->cost;
    $sellPrice = (float) $request->price;

    // Compute profit and revenue
    $profit = $sellPrice - $costPrice;

    $menu = Menu::create([
        'name' => $request->name,
        'category_id' => $request->category_id,
        'description' => $request->description,
        'cost' => $costPrice,
        'price' => $sellPrice,
        'profit' => $profit,
        'image' => $imagePath,
        'user_id' => auth()->id()
    ]);

    return response()->json([
        'message' => 'Menu created successfully',
        'menu' => $menu
    ]);
}

    public function update(Request $request, Menu $menu)
{
    $request->validate([
        'name' => 'required|string|max:50',
        'category_id' => 'required|exists:categories,id',
        'description' => 'required|string|max:255',
        'cost' => 'required|numeric',
        'price' => 'required|numeric',
        'image' => 'nullable|image|mimes:jpg,png,svg,jpeg|max:2048'
    ]);

    if ($request->hasFile('image')) {
        if ($menu->image && Storage::disk('public')->exists($menu->image)) {
            Storage::disk('public')->delete($menu->image);
        }
        $menu->image = $request->file('image')->store('menu', 'public');
    }

    $costPrice = (float) $request->cost;
    $sellPrice = (float) $request->price;

    $profit = $sellPrice - $costPrice;

    $menu->update([
        'name' => $request->name,
        'category_id' => $request->category_id,
        'description' => $request->description,
        'cost' => $costPrice,
        'price' => $sellPrice,
        'profit' => $profit,
        'image' => $menu->image
    ]);

    return response()->json([
        'message' => 'Menu updated successfully',
        'menu' => $menu
    ]);
}

    public function destroy(Menu $menu)
    {
        $menu->delete();
        return response()->json([
            'message' => 'Menu deleted successfully'
        ]);
    }

    public function restore($menu_id)
    {
        $menu = Menu::onlyTrashed()
            ->where('user_id', auth()->id())
            ->findOrFail($menu_id);

        $menu->restore();

        return response()->json([
            'message' => 'Menu restored successfully'
        ]);
    }

    public function forceDelete($menu_id)
    {
        $menu = Menu::onlyTrashed()
            ->where('user_id', auth()->id())
            ->findOrFail($menu_id);

        if ($menu->image && Storage::disk('public')->exists($menu->image)) {
            Storage::disk('public')->delete($menu->image);
        }

        $menu->forceDelete();

        return response()->json([
            'message' => 'Menu permanently deleted'
        ]);
    }
}