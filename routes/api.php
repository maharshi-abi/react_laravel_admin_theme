<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => 'api-header'], function () {
	Route::post('login', 'APICommanController@login');
	Route::post('register', 'APICommanController@register');
});

Route::group(['middleware' => ['jwt-auth', 'api-header']], function () {
	Route::get('users/list', 'APIController@users');
    Route::get('profile', 'APIController@profile');
    Route::post('profile', 'APIController@updateProfile');
    Route::get('removeUser/{id}', 'APIController@removeUser');
});
