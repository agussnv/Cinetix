<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;

class TicketController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();

            $tickets = Ticket::where('ID_user', $user->id)
            ->with('sessions:id,title,imdb,time,date')
            ->whereHas('sessions', function ($query) {
                $query->where('date', '>=', today());
            })
            ->orderBy('created_at', 'desc')
            ->get();

            if (!$tickets) {
                return response()->json(['success' => false, 'message' => 'We have a problem'], 500);
            }

            if ($tickets->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'message' => 'No se encontraron tickets.',
                    'data' => []
                ], 200);
            }

            return response()->json([
                'success' => true,
                'data' => $tickets
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al obtener los tickets.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAll()
    {
        try {
            $user = Auth::user();
            
            if ($user) {
                $tickets = Ticket::orderBy('created_at', 'desc')->with('cliente:id,name,phone,email')->with('sessions:id,title,time,date')->get();

                if (!$tickets) {
                    return response()->json(['success' => false, 'message' => 'We have a problem'], 500);
                }

                if ($tickets->isEmpty()) {
                    return response()->json([
                        'success' => true,
                        'message' => 'No se encontraron tickets.',
                        'data' => []
                    ], 200);
                }

                return response()->json([
                    'success' => true,
                    'data' => $tickets
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario no autenticado',
                    'data' => []
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al obtener los tickets.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            $validated = $request->validate([
                'ID_session' => 'required|integer|exists:session_movies,id',
                'sala' => 'string|nullable',
                'seats' => 'required|json',
                'total' => 'required|numeric'
            ]);

            $ticket = Ticket::create([
                'ID_user' => $user->id,
                'ID_session' => $validated['ID_session'],
                'sala' => $validated['sala'],
                'seats' => $validated['seats'],
                'total' => $validated['total']
            ]);

            $dataTicket = Ticket::where('id', $ticket->id)->with('sessions:id,title,imdb,time,date')->first();

            $pdf = Pdf::loadView('mails.newTicket', [
                'name' => $user->name,
                'title' => $dataTicket->sessions->title,
                'date' => $dataTicket->sessions->date,
                'time' => $dataTicket->sessions->time,
                'sala' => $dataTicket->sala,
                'seats' => json_decode($dataTicket->seats),
                'total' => $dataTicket->total,
            ]);

            $pdfPath = storage_path('app/public/ticket_' . $ticket->id . '.pdf');
            $pdf->save($pdfPath);

            Mail::send([], [], function ($message) use ($user, $pdfPath) {
                $message->to($user->email)
                    ->subject('Compra de ticket')
                    // ->html("<p>Hola, verifica tu cuenta haciendo clic en el siguiente enlace:</p><p><a href='" . url('/api/verify/' . $verificationToken) . "'>Verificar cuenta</a></p>")
                    ->attach($pdfPath, [
                        'as' => 'ticket_compra.pdf',
                        'mime' => 'application/pdf'
                    ]);
            });

            if (file_exists($pdfPath)) {
                unlink($pdfPath);
            }

            if (!$ticket) {
                return response()->json(['success' => false, 'message' => 'We have a problem'], 500);
            }

            return response()->json(['success' => true, 'data' => $ticket], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'We have a problem try-catch: ' . $e->getMessage()], 500);
        }
    }
}
