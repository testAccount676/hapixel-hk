<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CatalogItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'catalog_name' => ['required', 'string'],
            'amount' => ['required', 'integer', 'min:1'],
            'cost_credits' => ['required', 'integer'],
            'cost_diamonds' => ['required', 'integer'],
            'cost_pixels' => ['required', 'integer'],
            'item_ids' => ['required'],
            'page_id' => ['required', 'integer'],
        ];
    }
}
