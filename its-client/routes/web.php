<?php

// Pages
Route::get('/', "PagesController@index")->name("home");
Route::get('/faq', "PagesController@faq")->name("faq");

// Tickets
Route::get("/tickets", "TicketsController@index")->name("tickets");
Route::get("/tickets/create", "TicketsController@create")->name("tickets_create");
Route::get("/tickets/{id}", "TicketsController@details")->name("ticket_details");
Route::post("/tickets", "TicketsController@store")->name("tickets_store");

Auth::routes();
