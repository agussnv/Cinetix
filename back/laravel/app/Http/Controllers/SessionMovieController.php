<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\SessionMovie;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionMovieController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show', 'getAll']),
        ];
    }

    public function index()
    {
        try {
            $sesiones = SessionMovie::where('date', '>=', today())->get();
            return response()->json(['success' => true, 'data' => $sesiones], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'We have a problem try-catch: ' . $e->getMessage()], 500);
        }
    }

    public function getAll()
    {
        try {
            
            $sesiones = SessionMovie::all();
            return response()->json(['success' => true, 'data' => $sesiones]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'We have a problem try-catch: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'imdb' => 'required|string',
                'title' => 'required|string',
                'time' => 'required|string',
                'date' => 'required|date',
                'vip' => 'required|boolean'
            ]);

            $seat_id = 0;
            for ($i = 1; $i <= 12; $i++) {
                for ($j = 0; $j < 10; $j++) {
                    $seat_id++;
                    $seat = [
                        'id' => $seat_id,
                        'available' => true,
                        'row' => $i
                    ];
                    $seats[] = $seat;
                }
            }

            $session = SessionMovie::create([
                'imdb' => $validated['imdb'],
                'title' => $validated['title'],
                'time' => $validated['time'],
                'date' => $validated['date'],
                'seats' => json_encode($seats),
                'vip' => $validated['vip']
            ]);

            if (!$session) {
                return response()->json(['success' => false, 'message' => 'We have a problem'], 500);
            }

            return response()->json(['success' => true, 'data' => $session], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'We have a problem try-catch: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $imdbID)
    {
        $session = SessionMovie::where('imdb', $imdbID)->get()->first();
        if(!$session){
            return response()->json(['success' => false, 'message' => 'session not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $session], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $sesionID)
    {
        try {
            $session = SessionMovie::find($sesionID);

            $user = Auth::user();

            if (!$user) {
                return response()->json(['success' => false, 'message' => 'Usuario no autentificado'], 500);
            }

            if (!$session) {
                return response()->json(['success' => false, 'message' => 'Sesión inexistente'], 404);
            }

            if ($request->seats) {
                $session->seats = $request->seats;
            } else if ($request->time && $request->date) {
                $admin = Admin::where('email', $user->email)->first();
                if (!$admin) {
                    return response()->json(['success' => false, 'message' => 'No eres un administrador'], 403);
                }

                $session->date = $request->date;
                $session->time = $request->time;
            }

            $session->save();

            return response()->json(['success' => true, 'message' => $session], 200);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => 'We have a problem try-catch: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $sesionID)
    {
        try {
            $session = SessionMovie::find( $sesionID);
            
            $user = Auth::user();
            $admin = Admin::where('email', $user->email)->get()->first();

            if (!$admin) {
                return response()->json(['success' => false, 'message' => 'No eres un administrador'], 500);
            }

            if (!$session) {
                return response()->json(['success' => false, 'message' => 'Sesión inexistente'], 404);
            }

            $session->delete();

            return response()->json(['success' => true, 'message' => "Sesión eliminada con éxito"], 200);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => 'We have a problem: ' . $e->getMessage()], 500);
        }
    }
}
