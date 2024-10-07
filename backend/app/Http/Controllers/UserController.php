<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;

class UserController extends Controller
{

    public function register(Request $request)
    {
        $request->validate([
            "name" => "string|required|max:255",
            "email" => "required|string|max:255|unique:users|email",
            "image_profile" => "image|nullable|mimes:jpeg,png,jpg|max:2048",
            'password' => [
                'required',
                'string',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/',
                'confirmed',
            ],
            'password_confirmation' => 'required|same:password'
        ]);

        $imagePath = $request->file('image_profile') ? $request->file('image_profile')->store('images/profiles', 'public') : null ;

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            'image_profile' =>  $imagePath,
            "password" => bcrypt($request->password),
            "password_confirmation" => bcrypt($request->password_confirmation),
        ]);

            return response()->json([
                "user" => $user,
                "message" => "Votre compte a été créé avec succès. "
        ], 200);

    }

    public function login(Request $request)
    {
        Log::info('Request data:', $request->all());

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            if (auth('sanctum')->check()) {
                auth()->user()->tokens()->delete();
            }

            $user = User::where('email', $credentials['email'])->first();
            $token = $user->createToken('authToken', ['*'])->plainTextToken;

            return response()->json([
                'message' => 'Connexion réussie ! Bienvenue ' . $user->name,
                'user' => $user,
                'user_id' => $user->id,
                "user_role" => $user->role,
                'token' => $token
            ]);
        } else {
            return response()->json([
                'message' => 'Échec de la connexion. Veuillez vérifier vos informations de connexion et réessayer.',
            ], 401);
        }
    }

    public function logout()
    {
        $user = Auth::user();

        if ($user) {
            // Suppression du jeton d'accès actuel
            $user->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Déconnexion réussie. À bientôt !',
                'status_code' => 200
            ], 200);
        } else {
            return response()->json([
                'message' => 'Utilisateur non identifié!',
                'status_code' => 401
            ], 401);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $users = User::all();
        return response()->json([
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $user = Auth::user();
        return response()->json(["user" => $user],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateUser(Request $request)
    {
        $user = Auth::user();

        Log::info($request->all());

        $validatedData = $request->validate([
            "name" => "string|nullable|max:255",
            "email" => "nullable|string|max:255|unique:users|email",
            "image_profile" => "image|nullable|mimes:jpeg,png,jpg|max:2048",
            'password' => [
                'nullable',
                'string',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/',
                'confirmed',
            ],
            'password_confirmation' => 'nullable|same:password'
        ]);

        if ($request->hasFile('image_profile')) {
            $validatedData['image_profile'] = $request->file('image_profile')->store('images/profiles', 'public');
        }else {
            $validatedData['image_profile'] = null ;
        }


        // $user->name = $request->name;
        // $user->email = $request->email;
        // $user->image_profile = $request->image_profile;
        // $user->password = $request->password;
        // $user->password_confirmation = $request->password_confirmation;

        $user->update($validatedData);

        return response()->json([
            "user_updated" => $user ,
            "message" => "Vous avez modifié votre compte !",
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
