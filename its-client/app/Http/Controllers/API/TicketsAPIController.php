<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use App\Ticket;

class TicketsAPIController extends Controller
{
    // GET: /api/tickets
    public function all(Request $request){
        $tickets = Ticket::where($request->all())->latest()->get();
        return response()->json($tickets);
    }


    // GET /api/tickets/{ticket}
    public function details (Request $request, Ticket $ticket) {
        return $ticket;
    }


    // Search by subject or details
    // GET: /api/tickets/search/{keyword}
    public function search(Request $request){
        $tickets = Ticket::where("subject", "LIKE", "%{$request->search}%")
                    ->orWhere("details", "LIKE", "%{$request->search}%")
                    ->latest()
                    ->get();
        return response()->json($tickets);
    }



    // PUT: /api/tickets/{ticket}
    public function update(Request $request, Ticket $ticket){
        if (count($request->all()) === 0) {
            return response("There are no fields present", 422);
        }
        // if ticket is not found, will automatically redirect to 404 page
        
        // Doesn't have to fill all fields. Provided fields will be validated
        $validator = Validator::make($request->all(), [
            "status" => "in:Pending,In Progress,Unresolved,Resolved",
            "escalation_level" => "nullable|in:1,2,3",
            "priority" => "nullable|in:low,medium,high",
            "assigned_to_uid" => "required_with_all:assigned_to_email,assigned_to_fullname",
            "assigned_to_email" => "required_with_all:assigned_to_uid,assigned_to_fullname|email",
            "assigned_to_fullname" => "required_with_all:assigned_to_uid,assigned_to_email|min:2"
        ]);

        if($validator->fails()){
            return response($validator->errors(), 422);
        }

        $ticket->update($request->all());
        return $ticket;
    }
    

    // Get tickets by user ID
    // GET: /api/users/{id}/tickets
    public function userTickets (Request $request, $id) {
        $user_tickets = Ticket::where("user_id", $id)->latest()->get();
        return response()->json($user_tickets);
    }









}
