<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/test', function () {
        return response()->json([
            'message' => 'Hello World!',
        ]);
    });
});

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);
