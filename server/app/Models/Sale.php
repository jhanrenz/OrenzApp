<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{

    protected $fillable = [
        'menu_id',
        'user_id',
        'sale_date',
        'quantity',
        'current_cost',
        'current_price',
        'total_cost',
        'total_price',
        'total_profit',
    ];
    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
