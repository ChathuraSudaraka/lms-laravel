<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect(env('LANDING_URL', '/'));
})->name('home');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->name('console.')->prefix('/console')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Console/Dashboard');
    })->name('dashboard');

    Route::prefix('students')->name('students.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Console/Students');
        })->name('index');
        
        Route::get('/{id}', function ($id) {
            // Mock student data for demonstration - replace with actual DB query
            $student = collect([
                'id' => $id,
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'grade' => '10',
                'status' => 'Active',
                'feeStatus' => 'paid',
                'photoUrl' => 'https://ui-avatars.com/api/?name=John+Doe',
            ]);
            
            return Inertia::render('Console/Students/Show', [
                'student' => $student
            ]);
        })->name('show');  // This will be prefixed with 'console.students.'
    });

    Route::get('/moderators', function () {
        return Inertia::render('Console/Moderators');
    })->name('moderators');

    Route::prefix('lessons')->name('lessons.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Console/Lessons/Show');
        })->name('index');
        
        Route::get('/{id}', function ($id) {
            return Inertia::render('Console/Lessons/Single');
        })->name('view');
    });

    Route::get('/products', function () {
        return Inertia::render('Console/Products/Show');
    })->name('products');

    // Quiz Routes
    Route::prefix('/quizzes')->name('quizzes.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Console/Quizzes/Show');
        })->name('index');
        
        Route::get('/new', function () {
            return Inertia::render('Console/Quizzes/New');
        })->name('new');
        
        Route::get('/{quiz}', function () {
            return Inertia::render('Console/Quizzes/Single');
        })->name('view');
        
        Route::get('/{quiz}/edit', function () {
            return Inertia::render('Console/Quizzes/Edit');
        })->name('edit');
    });
});
