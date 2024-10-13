<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->randomElement(['Football']),
            "history" => fake()->text(),
            "rules"=>fake()->text(),
            "image"=>'https://media.laregione.ch/files/domains/laregione.ch/images/sizes/1440x756/4c6b/f_-madrid-city-real-quarti-finale-champions-1enjm.jpg?v=1',
        ];
    }
}
