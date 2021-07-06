<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\MasterApiController;
use Illuminate\Http\Request;
use App\Models\Spending;
use Illuminate\Support\Facades\DB;

class SpendingApiController extends MasterApiController
{
    protected $model;

    public function __construct(Spending $spending, Request $request)
    {
        $this->model = $spending;
        $this->request = $request;
    }
    
    public function index()
    {
        $data = $this->model->orderBy('closing_date')->get();

        return response()->json($data);
    }

    public function byCategory($category_fk)
    {
        $data = $this->model->where('category_fk', $category_fk)->orderBy('closing_date')->get();

        if (!count($data)) {
            return response()->json(['error' => 'Nenhum registro encontrado'], 404);
        } else {
            return response()->json($data);
        }
    }

    public function byPeriod($period)
    {
        $data = DB::table('spendings')
                ->select('spendings.*')
                ->join('categories', 'categories.id', '=', 'category_fk')
                ->where('period', '=', $period)
                ->orderBy('closing_date')
                ->get();
                
        if (!count($data)) {
            return response()->json(['error' => 'Nenhum registro encontrado'], 404);
        } else {
            return response()->json($data);
        }
    }

    public function allFilters($category_fk, $period)
    {
        $data = DB::table('spendings')
                ->select('spendings.*')
                ->join('categories', 'categories.id', '=', 'category_fk')
                ->where('period', '=', $period)
                ->where('category_fk', $category_fk)
                ->orderBy('closing_date')
                ->get();
                
        if (!count($data)) {
            return response()->json(['error' => 'Nenhum registro encontrado'], 404);
        } else {
            return response()->json($data);
        }
    }

}
