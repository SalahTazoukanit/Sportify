<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//Routes don't need any authentification ;

Route::prefix('v1')->group(function () {
    //User Routes
    Route::prefix('/users')->group(function () {
        Route::post('/register', [UserController::class, 'register'])->name('register');
        Route::post('/login', [UserController::class, 'login'])->name('login');

    });

    // Events Routes
    Route::prefix('/events')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index.events');
        Route::get('/filterEventsByName/{name}', [EventController::class, 'filterEventsByName'])->name('filterEventsByName.events');
        Route::get('/{id}', [EventController::class, 'show'])->name('show.event');

    });

    //Categories Routes
    Route::prefix('/categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('index.categories');
        Route::get('/{id}', [CategoryController::class, 'show'])->name('show.category');

    });
});

//Routes need authentification with token ;
Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('v1')->group(function () {

        //User Routes
        Route::prefix('/users')->group(function () {
            Route::get('/', [UserController::class, 'index'])->name('index.users');
            Route::post('/logout', [UserController::class, 'logout'])->name('logout');
        });

        //Events Routes
        Route::prefix('/events')->group(function () {
            Route::post('/getOwnEvents', [EventController::class, 'getOwnEvents'])->name('getOwnEvents.event');
            Route::post('/store', [EventController::class, 'store'])->name('store.event');
            Route::put('/update/{id}', [EventController::class, 'update'])->name('update.event');
            Route::delete('/delete/{id}', [EventController::class, 'destroy'])->name('destroy.event');
            Route::post('/{id}/addParticipantToEvent', [EventController::class, 'participate'])->name('participate.event');
            Route::post('/{id}/showParticipantsEvent', [EventController::class, 'showParticipantsEvent'])->name('showParticipants.event');
        });

        //Categories Routes
        Route::prefix('/categories')->group(function () {
            Route::post('/', [CategoryController::class, 'index'])->name('index.categories');
            Route::post('/store', [CategoryController::class, 'store'])->name('store.categories');
            Route::put('/update/{id}', [CategoryController::class, 'update'])->name('update.categories');
            Route::delete('/delete/{id}', [CategoryController::class, 'destroy'])->name('delete.categories');
        });

    });
});
//
