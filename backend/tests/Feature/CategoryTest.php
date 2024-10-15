<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Category;
use App\Models\User;

class CategoryTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic feature test example.
     */


    public function testAddNewCategory(){

    $user = User::factory()->create([
        'role' => 'admin',
    ]);

    $this->actingAs($user);

        $category = [
            "name"=>"Football",
            "history"=>"test history",
            "rules"=>"test rules",
            "image"=>null,
        ];

        $response = $this->postJson('/api/v1/categories/store', $category);

        $response->assertStatus(200);

        $response->assertJson([
            "message" => "La categorie Football a été ajoutée avec succes."
            ]);
    }

    public function testAddNewCategoryWithoutName(){

        $user = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->actingAs($user);

        $category = [
            "name"=>"",
            "history"=>"test history",
            "rules"=>"test rules",
            "image"=>null,
        ];

        $response = $this->postJson('/api/v1/categories/store', $category);

        $response->assertStatus(422);

        $response->assertJson([
            "message" => "validation.required"
            ]);


    }

    public function testAddNewCategoryWithoutHistory(){

        $user = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->actingAs($user);

        $category = [
            "name"=>"Football",
            "history"=>"",
            "rules"=>"test rules",
            "image"=>null,
        ];

        $response = $this->postJson('/api/v1/categories/store', $category);

        $response->assertStatus(200);

        $response->assertJson([
            "message" => "La categorie Football a été ajoutée avec succes."
            ]);


    }

    public function testAddNewCategoryWithoutRules(){

        $user = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->actingAs($user);

        $category = [
            "name"=>"Football",
            "history"=>"test history",
            "rules"=>"",
            "image"=>null,
        ];

        $response = $this->postJson('/api/v1/categories/store', $category);

        $response->assertStatus(200);

        $response->assertJson([
            "message" => "La categorie Football a été ajoutée avec succes."
            ]);


    }

    public function testDisplayCategories(){

        $response = $this->get('/api/v1/categories');

        $response->assertStatus(200);

    }


    public function testDisplayCategoryById(){

        $category = [
            "id"=>1,
            "name"=>"Football",
            "history"=>"test history",
            "rules"=>"",
            "image"=>null,
        ];

        $response = $this->get('/api/v1/categories/1');

        $response->assertStatus(200);

    }


    public function testUpdateCategory()
    {
        $user = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->actingAs($user);

        $category = Category::factory()->create([
            'name' => 'Football',
            'history' => 'test history',
            'rules' => '',
            'image' => null,
        ]);

        $category_updated = [
            "name" => "Tennis",
            "history" => "updated test history",
            "rules" => "updated test rules",
            "image" => null,
        ];

        $response = $this->putJson('/api/v1/categories/update/' . $category->id, $category_updated);

        $response->assertStatus(200);

    }

    public function testDeleteCategory(){

        $user = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->actingAs($user);

        $category = Category::factory()->create([
            'name' => 'Football',
            'history' => 'test history',
            'rules' => 'test rules',
            'image' => null,
        ]);

        $response = $this->deleteJson('/api/v1/categories/delete/' . $category->id);

        $response->assertStatus(200);

    }
}
