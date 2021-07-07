<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    protected $fillable = [
        'title',
        'period'
    ];

    public function rules()
    {
        return [
            'title' => 'required',
            'period' => 'in:semanal,mensal,anual',
        ];
    }
}
