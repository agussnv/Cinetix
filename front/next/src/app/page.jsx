'use client'

import React from 'react';
import { Play, Info, ChevronRight, Monitor, Tablet, Download, Users, } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgb(0 0 0 / 80%), rgb(0 0 0 / 40%)), url('https://assets.nflxext.com/ffe/siteui/vlv3/4bcafa4d-1171-450c-b28e-2a750edc44b9/web/ES-en-20250324-TRIFECTA-perspective_fc6e0ec6-8e87-46cc-a948-362401612939_large.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/0 to-black"></div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-4 py-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-red-600 text-4xl font-bold">CINETIX</h1>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center px-4">
          <h2 className="text-5xl lg:text-6xl font-bold mb-4">
            Compra Entrades per al Cinema
          </h2>
          <p className="text-xl lg:text-2xl mb-6">
          Gaudeix de les millors pel·lícules en la pantalla gran. Compra les teves entrades de manera ràpida i senzilla.
          </p>
          <button onClick={() => { router.push('/dashboard') }} className="bg-red-600 px-8 py-4 rounded font-medium hover:bg-red-700 transition flex items-center justify-center cursor-pointer">
          Veure Sessions Disponibles <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto py-24 px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12">
        Preguntes freqüents
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "Què és Cinetix?",
              answer: "Cinetix és un portal en línia on pots comprar entrades per a les millors pel·lícules al teu cinema local. Oferim una plataforma fàcil d'usar perquè puguis veure les sessions disponibles, triar els teus seients i realitzar la compra de les teves entrades ràpidament."
            },
            {
              question: "Quant costa comprar en Cinetix?",
              answer: "Els preus varien segons el tipus d'entrada (normal o VIP). Amb Cinetix, podràs gaudir de preus accessibles i promocions especials, tot amb un sistema de pagament segur i ràpid."
            },
            {
              question: "On puc veure les pel·lícules de Cinetix?",
              answer: "Consulta les sessions disponibles de les pel·lícules al teu cinema local a través del nostre portal. Amb Cinetix, podràs comprar entrades per a veure les pel·lícules que més t'agraden al cinema de la teva ciutat, des de qualsevol dispositiu connectat a internet."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-gray-900 rounded">
              <button className="w-full px-6 py-4 text-left text-xl flex items-center justify-between">
                <span>{faq.question}</span>
              </button>
              <div className="px-6 py-4 text-lg text-gray-300 border-t border-gray-800">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-gray-400 mb-4">Cinetix</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:underline">Centre d'ajuda</a></li>
                <li><a href="#" className="hover:underline">Termes d'ús</a></li>
                <li><a href="#" className="hover:underline">Privacitat</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 mb-4">Compte</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:underline">El meu compte</a></li>
                <li><a href="#" className="hover:underline">Informació corporativa</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:underline">Avisos legals</a></li>
                <li><a href="#" className="hover:underline">Cookies</a></li>
                <li><a href="#" className="hover:underline">Contacte</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 mb-4">Segueix-nos</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Twitter</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
              </ul>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-8">© 2024 Cinetix. Tots els drets reservats.</p>
        </div>
      </footer>
    </div>
  );
}
