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

        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'password' => 'admin',
            "role" => "admin",
            "image_profile" => 'https://www.icone-png.com/png/54/53786.png'
        ]);

        User::factory()->create([
            'name' => 'Test Member',
            'email' => 'member@example.com',
            'password' => 'member',
            "image_profile" => 'https://i.pinimg.com/736x/59/74/d0/5974d04323d9efbaf170c72cfdb07b44.jpg',
        ]);

        $this->call([
            CategorySeeder::class,
            EventSeeder::class,
        ]);
    }
}
