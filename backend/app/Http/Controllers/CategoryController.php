<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use App\Models\Event;

/**
 * @OA\Info(title="Category API", version="1.0.0")
 */
class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/categories",
     *     summary="Display a listing of categories",
     *     @OA\Response(response="200", description="List of categories"),
     * )
     */
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            "categories" => $categories
        ]);
    }

    /**
     * @OA\Post(
     *     path="/categories/store",
     *     summary="Store a newly created category",
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/Category")),
     *     @OA\Response(response="200", description="Category created successfully"),
     *     @OA\Response(response="409", description="User is not admin"),
     * )
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user->role === "admin") {
            $request->validate([
                'name' => 'required|string',
                'history' => 'nullable|text',
                'rules' => 'nullable|text',
                'image' => 'nullable|image',
            ]);

            $category = new Category;
            $category->name = $request->name;
            $category->history = $request->history;
            $category->rules = $request->rules;

            if ($request->hasFile('image')) {
                $category->image = $request->file('image')->store('images/categories', 'public');
            }

            $category->save();

            return response()->json([
                "category" => $category,
                "message" => "La catégorie " . $category->name . " a été ajoutée avec succès."
            ], 200);
        } else {
            return response()->json(['message' => "Vous n'êtes pas administrateur."], 409);
        }
    }

    /**
     * @OA\Get(
     *     path="/categories/{id}",
     *     summary="Display the specified category",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="string")),
     *     @OA\Response(response="200", description="Category details"),
     *     @OA\Response(response="404", description="Category not found"),
     * )
     */
    public function show(String $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json([
            "category" => $category
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/categories/update/{id}",
     *     summary="Update the specified category",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="string")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/Category")),
     *     @OA\Response(response="200", description="Category updated successfully"),
     *     @OA\Response(response="409", description="User is not admin"),
     *     @OA\Response(response="404", description="Category not found"),
     * )
     */
    public function update(Request $request, String $id)
    {
        $user = Auth::user();
        $category = Category::findOrFail($id);

        if ($user->role === "admin") {
            $category->name = $request->name ?? $category->name;
            $category->history = $request->history ?? $category->history;
            $category->rules = $request->rules ?? $category->rules;

            if ($request->hasFile('image')) {
                $category->image = $request->file('image')->store("images/categories", "public");
            }

            $category->save();

            return response()->json([
                "category" => $category,
                "message" => 'La catégorie ' . $category->name . ' a été mise à jour.'
            ], 200);
        } else {
            return response()->json(['message' => "Vous n'êtes pas administrateur."], 409);
        }
    }

    /**
     * @OA\Delete(
     *     path="/categories/delete/{id}",
     *     summary="Remove the specified category",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="string")),
     *     @OA\Response(response="200", description="Category deleted successfully"),
     *     @OA\Response(response="409", description="User is not admin"),
     *     @OA\Response(response="404", description="Category not found"),
     * )
     */
    public function destroy(String $id)
    {
        $user = Auth::user();
        $category = Category::find($id);

        if ($user->role === "admin") {
            if (!$category) {
                return response()->json(['message' => 'Category not found'], 404);
            }
            $category->delete();
            return response()->json([
                "message" => "La catégorie " . $category->name . " a été supprimée."
            ], 200);
        } else {
            return response()->json(['message' => "Vous n'êtes pas administrateur."], 409);
        }
    }

    /**
     * @OA\Get(
     *     path="/categories/filterEventsByCategory/{name}",
     *     summary="Filter events by category name",
     *     @OA\Parameter(name="name", in="path", required=true, @OA\Schema(type="string")),
     *     @OA\Response(response="200", description="Filtered events by category"),
     *     @OA\Response(response="404", description="Category not found"),
     * )
     */
    public function filterEventsByCategory($name)
    {
        $category = Category::with(["events"])
            ->where('name', 'like', '%' . $name . '%')
            ->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $allEvents = $category->events;

        return response()->json([
            "category" => $category,
            "allEvents" => $allEvents
        ], 200);
    }
}
