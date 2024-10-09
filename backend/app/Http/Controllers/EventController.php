<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

/**
 * @OA\Info(title="API Events", version="1.0.0")
 * @OA\Server(url="http://localhost/api/v1")
 */
class EventController extends Controller
{
    /**
     * @OA\Post(
     *     path="/events/{id}/participateToEvent",
     *     summary="Participate in an event",
     *     tags={"Events"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Event ID", @OA\Schema(type="string")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/ParticipateRequest")),
     *     @OA\Response(response="200", description="Successfully participated"),
     *     @OA\Response(response="409", description="Already participating"),
     *     @OA\Response(response="404", description="Event not found"),
     * )
     */
    public function participate(Request $request, String $id)
    {
        $user = Auth::user();
        $user_id = $user->id;

        if (!$user) {
            return response()->json(["message" => "Utilisateur pas trouvé."], 404);
        }

        $event = Event::findOrFail($id);

        if ($event->participants()->where('user_id', $user_id)->exists()) {
            return response()->json(["message" => "Vous êtes déjà inscrit à l'événement."], 409);
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
            return response()->json(["message" => "Désolé, il ne reste plus de places disponibles."], 409);
        }
    }

    /**
     * @OA\Post(
     *     path="/events/removeMeAsParticipant/{id}",
     *     summary="Remove self from event participation",
     *     tags={"Events"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Event ID", @OA\Schema(type="string")),
     *     @OA\Response(response="200", description="Successfully removed from event"),
     *     @OA\Response(response="404", description="Event not found"),
     * )
     */
    public function removeMeAsParticipant(String $id)
    {
        $user = Auth::user();
        $event = Event::findOrFail($id);

        $event->participants()->detach($user->id);
        $event->aviable_places += 1;
        $event->save();

        return response()->json(["message" => "Vous n'êtes plus participant."], 200);
    }

    /**
     * @OA\Get(
     *     path="/events/{id}/showParticipantsEvent",
     *     summary="Show all participants of an event",
     *     tags={"Events"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Event ID", @OA\Schema(type="string")),
     *     @OA\Response(response="200", description="Participants retrieved successfully"),
     *     @OA\Response(response="404", description="Event not found"),
     * )
     */
    public function showParticipantsEvent(String $id)
    {
        $event = Event::with('participants')->findOrFail($id);
        return response()->json(['event' => $event], 200);
    }

    /**
     * @OA\Get(
     *     path="/events/showMyParticipatedEvents",
     *     summary="Show my participated events",
     *     tags={"Events"},
     *     @OA\Response(response="200", description="Successfully retrieved my participated events"),
     * )
     */
    public function showMyParticipatedEvents()
    {
        $user = Auth::user();
        $myParticipatedEvents = $user->events()->get();
        return response()->json(['myParticipatedEvents' => $myParticipatedEvents], 200);
    }

    /**
     * @OA\Post(
     *     path="/events/addEventToFavourites/{id}",
     *     summary="Add an event to user favourites",
     *     tags={"Events"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Event ID", @OA\Schema(type="string")),
     *     @OA\Response(response="200", description="Event added to favourites"),
     *     @OA\Response(response="404", description="Event not found"),
     * )
     */
    public function addEventToFavourites(String $id)
    {
        $user = Auth::user();
        $event = Event::findOrFail($id);

        if ($event->usersFavourites()->where('user_id', $user->id)->exists()) {
            return response()->json(["message" => "Événement déjà ajouté aux favoris."], 200);
        }

        $event->usersFavourites()->attach($user->id);
        return response()->json(["message" => "Événement " . $event->name . " ajouté aux favoris."], 200);
    }

    /**
     * @OA\Post(
     *     path="/events/removeEventFromFavourites/{id}",
     *     summary="Remove event from favourites",
     *     tags={"Events"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Event ID", @OA\Schema(type="string")),
     *     @OA\Response(response="200", description="Event removed from favourites"),
     *     @OA\Response(response="404", description="Event not found"),
     * )
     */
    public function removeEventFromFavourites(String $id)
    {
        $user = Auth::user();
        $event = Event::findOrFail($id);
        $event->usersFavourites()->detach($user->id);

        return response()->json(["message" => "Événement supprimé des favoris."], 200);
    }

    /**
     * @OA\Get(
     *     path="/events/showMyFavourites",
     *     summary="Show my favourite events",
     *     tags={"Events"},
     *     @OA\Response(response="200", description="Successfully retrieved favourite events"),
     * )
     */
    public function showMyFavourites()
    {
        $user = Auth::user();
        $favourites_events = $user->eventsFavourites()->get();

        return response()->json(["favourites_events" => $favourites_events], 200);
    }

    /**
     * @OA\Get(
     *     path="/events/getOwnEvents",
     *     summary="Get own events",
     *     tags={"Events"},
     *     @OA\Response(response="200", description="Successfully retrieved own events"),
     * )
     */
    public function getOwnEvents()
    {
        $user = Auth::user();
        $events = Event::where('user_id', $user->id)->get();

        return response()->json(["events" => $events], 200);
    }

    /**
     * @OA\Get(
     *     path="/events/filterEventsByName/{name}",
     *     summary="Filter events by name",
     *     tags={"Events"},
     *     @OA\Parameter(name="name", in="path", required=true, description="Event name", @OA\Schema(type="string")),
     *     @OA\Response(response="200", description="Events filtered successfully"),
     * )
     */
    public function filterEventsByName($name)
    {
        $events = Event::where('name', 'like', '%' . $name . '%')->get();
        $number_events = $events->count();

        return response()->json(["events" => $events, "number_events" => $number_events], 200);
    }

    /**
     * @OA\Get(
     *     path="/events",
     *     summary="Display a listing of the events",
     *     tags={"Events"},
     *     @OA\Response(response="200", description="List of events"),
     * )
     */
    public function index()
    {
        $events = Event::all();
        return response()->json(['events' => $events], 200);
    }

    /**
     * @OA\Post(
     *     path="/events/store",
     *     summary="Store a newly created event",
     *     tags={"Events"},
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/EventRequest")),
     *     @OA\Response(response="200", description="Event created successfully"),
     *     @OA\Response(response="401", description="Unauthorized"),
     * )
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(["message" => "Vous n'êtes pas connecté(e)."], 401);
        }

        $request->validate([
            'name' => 'string|max:200|required',
            'category_id' => 'integer|required',
            'description' => 'sometimes|string|max:1000',
            'date' => 'date|required',
            'position' => 'sometimes|string',
            'aviable_places' => 'sometimes|required|integer',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',
            'time' => 'sometimes|date_format:H:i',
        ]);

        $event = Event::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'date' => $request->date,
            'position' => $request->position,
            'aviable_places' => $request->aviable_places,
            'image' => $request->file('image') ? $request->file('image')->store('images/events', 'public') : null,
            'time' => $request->time,
        ]);

        return response()->json([
            'event' => $event,
            'message' => "L'événement " . $event->name . " a été créé avec succès et est en attente de validation par l'un de nos administrateurs."
        ]);
    }

    /**
     * @OA\Get(
     *     path="/events/{id}",
     *     summary="Display the specified event",
     *     tags={"Events"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Event ID", @OA\Schema(type="string")),
     *     @OA\Response(response="200", description="Event retrieved successfully"),
     *     @OA\Response(response="404", description="Event not found"),
     * )
     */
    public function show(String $id)
    {
        $event = Event::with('user', 'category')->findOrFail($id);
        return response()->json(["event" => $event], 200);
    }

    /**
     * @OA\Put(
     *     path="/events/update/{id}",
     *     summary="Update the specified event",
     *     tags={"Events"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Event ID", @OA\Schema(type="string")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/EventRequest")),
     *     @OA\Response(response="200", description="Event updated successfully"),
     *     @OA\Response(response="404", description="Event not found"),
     * )
     */
    public function update(Request $request, String $id)
    {
        $user = Auth::user();
        $event = Event::findOrFail($id);

        if (!$user) {
            return response()->json(["message" => "Vous n'êtes pas connecté(e)."], 401);
        }

        $validatedData = $request->validate([
            'name' => 'string|sometimes|max:200',
            'category_id' => 'sometimes|integer',
            'description' => 'sometimes|string|max:1000',
            'date' => 'sometimes|date',
            'position' => 'sometimes|string',
            'aviable_places' => 'sometimes|integer',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',
            'time' => 'sometimes|date_format:H:i',
        ]);

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('images/events', 'public');
        }

        $event->update($validatedData);

        return response()->json([
            'event' => $event,
            'message' => "L'événement " . $event->name . " a été mis à jour."
        ], 200);
    }

    /**
     * @OA\Put(
     *     path="/events/changeStatus/{id}",
     *     summary="Change event status",
     *     tags={"Events"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Event ID", @OA\Schema(type="string")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/ChangeStatusRequest")),
     *     @OA\Response(response="200", description="Event status changed successfully"),
     *     @OA\Response(response="403", description="Forbidden"),
     * )
     */
    public function changeStatus(Request $request, String $id)
    {
        $user = Auth::user();

        if ($user->role == "admin") {
            $request->validate([
                "status" => "in:pending,published",
            ]);
        }

        $event = Event::findOrFail($id);
        $event->update($request->all());

        return response()->json([
            "message" => "Status de l'événement changé en " . $request->status,
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/events/delete/{id}",
     *     summary="Remove the specified event",
     *     tags={"Events"},
     *     @OA\Parameter(name="id", in="path", required=true, description="Event ID", @OA\Schema(type="string")),
     *     @OA\Response(response="200", description="Event deleted successfully"),
     *     @OA\Response(response="404", description="Event not found"),
     * )
     */
    public function destroy(String $id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json([
            'message' => "L'événement " . $event->name . " a été supprimé avec succès."
        ], 200);
    }
}
