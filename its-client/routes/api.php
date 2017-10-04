<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// TICKETS --------------
Route::get("/tickets",                  "API\TicketsAPIController@all");
Route::get("/tickets/search/{keyword}", "API\TicketsAPIController@search");
Route::get("tickets/{ticket}",          "API\TicketsAPIController@details");
Route::put("tickets/{ticket}",          "API\TicketsAPIController@update");
Route::get("/users/{id}/tickets",        "API\TicketsAPIController@userTickets")->where("id", "[0-9]+");


// USERS -----------------
Route::get("/users",                    "API\UsersAPIController@all");
Route::get("/users/{user}",             "API\UsersAPIController@details");

// COMMENTS -------------
Route::get("/comments",                 "API\CommentsAPIController@all");
Route::get("comments/{comment}",        "API\CommentsAPIController@details");
Route::get("tickets/{ticket}/comments", "API\CommentsAPIController@ticketComments");
Route::post("tickets/{id}/comments",    "API\CommentsAPIController@createByTicketID");
Route::post("/comments",                "API\CommentsAPIController@create");
