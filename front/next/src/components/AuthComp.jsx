'use client'

import { useState } from "react";
import { loginCliente, registerCliente } from "@/app/plugins/communicationManager";
import { useAuth } from "@/context/AuthContext";

export default function AuthComp({ onClose }) {
    const [name, setName] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState('');
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (isLogin) {
                const datos = {
                    "email": email,
                    "password": password
                }
                const response = await loginCliente(datos);
                if (response && response.success) {
                    login(response);
                    onClose();
                } else {
                    setErrorMessage('Credencials incorrectes')
                }
            } else {
                const datos = {
                    "name": name,
                    "phone": telefono,
                    "email": email,
                    "password": password
                }
                const response = await registerCliente(datos);
                if (response && response.success) {
                    setIsLogin(true);
                } else {
                    console.log("Va ocórrer un problema en registrar-se: ", response)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div
                className="relative w-full max-w-md bg-red-600 opacity-90 text-white p-8 rounded-lg"
                style={{
                    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.9) 100%)'
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-white transition-colors cursor-pointer font-bold"
                >x
                </button>

                <h2 className="text-3xl font-bold mb-8">
                    {isLogin ? 'Iniciar sessió' : 'Registrar-se'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Nom"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-700 text-white px-6 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                            <input
                                type="tel"
                                placeholder="Telèfon"
                                value={telefono}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9+]/g, "");
                                    setTelefono(value);
                                }}
                                pattern="^\+?[0-9]{7,15}$"
                                maxLength="15"
                                autoComplete="tel"
                                className="mt-6 w-full bg-gray-700 text-white px-6 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                aria-label="Número de teléfono"
                            />

                        </div>
                    )}

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-700 text-white px-6 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder={!isLogin ? "Contrasenya (mínim 8 caràcters)" : "Contrasenya"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-700 text-white px-6 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                        {isLogin && errorMessage !== '' && (
                            <p className="text-red-400 text-sm mt-2">
                                {errorMessage}
                            </p>
                        )}
                        {!isLogin && password.length > 0 && password.length < 8 && (
                            <p className="text-red-400 text-sm mt-2">
                                La contrasenya ha de tenir al menys 8 caràcters.
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-4 rounded-md hover:bg-red-700 transition-colors font-medium cursor-pointer"
                        disabled={!isLogin && password.length < 8}
                    >
                        {isLogin ? 'Iniciar sessió' : 'Registrar-se'}
                    </button>

                    <div className="text-center text-gray-400">
                        {isLogin ? (
                            <p>
                                Primera vegada en Cinetix?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(false)}
                                    className="text-white hover:underline cursor-pointer"
                                >
                                    Registra't ara
                                </button>
                            </p>
                        ) : (
                            <p>
                                Ja tens un compte?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(true)}
                                    className="text-white hover:underline cursor-pointer"
                                >
                                    Inicia sessió
                                </button>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};