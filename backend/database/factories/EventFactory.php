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
            "user_id" => 1,
            "category_id" => 1,
            "status"=> "published",
            'name' => fake()->name(),
            'image' => fake()->image(),
            'description' => fake()->sentence(20),
            'date' => fake()->date(),
            'position' => fake()->text(10),
            'aviable_places' => fake()->numberBetween(2, 24),
            'time' => fake()->time()
        ];
    }
}
