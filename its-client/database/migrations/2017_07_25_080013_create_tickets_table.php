<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketsTable extends Migration
{
    public function up()
    {
        Schema::create('Ticket', function (Blueprint $table) {

            $table->bigIncrements('id');

            $table->bigInteger("user_id")->unsigned();
            $table->foreign('user_id')->references('id')->on('User');

            $table->string("operating_system")->nullable();
            $table->string("software_issue")->nullable();
            $table->string("subject")->nullable();
            $table->longText("details");
            $table->enum("status", ["Pending", "In Progress", "Unresolved", "Resolved"])->default("Pending");
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('Ticket');
    }
}
