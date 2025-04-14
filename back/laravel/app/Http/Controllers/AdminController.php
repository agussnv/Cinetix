<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 422);
        }

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin) {
            return response()->json(['success' => false, 'message' => 'Admin no encontrado.'], 404);
        }

        if (!Hash::check($request->password, $admin->password)) {
            return response()->json(['success' => false, 'error' => 'Credenciales incorrectas.'], 401);
        }

        $token = $admin->createToken('API Token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Inicio de sesión exitoso.',
            'user' => $admin,
            'token' => $token
        ], 200);
    }
}
