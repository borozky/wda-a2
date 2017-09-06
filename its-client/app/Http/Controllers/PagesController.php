<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    // GET: /
    public function index(){
        return view("pages/home");
    }
    
    // GET: /faq
    public function faq(){
        return view("pages/faq");
    }
    
    
    
}
