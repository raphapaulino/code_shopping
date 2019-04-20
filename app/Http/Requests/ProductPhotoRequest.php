<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductPhotoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        /**
         * Quando for necessário o teste de uma coleção, é preciso validar 
         * em duas linhas conforme abaixo.
         */
        // return [
        //     'photos' => 'required|array',
        //     'photos.*' => 'required|image|max:' . (3 * 1024)
        // ];
        return !$this->route('photo') ? $this->rulesCreate() : $this->rulesUpdate();
    }

    private function rulesCreate()
    {
        return [
            'photos' => 'required|image|max:' . (3 * 1024)
        ];
    }

    private function rulesUpdate()
    {

    }
}
