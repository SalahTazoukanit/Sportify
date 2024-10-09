<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;

/**
 * @OA\Info(title="User API", version="1.0")
 */

class UserController extends Controller
{
     /**
     * @OA\Post(
     *     path="/users/register",
     *     tags={"User"},
     *     summary="Register a new user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password","password_confirmation"},
     *             @OA\Property(property="name", type="string", format="text", example="John Doe"),
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="Password123!"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="Password123!"),
     *             @OA\Property(property="image_profile", type="string", format="binary", example="image.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User registered successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", ref="#/components/schemas/User"),
     *             @OA\Property(property="message", type="string", example="Votre compte a été créé avec succès.")
     *         )
     *     ),
     *     @OA\Response(response=400, description="Invalid input")
     * )
     */

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

        if ($request->validate([])) {

        }
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

    /**
     * @OA\Post(
     *     path="/users/login",
     *     tags={"User"},
     *     summary="Login a user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="Password123!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login successful",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Connexion réussie ! Bienvenue John Doe"),
     *             @OA\Property(property="user", ref="#/components/schemas/User"),
     *             @OA\Property(property="token", type="string")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */

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


    /**
     * @OA\Post(
     *     path="/users/logout",
     *     tags={"User"},
     *     summary="Logout the user",
     *     @OA\Response(
     *         response=200,
     *         description="Logout successful",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Déconnexion réussie. À bientôt !"),
     *             @OA\Property(property="status_code", type="integer", example=200)
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */

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
     * @OA\Get(
     *     path="/users/",
     *     tags={"User"},
     *     summary="Get all users",
     *     @OA\Response(
     *         response=200,
     *         description="List of users",
     *         @OA\JsonContent(
     *             @OA\Property(property="users", type="array", @OA\Items(ref="#/components/schemas/User"))
     *         )
     *     )
     * )
     */

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
     * @OA\Get(
     *     path="/users/show",
     *     tags={"User"},
     *     summary="Get the authenticated user",
     *     @OA\Response(
     *         response=200,
     *         description="User details",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", ref="#/components/schemas/User")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $user = Auth::user();
        return response()->json(["user" => $user],200);
    }


    /**
     * @OA\Put(
     *     path="/users/updateUser",
     *     tags={"User"},
     *     summary="Update the authenticated user's details",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", format="text", example="John Doe"),
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="image_profile", type="string", format="binary", example="image.jpg"),
     *             @OA\Property(property="password", type="string", format="password", example="NewPassword123!"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="NewPassword123!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="user_updated", ref="#/components/schemas/User"),
     *             @OA\Property(property="message", type="string", example="Vous avez modifié votre compte !")
     *         )
     *     ),
     *     @OA\Response(response=400, description="Invalid input")
     * )
     */

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
     * @OA\Delete(
     *     path="/users/delete/{id}",
     *     tags={"User"},
     *     summary="Delete a user",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="User deleted successfully")
     *         )
     *     ),
     *     @OA\Response(response=404, description="User not found")
     * )
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}













