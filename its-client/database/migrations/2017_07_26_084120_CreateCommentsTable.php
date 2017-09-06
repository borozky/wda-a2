<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     * 
     * @return void
     */
    public function up()
    {
        Schema::create('Comment', function (Blueprint $table) {

            $table->bigIncrements('id');
            
            $table->bigInteger("ticket_id")->unsigned();
            $table->foreign('ticket_id')->references('id')->on('Ticket');
            $table->bigInteger("user_id")->unsigned();
            $table->foreign('user_id')->references('id')->on('User');
            $table->longText("details");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Comment');
    }
}
