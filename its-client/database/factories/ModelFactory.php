<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'fullname' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Ticket::class, function(Faker\Generator $faker){
    
    $operating_system = ["Windows", "Mac OS", "Linux", "iOS", "Android OS", "other", "- not applicable -"];
    $software_issue = ["Google services setup", "Service accounts", "Storage", "Cloud storage increase", "Wifi Setup", "Printing","Misconfigured software", "other"];
    $ticket_status = ["Pending", "In Progress", "Unresolved", "Resolved"];

    return [
        "operating_system" => $operating_system[array_rand($operating_system)],
        "software_issue" => $software_issue[array_rand($software_issue)],
        "subject" => $faker->sentence(6, true),
        "details" => $faker->text(1000),
        "status" => $ticket_status[array_rand($ticket_status)]
    ];
});

$factory->define(App\Comment::class, function(Faker\Generator $faker){
    return [
        "details" => $faker->text(120),
        "commentor_id" => str_random(32),
        "commentor_email" => $faker->email,
        "commentor_fullname" => $faker->name
    ];
});
