<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Comment;

class Ticket extends Model
{
    protected $table = "Ticket";
    protected $fillable = ["user_id", "operating_system", "software_issue", "subject", "details", "status"];
    
    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
