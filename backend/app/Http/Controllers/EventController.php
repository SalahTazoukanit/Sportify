<?php

namespace App\Http\Controllers;

use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Configuration\Configuration;

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
            return response()->json([
                'message' => "Vous êtes déjà inscrit à l'événement."
            ], 409);
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

    // function to self remove from event participation
    public function removeMeAsParticipant(String $id){
        $user = Auth::user();

        $event  = Event::findOrFail($id);

        $event->participants()->detach($user->id);

        $event->aviable_places += 1 ;

        $event->save();

        return response()->json([
            "event_updated" => $event ,
            "message" => "Vous n'êtes plus participant."
        ],200);

    }

    // function that shows all event participants ;
    public function showParticipantsEvent( String $id){

        $event = Event::with('participants')->findOrFail($id);

        return response()->json([
            'event' => $event,
        ],200);
    }

    public function showMyParticipatedEvents(){

        $user = Auth::user();

        $myParticipatedEvents = $user->events()->get();
        return response()->json([
            'myParticipatedEvents' => $myParticipatedEvents
        ],200);
    }

    //function to add an event to user favourites
    public function addEventToFavourites( String $id){

        $user = Auth::user();

        $event = Event::findOrFail($id);

        if($event->usersFavourites()->where('user_id', $user->id )->exists()){
            return response()->json([
                "message" => "Événement déja ajouté aux favoris."
            ],200);
        }

        $event->usersFavourites()->attach($user->id);

        return response()->json([
            "message" => "Événement " . $event->name . " ajouté aux favoris."
        ],200);

    }

    //function to remove events from favourites
    public function removeEventFromFavourites(String $id){

        $user = Auth::user();

        $event = Event::findOrFail($id);

        $event->usersFavourites()->detach($user->id);

        return response()->json([
            "message" => "Événement supprimé des favoris."
        ],200) ;
    }

    //function to show favourites
    public function showMyFavourites(){

        $user = Auth::user();

        $favourites_events = $user->eventsFavourites()->get();

        return response()->json([
            "favourites_events" => $favourites_events
        ],200);
    }

    //function to get own events ;
    public function getOwnEvents(){

        $user = Auth::user();

        $events = Event::where('user_id', $user->id)->get();

        return response()->json([
            "events" => $events
        ],200);
    }

    //filter events by name
    public function filterEventsByName($name){

        $event = Event::where('name', 'like', '%' . $name . '%')
            ->get();

        $number_events = $event->count();

        return response()->json([
            "event" => $event,
            "number_events" => $number_events
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

        if(!$user){
            return response()->json([
                "message" => "Vous n'etes pas connecté(e) ."
            ]);
        }

        $request->validate([
            'name' => 'string|max:200',
            'category_id' => 'integer',
            'description' => 'sometimes',
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
            'image' =>  "",
            'time' =>  $request->time,
        ]);

        if (request()->hasFile('image')) {
            Configuration::instance([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key' => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
                'url' => [
                    'secure' => true
                ]
            ]);

            $filePath = request()->file('image')->getRealPath();

            $uploadResult = (new UploadApi())->upload($filePath, [
                'folder' => 'events/' . $event->id,
            ]);

            $event->update(['image' => $uploadResult['secure_url']]);

        }

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
        $event = Event::with('user' , 'category')->findOrFail($id);
        return response()->json([
            "event" => $event ,
        ],200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event, String $id)
{
    $user = Auth::user();

    $event = Event::find($id);

    if (!$user) {
        return response()->json([
            "message" => "Vous n'êtes pas connecté(e)."
        ]);
    }

    $validatedData = $request->validate([
        'name' => 'string|sometimes|max:200',
        'category_id' => 'sometimes',
        'description' => 'sometimes|max:1000',
        'date' => 'date|sometimes',
        'position' => "string|sometimes",
        'available_places' => "sometimes|integer",
        'image' => "image|sometimes|mimes:jpeg,png,jpg|max:2048",
        'time' => "sometimes|date_format:H:i",
    ]);

    $event->update($validatedData);

    if (request()->hasFile('image')) {
        Configuration::instance([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key' => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
            'url' => [
                'secure' => true
            ]
        ]);

        $filePath = request()->file('image')->getRealPath();

        $uploadResult = (new UploadApi())->upload($filePath, [
            'folder' => 'events/' . $event->id,
        ]);

        $event->update(['image' => $uploadResult['secure_url']]);

    }

    return response()->json([
        'event' => $event,
        'message' => "L'événement " . $event->name . " a été mis à jour."
    ], 200);
}


    // function to change event status only for admins
    public function changeStatus (Request $request , String $id) {

        $user = Auth::user();

        if ($user->role == "admin") {

            $request->validate([
                "status" => "in:pending,published",
            ]);

        }

        $event = Event::findOrFail($id) ;
        $event->update($request->all());

        return response()->json([
            "message" => "Status de l'événement changé en " . $request->status ,
        ],200);
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
