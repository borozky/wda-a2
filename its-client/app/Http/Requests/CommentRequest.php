<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
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
        return [
            "details" => "required|min:2",
            "ticket_id" => "required|exists:Ticket,id",
            "commentor_id" => "nullable",
            "commentor_email" => "required|email",
            "commentor_fullname" => "required|min:2"
        ];
    }
}
