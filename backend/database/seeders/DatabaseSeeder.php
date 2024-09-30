<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'test',
            "role" => "admin",
            "image_profile" => 'images/profiles/admin.jpg'
        ]);

        User::factory()->create([
            'name' => 'Test Member',
            'email' => 'member@example.com',
            'password' => 'member',
            "image_profile" => 'images/profiles/member.jpg',
        ]);

        $this->call([
            CategorySeeder::class,
            EventSeeder::class,
        ]);
    }
}
