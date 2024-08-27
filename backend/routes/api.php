<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    //User Routes
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index.users');
        Route::post('/register', [UserController::class, 'register'])->name('register');
    });
});
