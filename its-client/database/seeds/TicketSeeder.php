<?php

use Illuminate\Database\Seeder;
use App\Ticket;

use Faker\Factory as Faker;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
    }
}
