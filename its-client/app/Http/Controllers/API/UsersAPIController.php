<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;

class UsersAPIController extends Controller
{

    // GET: /api/users
    public function all (Request $request) {
        $users = User::all();
        return response()->json($users);
    }


    // GET: /api/users/{user}
    public function details (Request $request, User $user){
        return $user;
    }

}
