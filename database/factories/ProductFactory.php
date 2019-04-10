<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\Models\Product::class, function (Faker $faker) {

    $words = $faker->words(3, true);

    return [
        'name' => $words,
        'description' => $faker->paragraph(4, true),
        'price' => $faker->randomFloat($nbMaxDecimals = 2, $min = 100, $max = 899),
        'stock' => $faker->numberBetween($min = 1, $max = 100),
        // 'slug' => str_slug($words),
        'active' => $faker->boolean(50)
    ];

});
