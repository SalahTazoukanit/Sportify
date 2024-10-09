<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use App\Models\Event;

class CategoryController extends Controller
{

    //filter events by categories
    public function filterEventsByCategory($name){

        $category = Category::with(["events"])
        ->where('name', 'like', '%' . $name . '%')
        ->get();

        $allEvents = [];

        for ($i=0; $i < count($category); $i++) {
           $allEvents = $category[$i]->events ;
        }

        return response()->json([
            "category" => $category,
            "allEvents" => $allEvents
        ],200);
    }

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
        $user = Auth::user();

        if ($user->role === "admin") {

            $request->validate([
                'name' => 'required|string',
                'history' => 'nullable|text',
                'rules' => 'nullable|text',
                'images' => 'nullable|image',
            ]);

            $category = new Category;
            $category->name = $request->name;
            $category->history = $request->history;
            $category->rules = $request->rules;

            if ($request->hasFile('image')) {
                $category->image = $request->file('image')->store('images/categories', 'public');
            }


        }else {
            return response()->json([ 'message' => "Vous n'êtes pas administrateur."],409);
        }

        $category->save();

        return response()->json([
            "category" => $category,
            "message" => "La categorie " . $category->name . " a été ajouté avec succes."
        ],200);
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

        $user = Auth::user();
        $category = Category::findOrFail($id);

        if ($user->role === "admin") {

            $category->name = $request->name;
            $category->history = $request->history;
            $category->rules = $request->rules;
            $category->name = $request->name;

            if ($request->hasFile('image')) {
               $category->image = $request->file('image')->store("images/categories" , "public") ;
            }
        }else{
            return response()->json([ 'message' => "Vous n'êtes pas administrateur."],409);
        }


        $category->update();

        return response()->json([
            "category" => $category,
            "message" => 'La categorie ' . $category->name . ' a étée mise à jour .'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category, String $id)
    {
        $user = Auth::user();
        $category = Category::find($id);

        if ($user->role === "admin") {
            $category->delete();
        }else{
            return response()->json([ 'message' => "Vous n'êtes pas administrateur."],409);
        }
        return response()->json([
            "message" => "La categorie " . $category->name . " a été supprimé ."
        ], 200);
    }
}
