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
Route::get("tickets/{ticket}", function(App\Ticket $ticket){
    return $ticket;
});

Route::put("tickets/{ticket}", function(Request $request, App\Ticket $ticket){
    // if ticket is not found, will redirect to 404 page
    // see: Laravel model binding

    // If these fields are provided, they will be validate
    // Doesn't have to fill all fields. 
    $validator = Validator::make($request->all(), [
        "status" => "in:Pending,In Progress,Unresolved,Resolved",
        "escalation_level" => "in:1,2,3",
        "priority" => "in:low,medium,high",
        "assigned_to" => "min:2"
    ]);

    if($validator->fails()){
        return response($validator->errors(), 422);
    }

    $ticket->update($request->all());
    return $ticket;
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




// COMMENTS -------------

Route::get("/comments", function(Request $request){
    $comments = App\Comment::all();
    return response()->json($comments);
});

Route::get("comments/{comment}", function(Request $request, App\Comment $comment){
    return $comment;
});

Route::get("tickets/{ticket}/comments", function(App\Ticket $ticket){
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
