<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\Models\Category::class, function (Faker $faker) {

    $words = $faker->words(3, true);

    return [
        'name' => $words,
        'slug' => str_slug($words),
        'active' => $faker->boolean(50)
    ];
});
