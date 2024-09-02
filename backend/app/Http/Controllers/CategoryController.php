<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json([
            "categories" => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category = new Category;
        $category->name = $request->name;
        $category->save();

        return response()->json([
            "category" => $category,
            "message" => "La categorie " . $category->name . " a été ajouté avec succes."
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {
        $category = Category::find($id);
        return response()->json([
            "category" => $category
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, String $id)
    {
        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->update();

        return response()->json([
            "category" => $category,
            "message" => 'La categorie a étée mise à jour .'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category, String $id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json([
            "message" => "La categorie " . $category->name . " a été supprimé ."
        ], 200);
    }
}
