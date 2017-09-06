<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use App\Comment;

class CommentsController extends Controller
{
    public function store(CommentRequest $request){
        $comment = Comment::create($request);

        if($comment){
            return back()->with("success", "Comment successfully added");
        }
        
        return back()->with("danger", "Failed to add new comment");
    }
}
