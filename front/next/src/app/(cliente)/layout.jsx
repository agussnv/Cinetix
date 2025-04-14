'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthComp from '@/components/AuthComp';
import { useAuth } from "@/context/AuthContext";
import { AuthProvider } from "@/context/AuthContext";
import { Mail, Phone, MapPin } from 'lucide-react';

export default function DashboardLayout({ children }) {
    return (
        <AuthProvider>
            <DashboardContent>{children}</DashboardContent>
        </AuthProvider>
    );
}

function DashboardContent({ children }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [token, setToken] = useState(null);
    const [toggleDrop, setToggleDrop] = useState(false);
    const { user, logoutAuth, loginAuth, setLoginAuth, isAuth } = useAuth();
    const router = useRouter();

    async function buscarMovie() {
        router.push(`/search?title=${searchTerm}`)
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') buscarMovie();
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token');
            setToken(token);
        }
    }, []);

    return <>
        {loginAuth && <AuthComp onClose={() => setLoginAuth(false)} />}
        <header>
            <div className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-gray-900">
                            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/dashboard')}>Cinetix</h1>
                        </div>
                        <div className="flex items-center space-x-6 flex-1 justify-end overflow-hidden">
                            <div className="hidden md:block relative md:w-full max-w-xl">
                                <input
                                    type="text"
                                    placeholder="Buscar películas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="md:w-full bg-gray-100 text-gray-900 px-6 py-3 md:pl-12 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                                />
                            </div>
                            {user ? (
                                <button onClick={() => setToggleDrop(!toggleDrop)} className="cursor-pointer">
                                    <svg width="2em" height="2em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09.016.016.032.016.032.032.144.112.288.224.448.336.08.048.144.111.224.175A7.98 7.98 0 0 0 8.016 16a7.98 7.98 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16.144-.111.304-.223.448-.335.016-.016.032-.016.032-.032 1.696-1.487 2.8-3.676 2.8-6.106zm-8 7.001c-1.504 0-2.88-.48-4.016-1.279.016-.128.048-.255.08-.383a4.17 4.17 0 0 1 .416-.991c.176-.304.384-.576.64-.816.24-.24.528-.463.816-.639.304-.176.624-.304.976-.4A4.15 4.15 0 0 1 8 10.342a4.185 4.185 0 0 1 2.928 1.166c.368.368.656.8.864 1.295.112.288.192.592.24.911A7.03 7.03 0 0 1 8 14.993zm-2.448-7.4a2.49 2.49 0 0 1-.208-1.024c0-.351.064-.703.208-1.023.144-.32.336-.607.576-.847.24-.24.528-.431.848-.575.32-.144.672-.208 1.024-.208.368 0 .704.064 1.024.208.32.144.608.336.848.575.24.24.432.528.576.847.144.32.208.672.208 1.023 0 .368-.064.704-.208 1.023a2.84 2.84 0 0 1-.576.848 2.84 2.84 0 0 1-.848.575 2.715 2.715 0 0 1-2.064 0 2.84 2.84 0 0 1-.848-.575 2.526 2.526 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.22 5.22 0 0 0-.688-1.406 4.883 4.883 0 0 0-1.088-1.135 5.207 5.207 0 0 0-1.04-.608 2.82 2.82 0 0 0 .464-.383 4.2 4.2 0 0 0 .624-.784 3.624 3.624 0 0 0 .528-1.934 3.71 3.71 0 0 0-.288-1.47 3.799 3.799 0 0 0-.816-1.199 3.845 3.845 0 0 0-1.2-.8 3.72 3.72 0 0 0-1.472-.287 3.72 3.72 0 0 0-1.472.288 3.631 3.631 0 0 0-1.2.815 3.84 3.84 0 0 0-.8 1.199 3.71 3.71 0 0 0-.288 1.47c0 .352.048.688.144 1.007.096.336.224.64.4.927.16.288.384.544.624.784.144.144.304.271.48.383a5.12 5.12 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a4.999 4.999 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907z"></path></g></svg>
                                </button>
                            ) : (
                                <button onClick={() => setLoginAuth(true)} className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-md transition hover:bg-red-700 transition-colors cursor-pointer">
                                    <span>Iniciar sessió</span>
                                </button>
                            )}
                        </div>
                        {toggleDrop &&
                            <div className="max-w-7xl relative">
                                <div
                                    className="w-[10em] z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 block"
                                    id="dropdown-2" style={{ position: "absolute", margin: "0px", right: "0px", top: "40px" }}
                                    data-popper-placement="bottom">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            Benvingut {user.user.name}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li onClick={() => { router.push('/tickets'); setToggleDrop(false); }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            role="menuitem">
                                            Els meus tiquets
                                        </li>
                                        <li onClick={() => {logoutAuth(); setToggleDrop(false)}} className="cursor-pointer block px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                            role="menuitem">
                                            Tancar sessió
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div >
        </header>
        <main>{children}</main>
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-8">
                <div className="md:flex md:justify-between gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Cinetix</h3>
                        <p className="mb-4">El teu destí per a les millors experiències cinematogràfiques</p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Contacte</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Phone size={16} className="mr-2" />
                                <span>+34 900 123 456</span>
                            </div>
                            <div className="flex items-center">
                                <Mail size={16} className="mr-2" />
                                <span>info@cinetix.com</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin size={16} className="mr-2" />
                                <span>Calle Principal 123, Barcelona</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p>&copy; {new Date().getFullYear()} Cinetix. Tots els drets reservats.</p>
                </div>
            </div>
        </footer>
    </>
}