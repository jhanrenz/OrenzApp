<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use SoftDeletes;

    protected $fillable = [
    'user_id', 
    'name', 
    'category_id', 
    'description', 
    'cost',
    'price', 
    'profit', 
    'image'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    

}
