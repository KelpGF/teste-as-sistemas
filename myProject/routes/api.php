<?php

//Routes from categories
Route::resource('categories','API\CategoriesApiController');

//Routes from spending
Route::get('spending/allFilters/{category_fk}/{period}', 'API\SpendingApiController@allFilters');
Route::get('spending/byCategory/{category_fk}', 'API\SpendingApiController@byCategory');
Route::get('spending/byPeriod/{period}', 'API\SpendingApiController@byPeriod');
Route::resource('spending','API\SpendingApiController');
    

?>