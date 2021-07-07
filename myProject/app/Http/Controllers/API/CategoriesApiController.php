<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\MasterApiController;
use Illuminate\Http\Request;
use App\Models\Categories;

class CategoriesApiController extends MasterApiController
{
    protected $model;

    public function __construct(Categories $categorie, Request $request)
    {
        $this->model = $categorie;
        $this->request = $request;
    }
    
}
