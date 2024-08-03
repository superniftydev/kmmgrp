<?php

use Illuminate\Support\Facades\Route;
use Supernifty\CMS\Http\Controllers\TopicController;

# Route::get('/', function () {
#     return view('welcome');
# });

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');


});


# added by the superniftycms installation process
Route::superniftycms(config('superniftycms.urls.cms'));

