'use client'

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tokenVerification } from "@/app/plugins/communicationManager"
import { PopUpProvider } from '@/context/TogglePopUps';

export default function DashboardLayout({ children, onClick }) {
    const [token, setToken] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { label: 'Dashboard', active: pathname === '/admin', link: '/admin' },
        { label: 'Crear funció', active: pathname === '/admin/crear', link: '/admin/crear' },
        { label: 'Sesions', active: pathname === '/admin/sesions', link: '/admin/sesions' },
    ];

    useEffect(() => {
        setToken(localStorage.getItem('tokenAdmin'));
        verifyToken();
    }, []);

    async function verifyToken() {
        const token = localStorage.getItem('tokenAdmin');
        if (!token) {
            router.push('/admin/auth');
        }
    }

    if (pathname === '/admin/auth') {
        return (
            <main>
                {children}
            </main>
        );
    } else {
        return (
            <PopUpProvider>
                <div className="bg-gray-50">
                    {mobileMenuOpen && (
                        <div
                            className="fixed inset-0 bg-gray-800/50 z-40 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                    )}

                    <aside
                        className={`
                  fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50
                  transition-all duration-300 ease-in-out overflow-hidden w-64
                  ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
                    >
                        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                            <div className={`flex items-center gap-3`}>
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">A</span>
                                </div>
                                <span className="font-semibold text-gray-900">Admin Panel</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden cursor-pointer"
                            >
                                <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g id="Menu / Close_MD">
                                            <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>

                        <nav className="p-4 space-y-2">
                            {menuItems.map((item, index) => (
                                <a
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(item.link);
                                    }}
                                    className={`
                                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer
                                    ${item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
                                `}
                                >
                                    <span>{item.label}</span>
                                </a>
                            ))}
                        </nav>
                    </aside>

                    <div
                        className={`transition-all duration-300 ease-in-out lg:ml-64`}
                    >
                        <header className="w-full h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-30 lg:left-auto">
                            <div className="flex items-center justify-between lg:justify-end h-full px-4">
                                <button
                                    onClick={() => setMobileMenuOpen(true)}
                                    className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                                >
                                    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H14M4 18H9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                </button>

                                <div className="flex items-center gap-4 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                            Admin User
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <main className="p-4 mt-16">
                            {children}
                        </main>
                    </div>
                </div>
            </PopUpProvider>
        );
    }
}