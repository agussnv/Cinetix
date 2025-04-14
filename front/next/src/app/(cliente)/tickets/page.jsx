'use client'

import { showTickets } from "@/app/plugins/communicationManager"
import { useEffect, useState } from "react"
import { useQRCode } from 'next-qrcode';
import { Clock, Calendar, Film, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const { Canvas } = useQRCode();
    const { user, isAuth, setLoginAuth } = useAuth();

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('token')) {
                await verTickets();
                setLoading(false);
            } else if (!isAuth) {
                console.log('Usuario no autenticado:', isAuth);
                setLoginAuth(true);
            }
        })();
    }, [isAuth, user]);

    async function verTickets() {
        const data = await showTickets();
        for (let index = 0; index < data.data.length; index++) {
            data.data[index].seats = JSON.parse(data.data[index].seats);
        }

        setTickets(data);
    }

    return <>
        <div className="min-h-screen bg-[#1a1a1a] text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Els meus tiquets</h1>

                {!loading ?
                    (
                        tickets?.data?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {tickets.data.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="bg-[#2a2a2a] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                                    >
                                        <div className="">
                                            <div className="p-4">
                                                <h2 className="text-2xl font-bold">{ticket.sessions.title}</h2>
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                {/* Fecha de la sesión */}
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="h-5 w-5 text-gray-400" />
                                                    <span>{ticket.sessions.date}</span>
                                                </div>

                                                {/* Hora de la sesión */}
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="h-5 w-5 text-gray-400" />
                                                    <span>{ticket.sessions.time}</span>
                                                </div>

                                                {/* Sala */}
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="h-5 w-5 text-gray-400" />
                                                    <span>{ticket.sala}</span>
                                                </div>

                                                {/* Asientos */}
                                                <div className="flex items-center space-x-2 col-span-2">
                                                    <Film className="h-5 w-5 text-gray-400" />
                                                    <span>Seients:</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {ticket.seats.map((seat, index) => (
                                                            <span key={index} className="bg-gray-700 px-2 py-1 rounded-lg text-sm">
                                                                {seat.id}, Fila {seat.row}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Código QR */}
                                            <div className="border-t border-gray-700 pt-4 mt-4">
                                                <div className="flex justify-center">
                                                    <Canvas
                                                        text={'https://media.tenor.com/_uIJwdpxI8UAAAAe/mono-serio.png'}
                                                        options={{
                                                            errorCorrectionLevel: 'M',
                                                            margin: 3,
                                                            scale: 4,
                                                            width: 200,
                                                            color: {
                                                                dark: '#FFFFFF',
                                                                light: '#E50914',
                                                            },
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-center text-sm text-gray-400 mt-2">
                                                    Mostra aquest codi QR a l'entrada
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h1>No s'han trobat resultats</h1>
                        )
                    ) : (
                        <h1>Carregant resultats</h1>
                    )
                }
            </div>
        </div>
    </>
}