<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->name('console.')->prefix('/console')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Console/Dashboard');
    })->name('dashboard');
    Route::get('/students', function () {
        return Inertia::render('Console/Students');
    })->name('students');
    Route::get('/moderators', function () {
        return Inertia::render('Console/Moderators');
    })->name('moderators');
    Route::get('/lessons', function () {
        return Inertia::render('Console/Lessons/Show');
    })->name('lessons');
});
