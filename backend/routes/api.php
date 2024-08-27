<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    //User Routes
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index.users');
        Route::post('/register', [UserController::class, 'register'])->name('register');
    });
    // Events Routes
    Route::prefix('events')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index.events');
        Route::get('/{id}', [EventController::class, 'show'])->name('show.event');
        Route::post('/store', [EventController::class, 'store'])->name('store.event');
        Route::put('/update/{id}', [EventController::class, 'update'])->name('update.event');
        Route::delete('/delete/{id}', [EventController::class, 'destroy'])->name('destroy.event');
    });
});
