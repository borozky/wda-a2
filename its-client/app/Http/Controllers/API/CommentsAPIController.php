<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Validator;

use App\Ticket;
use App\Comment;
use App\Http\Requests\CommentRequest;

class CommentsAPIController extends Controller
{

    // GET: /api/comments
    public function all (Request $request) {
        $comments = App\Comment::all();
        return response()->json($comments);
    }


    // GET: /api/comment/{comment}
    public function details (Request $request, App\Comment $comment) {
        return $comment;
    }


    // GET: /api/tickets/{ticket}/comments
    public function ticketComments (Ticket $ticket) {
        $comments = $ticket->comments;
        return response()->json($comments);
    }

    // POST: /comments
    public function create (Request $request) {

        $validator = Validator::make($request->all(), [
            "details" => "required|min:2",
            "ticket_id" => "required|exists:Ticket,id",
            "commentor_id" => "required",
            "commentor_email" => "required|email",
            "commentor_fullname" => "required|min:2"
        ]);

        if ($validator->fails()) {
            return response($validator->errors(), 422);
        }

        $comment = new Comment;
        $comment->ticket_id = $request->ticket_id;
        $comment->details = $request->details;
        $comment->commentor_id = $request->commentor_id;
        $comment->commentor_email = $request->commentor_email;
        $comment->commentor_fullname = $request->commentor_fullname;
    
        if ($comment->save()) {
            return response()->json($comment);
        }
    
        return abort(422);
    }

    // POST: /tickets/{id}/comments
    public function createByTicketID (Request $request, $id) {
        
        $validator = Validator::make($request->all(), [
            "details" => "required|min:2",
            "ticket_id" => "required|exists:Ticket,id",
            "commentor_id" => "required",
            "commentor_email" => "required|email",
            "commentor_fullname" => "required|min:2"
        ]);

        if ($validator->fails()) {
            return response($validator->errors(), 422);
        }

        $comment = new Comment;
        $comment->ticket_id = $id;
        $comment->details = $request->details;
        $comment->commentor_id = $request->commentor_id;
        $comment->commentor_email = $request->commentor_email;
        $comment->commentor_fullname = $request->commentor_fullname;
    
        if ($comment->save()) {
            return response()->json($comment);
        }
    
        return abort(422);
    }










}
