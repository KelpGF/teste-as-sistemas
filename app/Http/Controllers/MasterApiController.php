<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class MasterApiController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    public function index()
    {
        $data = $this->model->all();
        
        if (!count($data)) {
            return response()->json(['error' => 'Nenhum registro encontrado'], 404);
        } else {
            return response()->json($data);
        }
    }


    public function store()
    {
        $this->validate($this->request, $this->model->rules());

        $dataForm = $this->request->all();

        $data = $this->model->create($dataForm);
        
        if ($data) {
            $response = [
                "success" => "Um novo Registro foi adicionado !!",
            ];
            $status = 201;
        } else {
            $response = [
                "errors" => ["message" => ["Erro ao criar novo Registro !!"]]
            ];
            
            $status = 500;
        }
        
        return response()->json($response, $status);
    }


    public function show($id)
    {
        if (!$data = $this->model->find($id)) {
            return response()->json([
                'error'=>'Nenhuma informação encontradas'
            ], 404);
        } else {
            return response()->json($data);
        }
    }


    public function update($id)
    {   
        if (!$data = $this->model->find($id))
            return response()->json(['error' => 'Registro inválido'], 404);

        $this->validate($this->request, $this->model->rules());

        $dataForm = $this->request->all();

        $data->update($dataForm);

        if ($data) {
            $response = [
                "success" => "Registro Atualizado !!",
            ];
            $status = 200;
        } else {
            $response = [
                "errors" => ["message" => ["Erro ao atualizar Registro !!"]]
            ];
            
            $status = 500;
        }
        
        return response()->json($response, $status);
    }


    public function destroy($id)
    {
        if ($data = $this->model->find($id)) {
            $data->delete();
            
            return response()->json(['success' => 'Deletado com sucesso']);
        } else {
            return response()->json(['error' => 'Registro inválido'], 404); 
        }
    }
}
