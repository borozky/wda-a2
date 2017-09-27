<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

// get all tickets,
// optionally, you can filter results with query parameters
Route::get("/tickets", function(Request $request){
    $tickets = App\Ticket::where($request->all())->latest()->get();
    return response()->json($tickets);
});


// search tickets
Route::get("/tickets/search/{keyword}", function(Request $request){
    $tickets = App\Ticket::where("subject", "LIKE", "%{$request->search}%")
                        ->orWhere("details", "LIKE", "%{$request->search}%")
                        ->latest()
                        ->get();
    return response()->json($tickets);
});


// get tickets by id
Route::get("tickets/{id}", function($id){
    $ticket = App\Ticket::find($id);
    return response()->json($ticket);
});


// get user tickets
Route::get("/user/{id}/tickets", function(Request $request, $id){
    $user_tickets = App\Ticket::where("user_id", $id)->latest()->get();
    return response()->json($user_tickets);
})->where("id", "[0-9]+");



Route::get("/users", function(Request $request){
    $users = App\User::all();
    return response()->json($users);
});

Route::get("/comments", function(Request $request){
    $comments = App\Comment::all();
    return response()->json($comments);
});

Route::get("comments/{id}", function(Request $request, $id){
    $comment = App\Comment::find($id);
    return response()->json($comment);
});

Route::get("tickets/{id}/comments", function($id){
    $ticket = App\Ticket::find($id);
    $comments = $ticket->comments;
    return response()->json($comments);
});

Route::post("tickets/{id}/comments", function(App\Http\Requests\CommentRequest $request, $id){
    $comment = new App\Comment;
    $comment->ticket_id = $id;
    $comment->details = $request->details;
    $comment->commentor_id = $request->commentor_id;
    $comment->commentor_email = $request->commentor_email;
    $comment->commentor_fullname = $request->commentor_fullname;

    if($comment->save()){
        return response()->json($comment);
    }

    return abort(422);
});

Route::post("/comments", function(App\Http\Requests\CommentRequest $request){
    $comment = new App\Comment;
    $comment->ticket_id = $request->ticket_id;
    $comment->details = $request->details;
    $comment->commentor_id = $request->commentor_id;
    $comment->commentor_email = $request->commentor_email;
    $comment->commentor_fullname = $request->commentor_fullname;
    
    if($comment->save()){
        return response()->json($comment);
    }

    return abort(422); // Unprocessable entity
});
