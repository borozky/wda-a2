<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Ticket;
use App\Comment;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'User';
    protected $hidden = ['password', 'remember_token'];
    protected $fillable = ["fullname", "email", "password"];

    public function tickets(){
        return $this->hasMany(Ticket::class);
    }
    
    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
