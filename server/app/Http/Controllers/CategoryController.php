<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::where('user_id', auth()->id());
        if($request->filter === 'trashed'){
            $query->onlyTrashed();
        }else if($request->filter === 'all'){
            $query->withTrashed();
        }

        $categories = $query->get();
        return response()->json([
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50'
        ]);
        $category = Category::create([
            'name' => $request->name,
            'user_id' => auth()->id(),
        ]);
        return response()->json([
            'message' => 'category stored success',
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:50',
        ]);
        $category->update([
            'name' => $request->name
        ]);
        return response()->json([
            'message' => 'category updated success',
            'category' => $category
        ]);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([
            'message' => 'category deleted success'
        ]);
    }

    public function restore($category_id)
    {
        $category = Category::onlyTrashed()
        ->where('user_id', auth()->id())
        ->findOrFail($category_id);

        $category->restore();
        return response()->json([
            'message' => 'category restored success'
        ]);
    }

    public function forceDelete($category_id)
    {
        $category = Category::onlyTrashed()
        ->where('user_id', auth()->id())
        ->findOrFail($category_id);

        $category->forceDelete();
        return response()->json([
            'message' => 'category deleted permanently'
        ]);
    }
}
