<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Ticket;
use App\User;

class Comment extends Model
{
    protected $table = "Comment";
    protected $fillable = ["ticket_id", "details", "commentor_id", "commentor_email", "commentor_fullname"];
    
    public function ticket(){
        return $this->belongsTo(Ticket::class);
    }
    
    public function user(){
        return $this->belongsTo(User::class);
    }
}
