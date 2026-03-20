<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SaleController;

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user',[AuthController::class,'user']);
    Route::post('/logout',[AuthController::class,'logout']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/categories',[CategoryController::class,'index']);
    Route::post('/categories',[CategoryController::class,'store']);
    Route::patch('/categories/{category}',[CategoryController::class,'update']);
    Route::delete('/categories/{category}',[CategoryController::class,'destroy']);
    Route::patch('/categories/{category}/restore',[CategoryController::class,'restore']);
    Route::delete('/categories/{category}/force',[CategoryController::class,'forceDelete']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/menus',[MenuController::class,'index']);
    Route::post('/menus',[MenuController::class,'store']);
    Route::patch('/menus/{menu}',[MenuController::class,'update']);
    Route::delete('/menus/{menu}',[MenuController::class,'destroy']);
    Route::patch('/menus/{menu}/restore',[MenuController::class,'restore']);
    Route::delete('/menus/{menu}/force',[MenuController::class,'forceDelete']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/sales',[SaleController::class,'index']);
    Route::post('/sales',[SaleController::class,'store']);
    Route::patch('/sales/{sale}',[SaleController::class,'update']);
    Route::delete('/sales/{sale}',[SaleController::class,'destroy']);
});
