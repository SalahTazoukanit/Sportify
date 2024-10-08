<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Category;
use App\Models\User;

class CategoryControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testAddNewCategory () {

        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user);

        $response = $this->postJson('/api/v1/categories/store', [
            'name' => 'Football',
            'history' => 'description history',
            'rules' => 'description rules',
            "image" => null ,
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('categories', [
            'name' => 'Football',
            'history' => 'description history',
            'rules' => 'description rules',
            'image' =>null,
        ]);

    }

    public function testAddCategoryWithEmptyName() {

        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user);

        $response = $this->postJson('/api/v1/categories/store', [
            'name' => '',
            'history' => 'description history',
            'rules' => 'description rules',
            'image' => null,
        ]);

        $response->assertStatus(422);

        $this->assertDatabaseMissing('categories', [
            'history' => 'description history',
            'rules' => 'description rules',
            'name' => '',
            'image' =>null,
        ]);
    }

    public function testAddCategoryWithEmptyHistory() {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user);

        $response = $this->postJson('/api/v1/categories/store', [
            'name' => 'Football',
            'history' => '',
            'rules' => 'description rules',
            'image' => null,
        ]);

        $response->assertStatus(422);

        $this->assertDatabaseMissing('categories', [
            'name' => 'Football',
            'rules' => 'description rules',
        ]);
    }

    public function testAddCategoryWithEmptyRules() {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user);

        $response = $this->postJson('/api/v1/categories/store', [
            'name' => 'Football',
            'history' => 'description history',
            'rules' => '',
            'image' => null,
        ]);

        $response->assertStatus(422);

        $this->assertDatabaseMissing('categories', [
            'name' => 'Football',
            'history' => 'description history',
        ]);
    }



}
