<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'Api', 'as' => 'api.'], function () {
    Route::name('login')->post('login', 'AuthController@login');
    // Route::name('login')->post('login', function (Request $request) {
    //     dd($request->all());
    // });
    Route::name('refresh')->post('refresh', 'AuthController@refresh'); // token pode estar invalido mas o tempo de expiração não

    Route::name('logout')->post('logout', 'AuthController@logout');

    Route::group(['middleware' => ['auth:api', 'jwt.refresh'/*, 'cors' */]], function () {
                    
            Route::name('me')->get('me', 'AuthController@me');

            // Products
            Route::patch('products/{product}/restore', 'ProductController@restore');
            Route::resource('products', 'ProductController', ['except' => ['create', 'edit']]);
            Route::resource('products.categories', 'ProductCategoryController', ['only' => ['index', 'store', 'destroy']]);
            Route::resource('products.photos', 'ProductPhotoController', ['except' => ['create', 'edit']]);
            Route::post('products/{product}/photos/{photo}', 'ProductPhotoController@update')->name('products.photos.update');
            Route::resource('inputs', 'ProductInputController', ['only' => ['index', 'store', 'show']]);
            Route::resource('outputs', 'ProductOutputController', ['only' => ['index', 'store', 'show']]);

            // Categories
            Route::resource('categories', 'CategoryController', ['except' => ['create', 'edit']]);

            // users
            Route::resource('users', 'UserController', ['except' => ['create', 'edit']]);
        }
    );
});

