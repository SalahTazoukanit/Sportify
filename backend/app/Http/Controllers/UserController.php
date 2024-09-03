<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|string|min:8',
            'image_profile' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 401);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'image_profile' => $request->image_profile
        ]);

        // return response()->json($user, 201);

        $token = $user->createToken("API TOKEN")->plainTextToken;

        return response()->json([
            'status'  => true,
            'message' => 'User created successfully',
            'user' => $user,
            "token" => $token,
            // 'token'=>$user->createToken("API TOKEN")->plainTextToken
        ], 200);
    }

    public function login(Request $request)
    {
        $validateUser = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|string|max:255|email',
            'password' => [
                'required',
                'string',
                'min:5',
            ],
        ]);

        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validateUser->errors()
            ], 401);
        }

        if (Auth::attempt($request->all())) {
            if (auth('sanctum')->check()) {
                auth()->user()->tokens()->delete();
            }

            // 'name'=>$request->name,
            // 'email'=>$request->email,
            // 'password'=> Hash::make($request->password),

            $user = Auth::user();
            $token = $user->createToken("API TOKEN")->plainTextToken;

            return response()->json([
                'status'  => true,
                'message' => 'User logged in successfully',
                'user' => $user,
                'token' => $token,
                // 'token'=>$user->createToken("API TOKEN")->plainTextToken
                // "token"=>$token,
            ], 200);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
