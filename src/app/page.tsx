import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Laboratorio Next.js - ISR & CSR
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Selecciona una de las aplicaciones para explorar el proyecto:
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="/pokemon"
          className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg transition transform hover:scale-105 text-center"
        >
          Pokédex (ISR)
        </Link>

        <Link
          href="/rickandmorty"
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg transition transform hover:scale-105 text-center"
        >
          Rick and Morty (CSR / ISR)
        </Link>
      </div>
    </div>
  );
}