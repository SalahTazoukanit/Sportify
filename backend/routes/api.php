<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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
        Route::get('/filterEventsByCategory/{name}', [CategoryController::class, 'filterEventsByCategory'])->name('filterEventsByCategory.categories');
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
            Route::post('/show', [UserController::class, 'show'])->name('show.user');
            Route::put('/updateUser', [UserController::class, 'updateUser'])->name('updateUser.user');
            Route::delete('/deleteUser/{id}', [UserController::class, 'destroy'])->name('delete.user');
        });

        //Events Routes
        Route::prefix('/events')->group(function () {
            Route::post('/getOwnEvents', [EventController::class, 'getOwnEvents'])->name('getOwnEvents.event');
            Route::post('/store', [EventController::class, 'store'])->name('store.event');
            Route::put('/update/{id}', [EventController::class, 'update'])->name('update.event');
            Route::delete('/delete/{id}', [EventController::class, 'destroy'])->name('destroy.event');
            Route::put('/changeStatus/{id}', [EventController::class, 'changeStatus'])->name('changeStatus.event');
            Route::post('/{id}/participateToEvent', [EventController::class, 'participate'])->name('participate.event');
            Route::post('/{id}/showParticipantsEvent', [EventController::class, 'showParticipantsEvent'])->name('showParticipants.event');
            Route::post('/showMyParticipatedEvents', [EventController::class, 'showMyParticipatedEvents'])->name('showMyParticipatedEvents.event');
            Route::post('/addEventToFavourites/{id}', [EventController::class, 'addEventToFavourites'])->name('addEventToFavourites.event');
            Route::post('/removeEventFromFavourites/{id}', [EventController::class, 'removeEventFromFavourites'])->name('removeEventFromFavourites.event');
            Route::post('/showMyFavourites', [EventController::class, 'showMyFavourites'])->name('showMyFavourites.event');
            Route::post('/removeMeAsParticipant/{id}', [EventController::class, 'removeMeAsParticipant'])->name('removeMeAsParticipant.event');
        });

        //Categories Routes
        Route::prefix('/categories')->group(function () {
            Route::post('/store', [CategoryController::class, 'store'])->name('store.categories');
            Route::put('/update/{id}', [CategoryController::class, 'update'])->name('update.categories');
            Route::delete('/delete/{id}', [CategoryController::class, 'destroy'])->name('delete.categories');
        });

    });
});
//
