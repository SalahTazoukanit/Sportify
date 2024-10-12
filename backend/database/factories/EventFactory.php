<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => fake()->numberBetween(1,2),
            "category_id" => random_int(1,5),
            "status"=> "published",
            'name' => fake()->words(3 , true),
            'image' => fake()->imageUrl(),
            'description' => fake()->sentence(20),
            'date' => fake()->date(),
            'position' => fake()->streetAddress(),
            'aviable_places' => fake()->numberBetween(2, 24),
            'time' => fake()->time()
        ];
    }
}
