<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, mt_rand(15, 20))->create()->each(function ($user) {
            factory(App\Ticket::class, mt_rand(1, 3))->create([
                "user_id" => $user->id
            ])->each(function($ticket){
                factory(App\Comment::class, mt_rand(1,4))->create([
                    "ticket_id" => $ticket->id
                ]);
            });
        });

        echo App\User::all()->count() . " users generated" . PHP_EOL;
        echo App\Ticket::all()->count() . " tickets generated" . PHP_EOL;
        echo App\Comment::all()->count() . " comments generated" . PHP_EOL;

    }
}
