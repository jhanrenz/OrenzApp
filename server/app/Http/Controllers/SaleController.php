<?php

namespace App\Http\Controllers;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function index(Request $request)
{
    $sales = Sale::with('menu')
        ->where('user_id', auth()->id())
        ->latest()
        ->get();

    return response()->json([
        'sales' => $sales
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'sale_date' => 'required|date',
            'quantity' => 'required|numeric',
            'current_cost' => 'required|numeric',
            'current_price' => 'required|numeric',
            'total_cost' => 'required|numeric',
            'total_price' => 'required|numeric',
            'total_profit' => 'required|string'
        ]);
        $sale = Sale::create([
            'menu_id' => $request->menu_id,
            'user_id' => auth()->id(),
            'sale_date' => $request->sale_date,
            'quantity' => $request->quantity,
            'current_cost' => $request->current_cost,
            'current_price' => $request->current_price,
            'total_cost' => $request->total_cost,
            'total_price' => $request->total_price,
            'total_profit' => $request->total_profit
        ]);
        return response()->json([
            'sale' => $sale
        ]);    
    }
     public function update(Request $request, Sale $sale)
    {
        $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'sale_date' => 'required|date',
            'quantity' => 'required|numeric',
            'current_cost' => 'required|numeric',
            'current_price' => 'required|numeric',
            'total_cost' => 'required|numeric',
            'total_price' => 'required|numeric',
            'total_profit' => 'required|string'
        ]);
        $sale->update([
            'menu_id' => $request->menu_id,
            'sale_date' => $request->sale_date,
            'quantity' => $request->quantity,
            'current_cost' => $request->current_cost,
            'current_price' => $request->current_price,
            'total_cost' => $request->total_cost,
            'total_price' => $request->total_price,
            'total_profit' => $request->total_profit
        ]);
        return response()->json([
            'sale' => $sale
        ]);    
    }

    public function destroy(Sale $sale)
    {
        $sale->delete();
        return response()->json([
            'message' => 'sales details deleted'
        ]);
    }
}
