<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class EventController extends Controller
{

    // function that is used to participate in an event ;
    public function participate(Request $request, String $id)
    {
        $user = Auth::user();
        $user_id = $user->id;

        if (!$user) {
            return redirect()->back()->with('error', 'Utilisateur pas trouvé.');
        }

        $event = Event::findOrFail($id);

        if ($event->participants()->where('user_id', $user_id )->exists()) {
            return response()->json(['error' => "Vous êtes déjà inscrit à l'événement."], 409);
        }

        if ($event->aviable_places > 0) {
            $event->participants()->attach($user->id);

            $event->aviable_places -= 1;
            $event->save();

            return response()->json([
                "message" => "Vous vous êtes bien inscrit(e) à l'événement.",
                "aviable_places_remaining" => $event->aviable_places,
            ], 200);
        } else {
            return response()->json([
                "message" => "Desolé , il ne reste plus de places disponibles ."
            ]);
        };

    }

    // function that shows all event participants ;
    public function showParticipantsEvent(Event $event, String $id){

        $event = Event::with('participants')->findOrFail($id);

        return response()->json([
            'event' => $event,
        ],200);
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
        $user = Auth::user();

        $request->validate([
            'name' => 'string|max:200',
            'category_id' => 'integer',
            'description' => 'sometimes|max:1000',
            'date' => 'date|required',
            'position' => "string",
            'aviable_places' => "sometimes|required",
            'image' => "image|sometimes|mimes:jpeg,png,jpg|max:2048",
            'time' => "date_format:H:i",
        ]);

        $event = Event::create([
            'user_id' => $user->id ,
            'name' => $request->name ,
            'category_id' =>  $request->category_id,
            'description' =>  $request->description,
            'date' =>  $request->date,
            'position' =>  $request->position,
            'aviable_places' =>  $request->aviable_places,
            'image' =>  $request->file('image')->store('images/events', 'public'),
            'time' =>  $request->time,
        ]);



        return response()->json([
            'event' => $event,
            'message' => "L'evenement " .  $event->name . " a été créé avec succès et est en attente de validation par l'un de nos administrateurs."
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
            'name' => 'string|sometimes|max:200',
            'category_id' => 'sometimes',
            'description' => 'sometimes|max:1000',
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
