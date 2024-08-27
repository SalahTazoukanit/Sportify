<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
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
            'description' => 'sometimes',
            'date' => 'date',
            'position' => "string",
            'aviable_places' => "sometimes",
            'image' => "image|sometimes|mimes:jpeg,png,jpg|max:2048"
        ]);

        $event = Event::create($request->all());

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
            'description' => 'sometimes',
            'date' => 'date|sometimes',
            'position' => "string",
            'aviable_places' => "sometimes",
            'image' => "image|sometimes|mimes:jpeg,png,jpg|max:2048"
        ]);

        $event = Event::find($id);

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
