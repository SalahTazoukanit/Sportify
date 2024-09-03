<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;

class EventController extends Controller
{

    public function participate(Request $request, String $id)
    {
        $userId = 1;
        // Trouver l'utilisateur
        $user = User::find($userId);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found.');
        }
        // Récupérer l'événement
        $event = Event::findOrFail($id);

        if ($event->participants()->where('user_id', $user->id)->exists()) {
            return response()->json(['error' => "Vous êtes déjà inscrit à l'événement."], 409);
        }

        if ($event->aviable_places > 0) {
            $event->participants()->attach($user->id);
            $event->aviable_places -= 1;
            $event->save();
            return response()->json([
                "message" => "Vous vous êtes bien enregistré(e).",
                "aviable_places_update" => $$event->aviable_places,
            ], 200);
        } else {
            return response()->json([
                "message" => "Desolé , il ne reste plus de places disponibles"
            ]);
        };
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::all();
        return response()->json([
            'events' => $events
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'string',
            'category_id' => 'integer',
            'user_id' => 'integer',
            'description' => 'sometimes',
            'date' => 'date|required',
            'position' => "string",
            'aviable_places' => "sometimes|required",
            'image' => "image|sometimes|mimes:jpeg,png,jpg|max:2048",
            'time' => "date_format:H:i",
        ]);

        $event = Event::create($request->all());
        if ($request->hasFile('image')) {
            $event->image = $request->file('image')->store('images/events', 'public');
        }

        return response()->json([
            'event' => $event,
            'message' => "L'evenement " .  $event->name . " a été créé avec succes ."
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, String $id)
    {
        $event = Event::findOrFail($id);
        return response()->json([
            'event' => $event
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event, String $id)
    {
        $request->validate([
            'name' => 'string',
            'category_id' => 'sometimes',
            'description' => 'sometimes',
            'date' => 'date|sometimes',
            'position' => "string",
            'aviable_places' => "sometimes",
            'image' => "image|sometimes|mimes:jpeg,png,jpg|max:2048",
            'time' => "sometimes|date_format:H:i",

        ]);

        $event = Event::find($id);
        if ($request->hasFile('image')) {
            $event->image = $request->file('image')->store('images/events', 'public');
        }

        $event->update($request->all());

        return response()->json([
            'event' => $event,
            'message' => "L'evenement " . $event->name . " a été mis à jour."
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event, String $id)
    {
        $event = Event::findOrFail($id);

        $event->delete();

        return response()->json([
            'message' => "L'evenement " . $event->name . " a été supprimé avec success."
        ], 200);
    }
}
