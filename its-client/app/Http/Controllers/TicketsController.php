<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TicketRequest;
use App\Http\Requests\UpdateTicketStatusRequest;
use Illuminate\Support\Facades\Auth;

use App\Ticket;
use App\Comment;

class TicketsController extends Controller
{
    public function __construct(){
        $this->middleware("auth");
    }

    // GET: /tickets
    public function index(Request $request){
        $user = Auth::user();
        $tickets = $user->tickets->sortByDesc("created_at");
        return view("tickets.index", ["tickets" => $tickets]);
    }
    

    // GET: /tickets/5
    public function details($id){
        $ticket = Ticket::findOrFail($id);
        return view("tickets.details", ["ticket" => $ticket]);
    }
    

    // GET: /tickets/create
    public function create(){
        $operating_system = ["Windows", "Mac OS", "Linux", "iOS", "Android OS", "other", "- not applicable -"];
        $software_issues = [
            "Google services setup", 
            "Service accounts", 
            "Storage",
            "Cloud storage increase",
            "Wifi Setup",
            "Printing",
            "Misconfigured software",
            "other"];
        return view("tickets.create", compact("operating_system", "software_issues"));
    }


    // POST: /tickets
    public function store(TicketRequest $request){
        $ticket = new Ticket();
        $ticket->user_id = Auth::user()->id;
        $ticket->operating_system = $request->operating_system;
        $ticket->software_issue = $request->software_issue;
        $ticket->subject = $request->subject;
        $ticket->details = $request->details;
        $ticket->status = "pending";
        
        if($ticket->save()){
            return view("tickets.created", compact("ticket"))->with("success", "Ticket has successfully created (ticket id: {$ticket->id})");
        }
        
        return back()->with("danger", "Something went wrong while submitting a ticket");;
    }


    
}
